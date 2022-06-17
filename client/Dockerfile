FROM nginx

WORKDIR /www/data
COPY ./dist .
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

