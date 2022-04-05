FROM node:14-alpine as build

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --production

COPY . .

RUN npm run build
RUN echo "SKIP_PREFLIGHT_CHECK=true" >> .env

FROM nginx:1.12-alpine as prod

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]