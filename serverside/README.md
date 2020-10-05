# Christopher  

Christopher is a backend of RCRS-Webviwer.

### Before Deploy:

```sh
    python manage migrate
    python manage collectstatic
```

### Add competition:

```sh
    python manage.py shell
    # ADD COMPETITION 
    >>> from christopher.models import competition
    >>> competition.objects.create(<ARGS>);

    # COPY LOG files into web_viewer_logs
    python manage.py prepare <COMPEITION_ID>
```

### Deploy:

```sh
    docker-compose up
```
