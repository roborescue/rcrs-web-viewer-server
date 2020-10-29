from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from christopher.models import Competition, Round, Match
from collections import OrderedDict
from urllib.parse import urlencode

def index(request):
    return competitions(request)

def viewer(request):
    return render(request, 'match.html', {})

def competitions(request, alert_msg=None, status=200):
    comps = Competition.objects.all()
    
    return render(request, 'competitions.html', {
        'competitions': comps,
        'alert_msg': alert_msg
    }, status=status)

def competition(request, competition_name, alert_msg=None, status=200):
    competition = Competition.objects.filter(name=competition_name).first()
    if not competition:
        return competition_notfound(request)

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
        'rounds': sortedRounds,
        'alert_msg': alert_msg
    }, status=status)

def match(request, competition_name, match_id):
    competition = Competition.objects.filter(name=competition_name).first()
    if not competition:
        return competition_notfound(request)

    match = Match.objects.filter(id=match_id).first()
    if not match:
        return match_notfound(request, competition_name)
    
    # Create redirection URL
    url = reverse('webviewer')
    kwargs = {
        'file': match.log_file,
        'infile': match.inner_log_name
    }
    params = urlencode(kwargs)
    print("/%s?%s" % (url, params))

    return HttpResponseRedirect(url + "?%s" % params)

def competition_notfound(request):
    return competitions(
        request, 
        alert_msg="Your requested competition doesn't exist.", 
        status=404
    )

def match_notfound(request, competition_name):
    return competition(
        request,
        competition_name=competition_name,
        alert_msg="Your requested match doesn't exist.", 
        status=404
    )