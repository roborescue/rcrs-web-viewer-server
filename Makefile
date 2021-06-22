.PHONY: all root_check service directories collectstatic migrate ready_to_deploy deploy down

CURRENT_DIR:=$(shell pwd)
PYTHON:=$(shell which python3)
DOCKER_COMPOSE:=$(shell which docker-compose)
SYSTEMCTL:=$(shell which systemctl)

SYSTEMD_UNITFILE_NAME:=rcrs-webviewer.service
SYSTEMD_UNITS_PATH:=/etc/systemd/system
MANAGE_PY:=$(CURRENT_DIR)/manage.py
DOCKER_COMPOSE_YAML:=$(CURRENT_DIR)/docker-compose.yaml

SYSTEMD_SERVICE_TEMPLATE:=$(CURRENT_DIR)/meta/$(SYSTEMD_UNITFILE_NAME)
SYSTEMD_SERVICE_SAVE:=$(SYSTEMD_UNITS_PATH)/$(SYSTEMD_UNITFILE_NAME)

define cmd
	@echo [*] $(1)
	@$(1)
endef

all: ready_to_deploy

root_check:
ifneq '$(shell id -u)' '0'
	@echo " !>> You are not root, run this target as root please: Permission denied"
	exit 1
endif

service: root_check
	cat ${SYSTEMD_SERVICE_TEMPLATE} | \
		sed 's#{{DockerCompose}}#$(DOCKER_COMPOSE)#;s#{{DockerComposeYaml}}#$(DOCKER_COMPOSE_YAML)#g;s#{{WorkingDirectory}}#$(CURRENT_DIR)#g' - \
		> $(SYSTEMD_SERVICE_SAVE)
	# !! You should be root !!

	$(call cmd,\
		systemctl enable $(SYSTEMD_UNITFILE_NAME)\
	)
	# !! You should be root !!

directories:
	$(call cmd,\
		mkdir -p $(CURRENT_DIR)/prepared_logs $(CURRENT_DIR)/web_viewer_logs $(CURRENT_DIR)/nginx_logs $(CURRENT_DIR)/db \
	)

collectstatic:
	$(call cmd,\
		$(PYTHON) $(MANAGE_PY) collectstatic --noinput -i *.zip\
	)

migrate:
	$(call cmd,\
		$(PYTHON) $(MANAGE_PY) migrate\
	)

ready_to_deploy: service directories collectstatic migrate service

deploy: root_check ready_to_deploy 
	$(call cmd,\
		$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_YAML) build\
	)
	$(call cmd,\
		$(SYSTEMCTL) restart $(SYSTEMD_UNITFILE_NAME)\
	)

down:
	$(call cmd,\
		$(SYSTEMCTL) stop $(SYSTEMD_UNITFILE_NAME)\
	)