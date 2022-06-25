# Docker

|OS|Docker|
|:---:|:---:|
|program|image|
|process|container|

<b>dokcer hub</b> --<sub>(pull)</sub>--> <b>image</b> --<sub>(run)</sub>--> <b>container</b>

## Install

#### 1. update and upgrade

```
$ sudo apt-get update && upgrade
```

#### 2. install https connection packages

```
$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

#### 3. add GPG key

```
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

#### 4. register docker repository

```
$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

#### 5. install docker

```
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

#### 6. check docker

```
$ sudo docker version
```

#### 7. use docker without 'sudo'

```
$ sudo usermod -aG docker $USER
$ reboot
```

## Docker hub

https://hub.docker.com 는 docker 의 marketplace 이다.  
여기서 제공하는 package 들을 확인하고 다운받을 수 있다.

## Command

#### 1. pull

```
$ docker pull [image name]
```

#### 2. run

```
$ docker run --name [custom name] [image name]
```

#### 3. check container list

```
$ docker ps
```

#### 4. stop (not remove) / start

```
$ docker stop [custom name or container id]
```

stopped image is listed by `docker ps -a`

```
$ docker start [custom name or container id]
```

#### 5. log

```
$ docker logs -f [custom name or container id]
```

-f : observe realtime

#### 6. remove

```
$ docker rm -f [custom name or container id]
```

running container can be removed `force` command

#### 7. remove image

```
$ docker rmi [image name]
```

#### 8. port forwarding

```
$ docker run -p 80:80 httpd
```

-p [host port]:[container port]

#### 9. control container

```
$ docker exec -it [container name] [command]
```

## Link File System

container 안의 내용을 작업하고 나서 container 를 지운다면 작업 내용이 모두 날아갈 것이다.  
그래서 host 에서의 작업을 container 에 연결하여 반영시키는 방법으로 한다.  
호스트에서 직접 수정하기 때문에 버전 관리, 백업에 용이하다.

```
$ docker run --name [container name] -p [host port]:[container port] -v [local directory]:[container directory] [image name]
```

## Make image

* by commit container
* by commit container and push github
* by build Dockerfile

### 1. by commit container

terminal 1 :

```
$ docker run -it --name my-ubuntu 
```

terminal 2 :

```
$ docker commit my-ubuntu baelanche:ubuntu
```

### 2. by commit container (git packages)

#### 1. Generate token
 
Connect github.com - Settings - Developer settings - Personal access tokens - Generate new token - Check write:packages, delete:packages

#### 2. Register your token as environment variable

```
$ export CR_PAT=[your token]
$ echo $CR_PAT
```

#### 3. Login to the Container registry service

```
$ echo $CR_PAT | docker login ghcr.io -u [USERNAME] --password-stdin
```

#### 4. Whenever bash booted, register token

```
$ vi ~/.bashrc

# Bash into running container
export CR_PAT=[your token]
```

test :

```
source ~/.bashrc
echo $CR_PAT
```

#### 5. Docker image push

terminal 1 :

```
$ docker -it --name my-ubuntu ubuntu
```

terminal 2 :

```
$ docker commit my-ubuntu ghcr.io/[username]/my-ubuntu:1.0
$ docker images
$ docker push ghcr.io/[username]/my-ubuntu:1.0
```

## Share image

```
$ docker commit my-ubuntu [docker hub id]/ubuntu:1.0
```

```
$ docker login
```

> input your docker hub id and password

```
$ docker push [docker hub id]/ubuntu:1.0
```

