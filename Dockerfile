FROM openjdk:11
ADD target/demo-0.0.1-SNAPSHOT.jar demo-0.0.1-SNAPSHOT.jar
EXPOSE 8077
ENTRYPOINT ["java", "-jar", "demo-0.0.1-SNAPSHOT.jar"]
