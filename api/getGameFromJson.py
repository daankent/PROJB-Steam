import json


def getGameFromJson(target):
    """
    Functie om een game op te halen uit het json bestand door middel van binary search. Als de game niet bestaat in het json bestand dan zal er -1 teruggegeven worden

    """
    id = int(target)
    with open("steam.json") as f:
        games = json.load(f)

        left = 0
        right = len(games) - 1
        while left < right:
            mid = (left + right) // 2
            if games[mid]["appid"] == id:
                return games[mid]
            elif games[left]["appid"] == id:
                return games[left]
            elif games[right]["appid"] == id:
                return games[right]
            else:
                if games[mid]["appid"] < id:
                    left = mid + 1
                else:
                    right = mid - 1
        return -1
