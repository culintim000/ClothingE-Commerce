FROM openjdk:11

COPY  target/spring-rabbitmq-producer-0.0.1-SNAPSHOT.jar /usr/local/tomcat/webapps/producer.jar

ENTRYPOINT ["java", "-jar", "/usr/local/tomcat/webapps/producer.jar"]