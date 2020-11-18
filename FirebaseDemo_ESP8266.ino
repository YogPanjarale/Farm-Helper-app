//
// Copyright 2015 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

// FirebaseDemo_ESP8266 is a sample that demo the different functions
// of the FirebaseArduino API.

#include <ESP8266WiFi.h>;
#include <FirebaseArduino.h>;

// Set these to run example.
#define FIREBASE_HOST "farm-helper-app.firebaseio.com"
#define FIREBASE_AUTH "fVro1R7X48gwbrCT0QD1inWxBUxAh93uYjjg1TH3"
#define WIFI_SSID "PANJALE_HOSPITAL"
#define WIFI_PASSWORD "12031975"

void setup() {
  Serial.begin(9600);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

int n;

void loop() {
 n=Firebase.getInt("number");
 if(Firebase.failed())
 {
  Serial.println("Error: "+Firebase.error());  
 }else 
 {
  Serial.println("N"+n);
 }

 delay(1000);
}
