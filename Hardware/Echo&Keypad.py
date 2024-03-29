import time

from serial.tools import list_ports
import serial
import webbrowser
import subprocess

i = 0
steam = r"C:\Program Files (x86)\Steam\Steam.exe"
def read_serial(port):
    """Read data from serial port and return as string."""
    line = port.read(1000)
    return line.decode()


# First manually select the serial port that connects to the Pico
serial_ports = list_ports.comports()

print("[INFO] Serial ports found:")
for i, port in enumerate(serial_ports):
    print(str(i) + ". " + str(port.device))

pico_port_index = int(input("Which port is the Raspberry Pi Pico connected to? "))
pico_port = serial_ports[pico_port_index].device

# Open a connection to the Pico
with serial.Serial(port=pico_port, baudrate=115200, bytesize=8, parity='N', stopbits=1, timeout=1) as serial_port:
    if serial_port.isOpen():
        print("[INFO] Using serial port", serial_port.name)
    else:
        print("[INFO] Opening serial port", serial_port.name, "...")
        serial_port.open()


    while True:
        serial_port.flush()
        mes = serial_port.read_until().strip()
        if mes.decode() == "|" and i == 0:
            subprocess.Popen([steam])
            i += 1
        if mes.decode() == "A":
            webbrowser.open('http://steamhub.nl/', new=2, autoraise=True)
        if mes.decode() == "B":
            webbrowser.open('https://canvas.hu.nl/', new=2, autoraise=True)
        if mes.decode() == "C":
            webbrowser.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', new=2, autoraise=True)
        if mes.decode() == "D":
            webbrowser.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', new=2, autoraise=True)
