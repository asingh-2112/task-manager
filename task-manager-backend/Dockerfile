# --- Stage 1: Build the JAR ---
    FROM openjdk:17-jdk-slim as build
    WORKDIR /app
    COPY . .
    RUN ./mvnw package -DskipTests
    
    # --- Stage 2: Run the JAR ---
    FROM openjdk:17-jdk-slim
    WORKDIR /app
    COPY --from=build /app/target/task-manager-backend-0.0.1-SNAPSHOT.jar app.jar
    EXPOSE 8888
    CMD ["java", "-jar", "app.jar"]
    