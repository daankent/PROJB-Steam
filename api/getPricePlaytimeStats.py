import json
import sortOwnedGames
def getPricePlaytimeStats():
    """
        Functie om data te verzamelen voor een vergelijking van de prijs van een game en zijn gemiddelde speeltijd

        Returns:
                list met x en y values
    """
    with open("steam.json") as f:
        games = json.load(f)
        
        values = []
        for game in games:
          if  game["average_playtime"] > 10000 or   game["price"] > 100:
            continue
          else:
             values.append({"x": game["average_playtime"], "y": game["price"]})
            
        return values
