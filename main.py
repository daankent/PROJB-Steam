import json


def loadJsonData():
    """Functie die de data uit het json bestand inlaadt en returned.)"""

    # bestand openen
    file = open('steam.json')

    # json inladen
    data = json.load(file)

    # bestand sluiten
    file.close()

    # data returnen
    return data
