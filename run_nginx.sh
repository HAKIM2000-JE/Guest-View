#!/bin/bash
envsubst < /usr/share/nginx/html/assets/config.json.template > /usr/share/nginx/html/assets/config.json \
&& envsubst < /usr/share/nginx/html/index.html.template > /usr/share/nginx/html/index.html \
&& rm /usr/share/nginx/html/assets/config.json.template /usr/share/nginx/html/index.html.template \
&& nginx -g 'daemon off;'