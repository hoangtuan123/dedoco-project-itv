docker run -d \
    --name postgres \
    -e POSTGRES_PASSWORD=mysecretpassword \
    -e POSTGRES_HOST_AUTH_METHOD=trust \
    -p 5432:5432 \
    postgres