#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "DANH";
const char* password = "20071965";

const char* mqtt_server = "192.168.0.105";
WiFiClient espClient;
PubSubClient client(espClient);

#define led 13



void setup() {
  pinMode(led, OUTPUT);
  Serial.begin(9600);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  reconnect();
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++)
    Serial.print((char)payload[i]);
  
  if ((char)payload[0] == 'o' && (char)payload[1] == 'n') //on
    digitalWrite(led, HIGH);
  else if ((char)payload[0] == 'o' && (char)payload[1] == 'f' && (char)payload[2] == 'f') //off
    digitalWrite(led, LOW);
  Serial.println();
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP8266")) {
      Serial.println("connected");
      client.publish("ESP8266/connection/board", "Connected!");
      client.subscribe("ESP8266/LED/status");
    } 
    else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}



void loop() {
  // kiểm tra nếu ESP8266 chưa kết nối được thì sẽ thực hiện kết nối lại
  if (!client.connected()) {
    reconnect();
  }

  client.loop();  
  /*sẽ kiểm tra thời gian kết nối của Client với gói KEEP_ALIVE để đưa ra các thông tin về trạng thái kết nối của ESP8266 
   * đồng thời lấy dữ liệu của message từ buffer để gửi đến các Client đã subcribe topic.
  */
}
