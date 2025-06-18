# Dockerfile

FROM node:20-alpine as build
WORKDIR /app
COPY . .

# No need to define ENV here anymore, use .env file
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
