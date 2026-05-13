# Stage 1 : Build Angular
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2 : Nginx
FROM nginx:alpine

COPY --from=build /app/dist/front-cours/browser /usr/share/nginx/html

EXPOSE 80