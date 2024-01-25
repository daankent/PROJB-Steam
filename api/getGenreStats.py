import json
import sortOwnedGames
def getGenreStats():
    """
        Functie om statistieken van game genres weer te geven

        Returns:
                object - met aantal keer dat elk genre voorkomt
    """
    
    # json bestand openen
    with open("steam.json") as f:
        # json inladen
        games = json.load(f)
        
        # dictionary voor de tellingen aanmaken
        counts = {}
        
        # voor elke game alle genres bekijken en toevoegen aan de tellingen
        for game in games:
            genres = game["genres"].split(";")
            for genre in genres:
                if genre in counts:
                    counts[genre] += 1
                else:
                    counts[genre] = 1
        
        # voor elke telling een dictionary toeveogen aan de list
        list = []
        for i in counts:
            list.append({"genre": i, "aantal": counts[i]})
            
        # De list met tellingen sorteren op basis van aantal 
        sortedList = sortOwnedGames.asc(list, "aantal")
        return sortedList