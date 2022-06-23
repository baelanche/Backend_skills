# Apache

## Install

```
$ docker pull httpd
```

## Check

```
$ docker images
```

## run

```
$ docker run --name ws -p 8080:80 httpd
```

## connect using browser

```
https://localhost:8080
```

![image](https://user-images.githubusercontent.com/48989903/175228080-2f209de8-1d4e-4d4c-98b6-792c1b0b4008.png)

## connect using terminal

```
$ docker exec -it ws /bin/bash
```

```
cd htdocs
apt update
apt install vim
vi index.html
```

## link file system

```
$ docker run --name ws -p 8888:80 -v ~/Desktop/Backend_skills/apache/htdocs:/usr/local/apache2/htdocs/ httpd
```
