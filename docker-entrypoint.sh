#!/usr/bin/env bash

echo "Starting Christopher in '$MODE_ENV' mode...";


echo "Starting Gunicorn..."
exec gunicorn wsgi:application \
    --name christopher \
    --config ./meta/gunicorn.config.py \
    --log-level=debug \
    --worker-class gthread \
    --reload
