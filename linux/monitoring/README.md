## install

```
sudo apt-get install net-tools
sudo apt-get install sysstat
```

## Network

### ifconfig

* 네트워크 인터페이스 정보 확인 및 설정 가능 명령
  * [eth] : 랜 카드 네트워크 인터페이스
  * flags : UP(활성화), BROADCAST(브로드캐스트 지원), RUNNING(활성화 중), MULTICAST(멀티캐스트 지원)
  * mtu [n] : 한 번에 전송 가능한 패킷 크기
  * inet [ip] : IPv4 주소
  * broadcast [ip] : 브로드캐스트 주소
  * txqueuelen [n] : 전송 버퍼 크기

### netstat

* 네트워크 상태 모니터링
* 현재 시스템에 연결된 네트워크 상태, 라우팅 테이블, 인터페이스 상태 확인 가능
  * State
    * [] : 연결되어 있지 않음
    * [LISTENING] : 연결요청에 대한 응답준비가 되어 있는 상태
    * [CONNECTED] 연결이 이루어진 상태

### route (= netstat -r)

* 라우팅 테이블 정보 확인
  * Destination : 목적지 네트워크
  * Gateway : 목적지로 가기 위한 게이트웨이 주소
  * Genmask : 0.0.0.0 - 기본 게이트웨이, 255.255.255.255 - 호스트
  * Flags : 해당 경로에 대한 정보
    * U(up), H(목적지 host), G(게이트웨이 사용)

## Server

### uname

* 시스템과 커널 정보 확인 (일반적으로 uname -a 를 사용함)

### top

* 운영체제 작업 모니터링
  * PID : 프로세스 ID
  * USER : 프로세스를 실행시킨 사용자
  * PR : 프로세스 우선순위
  * NI : 마이너스를 가지면 우선순위가 높음
  * VIRT : 프로세스가 소비하고 있는 총 가상 메모리
  * RES : 현재 페이지가 상주하고 있는 크기
  * SHR : 일종의 공유 메모리 크기
  * S : 프로세스의 상태
  * %CPU : CPU 사용률
  * %MEM : 메모리 사용률
  * TIME+ : 프로세스가 CPU 를 사용한 시간
  * COMMAND : 실행된 명령어

### free

* 메모리 정보 확인
  * total : 설치된 총 메모리 크기 / 설정된 스왑 크기
  * used : total - buff/cache 메모리 크기 / 사용 중인 스왑 크기
  * free : total - used - buff/cache 메모리 크기 / 사용되지 않은 스왑 크기
  * shared : 여러 프로세스에서 사용할 수 있는 공유 메모리
  * buff/cache : 버퍼와 캐시를 더한 사용 중인 메모리
  * available : swapping 없이 새로운 프로세스에서 할당 가능한 메모리의 예상 크기

### vmstat

* 메모리, 페이징, 블록장치의 I/O, CPU 상태 확인
  * procs
    * r : 대기중인 프로세스의 수
    * b : sleep 상태에 있는 프로세스의 수
  * memory : free 의 내용과 같다
  * swap
    * si : swap-in (disk -> memory) 된 메모리
    * so : swap-out (memory -> disk) 된 메모리
  * io
    * bi : 디바이스에서 읽은 블록의 1초간의 평균 양
    * bo : 디바이스에 쓰인 블록읜 1초간의 평균 양
  * system
    * in : 1초당 인터럽트 횟수
    * cs : 1초당 context switch 횟수

### iostat

* 디스크 입출력에 대한 통계 정보

### df

* 마운트된 파일 시스템의 크기와 용량을 확인할 수 있는 명령어
