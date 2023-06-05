# RemoteCarBackend

Demo - docker-compose up

Swagger - http://localhost:8080/swagger-ui/index.html#/

Request path - http://localhost/api/ instead of http://localhost:8081/

# Test

1. Start python websocket server and java backend
2. Go to swagger and send : POST /car_admin with body:

   {
   "name": "string",
   "url": "ws://localhost:8000/",
   "fps": 0 }

3. Send POST /car/admin/start/1
4. Start react webapp

# Keycloack

1. docker-compose up
2. log in to keycloak (admin, admin) add admin user\
   http://localhost:8080/admin
3. To get token
   http://localhost/auth/realms/SpringBootKeycloak/protocol/openid-connect/token

   body: \
TYPE: x-www-from-urlencoded \
{ \
   client_id:springboot-keycloak-client \
   username: XXX \
   password: XXX \
   grant_type: password \
}
4. Later need to use refresh token
