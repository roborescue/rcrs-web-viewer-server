# Christopher  

Christopher is a backend of RCRS-Webviwer.

### Before Deployment:

```sh
    make deploy
```

### Add Competition:

```sh
    python manage.py shell
    # ADD COMPETITION 
    >>> from christopher.models import competition
    >>> competition.objects.create(<ARGS>);

    # COPY zipped JLog files into web_viewer_logs
    python manage.py prepare <COMPEITION_ID>
```

### Deploy:

```sh
    docker-compose up
```
