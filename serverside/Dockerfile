FROM python:3

MAINTAINER @armanaxh @amiraslanaslani

WORKDIR /app
COPY ./meta/requirements.txt /

RUN pip install -r /requirements.txt

ADD . /app

CMD ["./docker-entrypoint.sh"]