from django.db import models


# Create your models here.
class Competition(models.Model):
    name = models.CharField(null=False, max_length=64)
    start_date = models.DateTimeField(null=True)
    end_date = models.DateTimeField(null=True)
    url = models.URLField(null=True)
    icon_path = models.FilePathField(null=True)
    log_file_dir = models.FilePathField(allow_folders=True, allow_files=False, null=False)


class Round(models.Model):
    name = models.CharField(null=False, max_length=64)


class Match(models.Model):
    competition = models.ForeignKey(Competition, on_delete=models.DO_NOTHING)
    round = models.ForeignKey(Round, on_delete=models.DO_NOTHING, default=None, null=True)
    team_name = models.CharField(max_length=64)
    log_name = models.CharField(max_length=128, unique=True)
