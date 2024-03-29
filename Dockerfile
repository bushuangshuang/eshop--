FROM nginx:1.13-alpine
RUN apk update && apk add curl
COPY ./distsvt/ /usr/share/nginx/html

STOPSIGNAL SIGTERM
HEALTHCHECK --interval=5s --timeout=3s \
  CMD curl -fs http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]

