import json


def loadJsonData():
    """Functie die de data uit het json bestand inlaadt en returned."""

    # bestand openen
    file = open('steam.json')

    # json inladen
    data = json.load(file)

    # bestand sluiten
    file.close()

    # data returnen
    return data


def sortedGames(reversed=False):
    """Functie die de ingeladen games uit het json bestand sorteert op alfabetische volgorde van de naam. \n Als reverse == True dan worden de games teruggegeven in omgekeerd alfabetische volgorde."""
    # games inladen met de loadJsonData functie
    games = loadJsonData()

    # games sorteren op alfabetische volgorde (spaties, " en ' weghalen aan begin en eind
    games.sort(key=lambda game: game['name'].strip(' " \''), reverse=reversed)

    # gesorteerde games returnen
    return games
