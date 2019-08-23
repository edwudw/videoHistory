FROM tiangolo/uwsgi-nginx-flask:python3.6-alpine3.7
RUN apk --update add bash nano
ENV UWSGI_INI uwsgi.ini
ENV STATIC_URL /static
ENV STATIC_PATH /app/app/static
WORKDIR /app
COPY . /app
RUN pip install -r /app/requirements.txt