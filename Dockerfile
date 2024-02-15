FROM openjdk:21
COPY ./target/NeroAnimals-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
