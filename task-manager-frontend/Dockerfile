# --- Stage 1: Build app ---
    FROM node:20-alpine as build
    WORKDIR /app
    COPY . .

    # Add this line to set the correct API URL before build
    ENV REACT_APP_API_URL=http://backend:8888
    RUN npm install && npm run build
    
    # --- Stage 2: Serve with nginx ---
    FROM nginx:alpine
    COPY --from=build /app/dist /usr/share/nginx/html
    EXPOSE 3000
    CMD ["nginx", "-g", "daemon off;"]
    