.PHONY: all service directories collectstatic migrate deploy

CURRENT_DIR:=$(shell pwd)
PYTHON:=$(shell which python3)
DOCKER_COMPOSE:=$(shell which docker-compose)

SYSTEMD_UNITFILE_NAME:=rcrs-webviewer.service
SYSTEMD_UNITS_PATH:=/etc/systemd/system
MANAGE_PY:=$(CURRENT_DIR)/manage.py
DOCKER_COMPOSE_YAML:=$(CURRENT_DIR)/docker-compose.yaml

SYSTEMD_SERVICE_TEMPLATE:=$(CURRENT_DIR)/meta/$(SYSTEMD_UNITFILE_NAME)
SYSTEMD_SERVICE_SAVE:=$(SYSTEMD_UNITS_PATH)/$(SYSTEMD_UNITFILE_NAME)

all: deploy service

root_check:
ifneq '$(shell id -u)' '0'
	@echo " !>> You are not root, run this target as root please: Permission denied"
	exit 1
endif

service: root_check
	echo $(DOCKER_COMPOSE)
	cat ${SYSTEMD_SERVICE_TEMPLATE} | \
		sed 's#{{DockerCompose}}#$(DOCKER_COMPOSE)#;s#{{DockerComposeYaml}}#$(DOCKER_COMPOSE_YAML)#g;s#{{WorkingDirectory}}#$(CURRENT_DIR)#g' - \
		> $(SYSTEMD_SERVICE_SAVE)
	# !! You should be root !!

	systemctl enable $(SYSTEMD_UNITFILE_NAME)
	# !! You should be root !!

directories:
	@echo [*] mkdir -p ../prepared_logs ../web_viewer_logs ../nginx_logs
	@mkdir -p $(CURRENT_DIR)/../prepared_logs $(CURRENT_DIR)/../web_viewer_logs

collectstatic:
	@echo [*] python manage.py collectstatic --noinput -i *.zip
	@$(PYTHON) $(MANAGE_PY) collectstatic --noinput -i *.zip

migrate:
	@echo [*] python manage.py migrate
	@$(PYTHON) $(MANAGE_PY) migrate

ready_to_deploy: service directories collectstatic migrate

deploy: root_check ready_to_deploy
	@echo [*] docker-compose -f $(DOCKER_COMPOSE_YAML) up --build -d
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_YAML) up --build -d

down:
	@echo [*] docker-compose -f $(DOCKER_COMPOSE_YAML) down
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_YAML) down