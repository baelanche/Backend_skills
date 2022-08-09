# Install

```
$ sudo apt-get update && upgrade
```

```
$ sudo apt install gcc
```

```
$ wget http://download.redis.io/redis-stable.tar.gz
$ tar xvzf redis-stable.tar.gz
$ cd redis-stable
$ make MALLOC=libc
```

```
$ sudo apt install redis-server
```

# execute (two terminals)

T1 :

```
$ redis-server
```

T2 :

```
$ redis-cli
127.0.0.1:6379> set myKey "myvalue"
OK
127.0.0.1:6379> get myKey
"myvalue"
```

T2 :

```
127.0.0.1:6379> showdown nosave
not connected>
```

T2 :
```
$ redis-cli shutdown
```
