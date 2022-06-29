FROM node:16-alpine as builder
WORKDIR /app

COPY package*.json ./

RUN npm i @angular/cli
RUN npm ci

COPY . .
RUN ./node_modules/.bin/ng build --prod

FROM nginx:latest

COPY --from=builder /app/dist/wefox-post-manager /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'
