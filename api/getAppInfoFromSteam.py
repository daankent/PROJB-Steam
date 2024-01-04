import requests
import constants
from fastapi import HTTPException
import json


def getAppInfoFromSteam(appid):
    """
        Functie om het level van een speler op te halen
        Args:
            steamId:   steamId van de gebruiker waarvan je het level wil ophalen
        Returns:
                level - level van de speler
    """
    try:
        appData = requests.get(
            f"https://store.steampowered.com/api/appdetails?appids={appid}").json()
        
        return appData[str(appid)]["data"]
    except:
        print("Error")
        raise HTTPException(status_code=500, detail="Er ging iets fout bij het ophalen van de app informatie")


getAppInfoFromSteam(4000)