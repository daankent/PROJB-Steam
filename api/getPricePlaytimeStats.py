import json
import sortOwnedGames
def getPricePlaytimeStats():
    """
        Functie om data te verzamelen voor een vergelijking van de prijs van een game en zijn gemiddelde speeltijd

        Returns:
                list met x en y values
    """
    # json bestand openen
    with open("steam.json") as f:
      # json inladen
        games = json.load(f)
        
        values = []
        # voor elke game de waardeen bekijken
        for game in games:
          # als de waarde buiten de paramaters valt niks doen
          if  game["average_playtime"] > 10000 or   game["price"] > 100:
            continue
          # als de waarde binnen de parameters valt deze waarde toevoegen aan de lijst
          else:
             values.append({"x": game["average_playtime"], "y": game["price"]})
        # lijst met waarden teruggeven
        return values
