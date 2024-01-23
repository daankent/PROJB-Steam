from machine import Pin
import utime
import select
import sys
import time

matrix = [
    ["1", "2", "3", "A"],
    ["4", "5", "6", "B"],
    ["7", "8", "9", "C"],
    ["*", "0", "#", "D"]
]

columPins = [3,2,1,0]
rowPins = [7,6,5,4]

key = 0

row = []
col = []

trigger = Pin(19, Pin.OUT)
echo = Pin(18, Pin.IN)
led = Pin(15, Pin.OUT)
boardled = Pin(25, Pin.OUT)

for button in rowPins:
    row.append(Pin(button,Pin.OUT))

for button in columPins:
    col.append(Pin(button,Pin.IN,Pin.PULL_DOWN))

#--------------------------------

# Blink led to confirm succesful flashing
for _ in range(5):
    boardled(0)
    time.sleep(.1)
    boardled(1)
    time.sleep(.1)

#-------------------------------------------

def scanKeypad():
    global key
    for rowKey in range(4):
        row[rowKey].value(1)
        for colKey in range(4):
            if col[colKey].value() == 1:
                key = matrix[rowKey][colKey]
                row[rowKey].value(0)
                return(key)
        row[rowKey].value(0)

def printKey():
    key=scanKeypad()
    if key is not None:
        print("{}".format(key))
    utime.sleep_ms(100)

#----------------------------------------------

def ultra():
    trigger.low()
    utime.sleep_us(2)
    trigger.high()
    utime.sleep_us(5)
    trigger.low()

    while echo.value() == 0:
        signaloff = utime.ticks_us()
    while echo.value() == 1:
        signalon = utime.ticks_us()

    timepassed = signalon - signaloff
    distance = (timepassed * 0.0343) / 2

    if distance <= 15 and distance >= 0:
        return 1
    else:
        return 0
    utime.sleep_ms(100)

#------------------------------------------------


poll_obj = select.poll()
poll_obj.register(sys.stdin, select.POLLIN)

while True:
    if printKey() is not None:
        sys.stdout.write(f'{printKey()}')
    if ultra() != 0:
        sys.stdout.write('|'"\r")
    utime.sleep_ms(100)