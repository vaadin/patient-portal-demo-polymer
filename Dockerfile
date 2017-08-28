FROM philipjkim/polymer-cli-nginx:latest

USER root

RUN npm install -g n && \
    n stable
RUN npm i -g polymer-cli --unsafe-perm

COPY nginx.conf /etc/nginx/nginx.conf
#ARG apiUrl=//\${window.location.hostname}:8080

COPY . /opt/polymer

WORKDIR /opt/polymer

RUN bower install --allow-root
RUN polymer build

EXPOSE 80

RUN chmod +x /opt/polymer/run.sh
ENTRYPOINT ["/opt/polymer/run.sh"]