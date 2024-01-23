from machine import Pin
import time
import select
import sys
import neopixel
import math

pixel_pin = machine.Pin(27)
num_pixels = 8
pixels = neopixel.NeoPixel(pixel_pin, num_pixels)
BRIGHTNESS = 0.01

poll_obj = select.poll()
poll_obj.register(sys.stdin, select.POLLIN)

#-------------------------------

#Functie om helderheid aan te passen
def set_brightness(color):
    r, g, b = color
    r = int(r * BRIGHTNESS)
    g = int(g * BRIGHTNESS)
    b = int(b * BRIGHTNESS)
    return (r, g, b)

#Percentage wordt omgerekend naar aantal lichtjes die aan moeten
def process_percentage(percentage):
    # Aantal pixels inschakelen op basis van afgerond percentage
    pixels_to_turn_on = (percentage / 100 * num_pixels)
#Aantal lichtjes die aan moeten worden naar boven afgerond
    for i in range(math.ceil(pixels_to_turn_on)):
        color = (0, 255, 0)
        color = set_brightness(color)
        pixels[i] = (color)
#De rest van de lichtjes gaan uit
    for i in range(math.ceil(pixels_to_turn_on), num_pixels):
        pixels[i] = (0, 0, 0)

#--------------------------------------------------------------

while True:
    #Er wordt gekeken naar data die binnenkomt
    poll_results = poll_obj.poll(1)
    #als er data binnen is gaat de loop lopen
    if poll_results:
        #data wordt van string uitgelezen
        data = sys.stdin.readline().strip()
        percentage = data
        process_percentage(percentage)
        pixels.write()
        time.sleep(25)
