.PHONY: all service directories collectstatic migrate deploy

CURRENT_DIR:=$(shell pwd)
PYTHON:=$(shell which python3)

SYSTEMD_UNITS_PATH:=/etc/systemd/system
MANAGE_PY:=$(CURRENT_DIR)/manage.py

all: deploy service

service:
	# TODO: create systemd service unit ( $(SYSTEMD_UNITS_PATH)/rcrs-webviewer.service )
	# systemctl enable rcrs-webviewer.service

directories:
	@echo [*] mkdir -p ../prepared_logs ../web_viewer_logs
	@mkdir -p $(CURRENT_DIR)/../prepared_logs $(CURRENT_DIR)/../web_viewer_logs

collectstatic:
	@echo [*] python manage.py collectstatic --noinput -i *.zip
	@$(PYTHON) $(MANAGE_PY) collectstatic --noinput -i *.zip

migrate:
	@echo [*] python manage.py migrate
	@$(PYTHON) $(MANAGE_PY) migrate

deploy: directories collectstatic migrate

