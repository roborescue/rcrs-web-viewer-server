from django.contrib import admin
from .models import Round, Competition, Match


@admin.register(Round)
class RoundAdmin(admin.ModelAdmin):
    pass


@admin.register(Competition)
class CompetitionAdmin(admin.ModelAdmin):
    pass


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    pass
