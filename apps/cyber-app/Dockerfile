# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
# Force an internal package manager update to patch residual CVEs
RUN apk update && apk upgrade --no-cache

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime
# Patch runtime OS packages to remediate known CVEs in the base image
RUN apk update && apk upgrade --no-cache
WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
