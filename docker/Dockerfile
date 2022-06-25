FROM ubuntu
RUN \
    apt-get update && \
    apt-get install -y python3 
WORKDIR /var/www/html
COPY ["index.html", "."]
CMD ["python3", "-u", "-m", "http.server"]


# RUN : when build
# WORKDIR : mkdir && cd
# CMD : after build

# BUILD CMD : docker build -t [image name] [path of Dockerfile]
