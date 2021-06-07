import os

django_settings = 'settings'
bind = [":8000"]
workers = int(os.environ.get('NUM_WORKERS', 4))
threads = int(os.environ.get("NUM_THREADS", 2))
timeout = 15
max_requests = 1200
max_requests_jitter = int(max_requests * 0.1)

preload = True

service_name = os.environ.get('SERVICE_NAME', 'rcrs-webviwer')
