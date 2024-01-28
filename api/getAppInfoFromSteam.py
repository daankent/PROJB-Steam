import requests
from fastapi import HTTPException


def getAppInfoFromSteam(appid):
    """
        Functie om game informatie op te halen bij de server van steam
        Args:
            appid:   appid van de game waar informatie voor moet worden opgevraagd
        Returns:
                gameinfo - info van de opgevraagde game
    """
    try:
        # Verzoek doen aan de steam server
        appData = requests.get(
            f"https://store.steampowered.com/api/appdetails?appids={appid}").json()
        
        # het antwoord returnen
        return appData[str(appid)]["data"]
    except:
        # error bericht weergeven
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het ophalen van de app informatie")

