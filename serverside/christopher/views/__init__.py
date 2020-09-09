from django.http import HttpResponse
from django.shortcuts import render
from christopher.models import Competition, Round, Match
from collections import OrderedDict

def index(request):
    return competitions(request)

def competitions(request):
    comps = Competition.objects.all()
    
    return render(request, 'competitions.html', {
        'competitions': comps
    })

def competition(request, competition_name):
    competition = Competition.objects.filter(name=competition_name).first()
    if not competition:
        return notfound(request)

    rounds = {}
    matches = Match.objects.filter(competition=competition)

    for match in matches:
        key = (-1, None)
        if match.round:
            key = (match.round.order, match.round.name)
        if not (key in rounds):
            rounds[key] = []
        rounds[key].append(match)

    sortedRounds = OrderedDict(sorted(rounds.items()))

    return render(request, 'competition.html', {
        'competition': competition,
        'rounds': sortedRounds
    })

def match(request, competition_name, match_id):
    competition = Competition.objects.filter(name=competition_name).first()
    if not competition:
        return notfound(request)

    match = Match.objects.filter(id=match_id).first()
    if not match:
        return notfound(request)
    
    return render(request, 'match.html', {
        'match': match
    })

def notfound(request):
    return HttpResponse("404 notfound")