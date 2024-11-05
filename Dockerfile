FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src/app .
RUN npm run build --prod

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/hrapid-frontend/browser /usr/share/nginx/html
EXPOSE 80
