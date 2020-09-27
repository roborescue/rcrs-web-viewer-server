import glob
import json
import logging
import os
from shutil import copy2

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
            logging.info(log_file_name)
            summary = read_log_summary(log_file_name)
            create_match(competition, summary, log_file_name)
            copy2(log_file_name, competition_prepared_log_dir)
        except CommandError as err:
            logging.error(err)


def create_match(competition, summary, log_file_name):
    try:
        match = Match.objects.get(log_name=log_file_name)
        match.competition = competition
        match.round = None
        match.team_name = summary['TeamName']
        match.map_name = summary['MapName']
        match.log_name = log_file_name
        match.save()
        
    except Match.DoesNotExist:
        Match.objects.create(
            competition=competition, 
            round=None, 
            team_name=summary['TeamName'],
            map_name=summary['MapName'],
            log_name=log_file_name
        )


def read_log_summary(file_name):
    try:
        with open(file_name, 'rb') as log_file:
            summary_string = log_file.readline()
        summary_dict = json.loads(summary_string)
        return summary_dict

    except IOError:
        raise CommandError(f"Could not read summary: {file_name}")
    except ValueError:
        raise CommandError(f"Could not load summary: {file_name} / {summary_string}")
