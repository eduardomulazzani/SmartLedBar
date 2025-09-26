#include <FastLED.h>
#include <ArduinoJson.h>
#include "../../.pio/libdeps/nanoatmega328/FastLED/src/FastLED.h"
#define NUM_LEDS 10
#define DATA_PIN 13

CRGB leds[NUM_LEDS];

byte byteRead;

void processMessage(String message) {
  StaticJsonDocument<200> doc;

  DeserializationError error = deserializeJson(doc, message);

  if (error) {
    Serial.print(F("Falha ao fazer parse: "));
    Serial.println(error.f_str());
    return;
  }

  // Acessar dados
  const String color = doc["color"];
  int position = doc["position"];

  u8 red = doc["rgb"]["red"];
  u8 green = doc["rgb"]["green"];
  u8 blue = doc["rgb"]["blue"];

  if(color.equals("red")){
    leds[position] = CRGB::Red; 
    FastLED.show();
  }else if(color.equals("green")){
    leds[position] = CRGB::Green; 
    FastLED.show();
  }else if(color.equals("blue")){
    leds[position] = CRGB::Blue; 
    FastLED.show();
  }else if(color.equals("rgb")){
    for(int x = 0; x < NUM_LEDS; x ++) {
      leds[x] = CRGB(red, green, blue); 
      FastLED.show();
    }
  }

  Serial.print("COLOR: ");
  Serial.println(color);
  Serial.print("POSITION: ");
  Serial.println(position);
  Serial.print("RED: ");
  Serial.println(red);
  Serial.print("GREEN: ");
  Serial.println(green);
  Serial.print("BLUE: ");
  Serial.println(blue);

}

void setup() {
   Serial.begin(19200);

   Serial.println("Pronto");

   FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);

   for(int x = 0; x < NUM_LEDS; x ++) {
    leds[x] = CRGB::White; 
    FastLED.show();
   }
}

void loop() {
  if (Serial.available()) {
    String received = Serial.readStringUntil('\n');

    processMessage(received);
  }
}