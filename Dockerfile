FROM nginx

COPY dist /usr/share/nginx/html
COPY run_nginx.sh /
RUN chmod 755 /run_nginx.sh
RUN mv /usr/share/nginx/html/assets/config.json /usr/share/nginx/html/assets/config.json.template
RUN mv /usr/share/nginx/html/index.html /usr/share/nginx/html/index.html.template

CMD /run_nginx.sh