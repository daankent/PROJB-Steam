import requests
import constants
from fastapi import HTTPException
import json


def getPlayerInfo(ids):
    """
        Functie om info van een steam gebruiker op te halen van de steam api.
        Args:
            ids:   Een lijst met steamIds waarvan de informatie moet worden opgevraagd.
        Returns:
                list - Lijst met de info van de ingevoerde steamIds alleen als er info bij dat id gevonden is
    """
    # als ids niet leeg is ids naar json omzetten, anders een http error geven
    if ids:

        if not isinstance(ids, list):
            steamIds = json.loads(ids)
        else:
            steamIds = ids
    else:
        raise HTTPException(status_code=500,
                            detail="Voeg ids toe aan je aanvraag")
    # checken of steamIds een list is
    if not isinstance(steamIds, list):
        raise HTTPException(status_code=500,
                            detail="Je moet een lijst met ids invoeren, ookal wil je maar 1 id gebruiken")
    # check of er minimaal 1 steamId is ingevoerd
    if not len(steamIds) > 0:
        raise HTTPException(status_code=500,
                            detail="Voeg ids toe aan je aanvraag")

    # https://stackoverflow.com/questions/13252333/check-if-all-elements-of-a-list-are-of-the-same-type
    # checken of de inhoud van steamIds wel allemaal int's of strings zijn
    if all(isinstance(x, (int, str)) for x in steamIds):
        try:
            # speler info opvragen
            playerInfoData = requests.get(
                f"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={constants.STEAM_API_KEY}&steamids={steamIds}")
            playerInfo = playerInfoData.json()["response"]["players"]
            return playerInfo
        except:
            raise HTTPException(status_code=500, detail="Er ging iets fout bij het ophalen van de playerInfo")
    else:
        # Er is iets mis met de ingevoerde steam ids
        raise HTTPException(status_code=500, detail="Er is iets mis met de ids input")
