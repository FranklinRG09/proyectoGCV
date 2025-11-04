# frontproyectodaw/Dockerfile
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install --include=dev
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80