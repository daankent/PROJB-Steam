import requests
from serial.tools import list_ports
import serial
import utime
import time

serial_ports = list_ports.comports()


#Zoek naar beschikbare ports
print("[INFO] Gevonden seriële poorten:")
for i, port in enumerate(serial_ports):
    print(str(i) + ". " + str(port.device))

pico_port_index = int(input("Op welke poort is de Raspberry Pi Pico aangesloten? "))
pico_port = serial_ports[pico_port_index].device


# Open een verbinding met de Pico
with serial.Serial(port=pico_port, baudrate=115200, bytesize=8, parity='N', stopbits=1, timeout=1) as serial_port:
    if serial_port.isOpen():
        print("[INFO] Gebruik seriële poort", serial_port.name)
    else:
        print("[INFO] Open seriële poort", serial_port.name, "...")
        serial_port.open()

#---------------------------------------------------------------------------------------------------

#Informatie voor api
    player_id = "76561198819434745"
#Verbinding met api maken
    playerinfo = requests.get(f'http://localhost:8000/playerInfoExtended?id={player_id}').json()

    friends_states = []
    for friend in playerinfo[0]["friends"]:
        friends_states.append(friend["personastate"])


#Bereken percentage van vrienden die online zijn
    def calcPercentageOnline():
        friends_states = []
        for friend in playerinfo[0]["friends"]:
            friends_states.append(friend["personastate"])

        online = 0
        for i in friends_states:
            if i != 0:
                online += 1
#return het percentage
        return (online / len(friends_states)) * 100

#--------------------------------------------------------

    while True:
        #data wordt afgerond van float naar int
        data = int(calcPercentageOnline())
        #clear de seriele connectie
        serial_port.flush()
        #schrijf naar de pico
        serial_port.write(F"{str(data)}\r".encode())
        time.sleep(30)
