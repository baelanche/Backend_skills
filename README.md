# Install

## Docker

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

#### 1. Apache

```
$ docker pull httpd
```
