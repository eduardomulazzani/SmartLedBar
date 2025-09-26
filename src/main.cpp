#include <FastLED.h>
#define NUM_LEDS 60
#define DATA_PIN 13

CRGB leds[NUM_LEDS];

void setup() { 
   FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);

   for(int x = 0; x < NUM_LEDS; x ++) {
    leds[x] = CRGB::White; 
    FastLED.show();
   }

   leds[5] = CRGB::Red; 
   FastLED.show();

   leds[9] = CRGB::Green;
   FastLED.show();
}

void loop() {

}