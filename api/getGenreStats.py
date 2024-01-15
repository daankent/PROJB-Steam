import json
import sortOwnedGames
def getGenreStats():
    """
        Functie om statistieken van game genres weer te geven

        Returns:
                object - met aantal keer dat elk genre voorkomt
    """
    with open("steam.json") as f:
        games = json.load(f)
        
        counts = {}
        for game in games:
            genres = game["genres"].split(";")
            for genre in genres:
                if genre in counts:
                    counts[genre] += 1
                else:
                    counts[genre] = 1
        list = []
        for i in counts:
            list.append({"genre": i, "aantal": counts[i]})
            
        sortedList = sortOwnedGames.asc(list, "aantal")
        return sortedList
print(getGenreStats())