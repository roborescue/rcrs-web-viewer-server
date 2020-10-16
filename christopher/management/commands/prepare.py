import glob
import json
import logging
import os
# from shutil import copy2
import zipfile

from django.core.management.base import BaseCommand, CommandError

from christopher.models import Competition, Match
from settings import LOG_DIR, RAW_LOG_FILE_FORMAT, PREPARED_LOG_DIR

logging.basicConfig(level=logging.DEBUG)


class Command(BaseCommand):
    help = 'Prepare raw jlog file'

    def add_arguments(self, parser):
        parser.add_argument('competition_id', nargs='+', type=int)

    def handle(self, *args, **options):
        for competition_id in options['competition_id']:
            try:
                competition = Competition.objects.get(pk=competition_id)
                prepare_competition(competition)
            except Competition.DoesNotExist:
                raise CommandError('Competition "%s" does not exist' % competition_id)

            self.stdout.write(self.style.SUCCESS('Successfully prepared competition "%s"' % competition_id))


def prepare_competition(competition):
    competition_log_dir = os.path.join(LOG_DIR, competition.log_file_dir)
    competition_prepared_log_dir = os.path.join(PREPARED_LOG_DIR, competition.log_file_dir)

    if not os.path.exists(competition_prepared_log_dir):
        os.mkdir(competition_prepared_log_dir)
    os.chdir(competition_log_dir)

    for log_file_name in glob.glob(f"*.{RAW_LOG_FILE_FORMAT}"):
        try:
            logging.info("start preparing: " + log_file_name)

            prepared_file_name = os.path.basename(log_file_name) + ".zip"

            summary = read_log_summary(log_file_name)
            score = read_last_score(log_file_name)
            create_match(competition, summary, prepared_file_name, score)

            prepared_zip_file_path = os.path.join(competition_prepared_log_dir, prepared_file_name)
            with zipfile.ZipFile(prepared_zip_file_path, mode='w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as logzip:
                logzip.write(log_file_name, 'log.jlog')
                logging.info("zip file created: " + prepared_zip_file_path)

        except CommandError as err:
            logging.error(err)


def create_match(competition, summary, prepared_file_name, score=None):
    try:
        match = Match.objects.get(served_file_name=prepared_file_name)
        match.competition = competition
        match.team_name = summary['TeamName']
        match.map_name = summary['MapName']
        match.score = score
        match.served_file_name = prepared_file_name
        match.save()

    except Match.DoesNotExist:
        Match.objects.create(
            competition=competition, 
            round=None, 
            team_name=summary['TeamName'],
            map_name=summary['MapName'],
            score=score,
            served_file_name=prepared_file_name
        )


def read_log_summary(file_name):
    try:
        with open(file_name, 'rb') as log_file:
            summary_string = log_file.readline()
            log_file.close()
        summary_dict = json.loads(summary_string)
        return summary_dict

    except IOError:
        raise CommandError(f"Could not read summary: {file_name}")
    except ValueError:
        raise CommandError(f"Could not load summary: {file_name} / {summary_string}")

def read_last_score(file_name):
    try:
        with open(file_name, 'rb') as log_file:
            lines = log_file.readlines()
            log_file.close()
            last_line = lines[-1]
        last_line_dict = json.loads(last_line)
        last_line_info = last_line_dict["Info"]
        last_line_score = last_line_info["Score"]
        return float(last_line_score)
    except IOError:
        raise CommandError(f"Could not read last score: {file_name}")
    except ValueError:
        raise CommandError(f"Could not load last score: {file_name} / {last_line}")
