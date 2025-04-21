FROM node:22 AS build

WORKDIR /usr/app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build --configuration=production

FROM nginx:1.27.4-alpine-slim
COPY --from=build /usr/app/dist/bot-gh/browser /usr/share/nginx/html
COPY --from=build /usr/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
