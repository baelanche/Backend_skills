![image](https://github.com/baelanche/Backend_skills/assets/48989903/f330df31-86ea-44f5-961e-394b6bb01309)

## Install on Ubuntu

1. java
   * `sudo apt-get update`
   * `sudo apt install default-jre`
   * `sudo apt install default-jdk`
   * `java -version`
2. nginx
   * `sudo apt install nginx`
3. elk packages
   * `curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch |sudo gpg --dearmor -o /usr/share/keyrings/elastic.gpg`
   * `echo "deb [signed-by=/usr/share/keyrings/elastic.gpg] https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list`
   * `sudo apt-get update`
4. elastic search
   * `sudo apt install elasticsearch`
   * `sudo systemctl start elasticsearch` (wsl : `sudo service elasticsearch start`)
   * `sudo systemctl enable elasticsearch` (wsl : `sudo service elasticsearch enable`)
   * `curl -X GET "localhost:9200"`
5. kibana
   * `sudo apt install kibana`
   * `sudo systemctl start kibana` (wsl : `sudo service kibana start`)
   * `sudo systemctl enable kibana` (wsl : `sudo service kibana enable`)
6. reverse proxy
   * `sudo vi /etc/nginx/sites-available/default`
   * delete all and write down codes below
     ```
     server {
     
       listen 80;

       server_name _;

       location / {
         proxy_pass http://localhost:5601;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
       }
     }
     ```
   * `sudo systemctl reload nginx` (wsl : `sudo service nginx reload`)
7. connect kibana (http://localhost:5601)
   * ![image](https://github.com/baelanche/Backend_skills/assets/48989903/056e4958-ab36-4814-940c-c696ec3ddcfb)
8. logstash
   * `sudo apt install logstash`
   * `sudo vi /etc/logstash/conf.d/beats-input.conf`
   * ```
     input {
       beats {
         port => 5044
       }
     }
     ```
   * `sudo vi /etc/logstash/conf.d/elasticsearch-output.conf`
   * ```
     output {
       if [@metadata][pipeline] {
    	   elasticsearch {
       	 hosts => ["localhost:9200"]
       	 manage_template => false
      	 index => "%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"
      	 pipeline => "%{[@metadata][pipeline]}"
    	   }
       } else {
    	   elasticsearch {
      	 hosts => ["localhost:9200"]
      	 manage_template => false
      	 index => "%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"
    	   }
       }
     }
     ```
   * `sudo -u logstash /usr/share/logstash/bin/logstash --path.settings /etc/logstash -t`
      * no error : `Using config.test_and_exit mode. Config Validation Result: OK. Exiting Logstash`
   * `sudo systemctl start logstash` (wsl : `sudo service logstash start`)
   * `sudo systemctl enable logstash` (wsl : `sudo service logstash enable`)
      * when you meet `logstash: unrecognized service`
      * `sudo /usr/share/logstash/bin/system-install /etc/logstash/startup.options sysv` 
9. filebeat
   * `sudo apt install filebeat`
   * `sudo vi /etc/filebeat/filebeat.yml`
      * line 135 : `output.elasticsearch` -> `#output.elasticsearch`
      * line 137 : `hosts: ["localhost:9200"]` -> `#hosts: ["localhost:9200"]`
      * line 148 : `#output.logstash` -> `output.logstash`
      * line 150 : `#hosts: ["localhost:5044"]` -> `hosts: ["localhost:5044"]`
10. nginx logs
   * `sudo filebeat modules enable nginx`
   * `sudo filebeat setup --pipelines --modules nginx`
   * `sudo filebeat setup --index-management -E output.logstash.enabled=false -E 'output.elasticsearch.hosts=["localhost:9200"]'`
   * `sudo systemctl start filebeat` (wsl : `sudo service filebeat start`)
   * `sudo systemctl enable filebeat` (wsl : `sudo service filebeat enable`)
11. security
   * `sudo vi /etc/elasticsearch/elasticsearch.yml`
   * write down end of file
   * ```
     xpack.security.enabled: true
     xpack.security.transport.ssl.enabled: true
     ```
   * `sudo systemctl restart elasticsearch` (wsl : `sudo service elasticsearch restart`)
   * `sudo /usr/share/elasticsearch/bin/elasticsearch-setup-passwords interactive`
   * `sudo vi /etc/kibana/kibana.yml`
   * ```
     elasticsearch.username: "elastic"
     elasticsearch.password: "input_your_password"
     ```
   * `sudo systemctl restart kibana` (wsl : `sudo service kibana restart`)

12. usage
   * kibana
      * ![image](https://github.com/baelanche/Backend_skills/assets/48989903/9bf7f951-8513-43b0-84a4-afee077b8131)
   * elastic search
      * `curl --user elastic localhost:9200`
      * input your password   

