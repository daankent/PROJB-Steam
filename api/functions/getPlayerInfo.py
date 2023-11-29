import requests
from api.constants import STEAM_API_KEY
from fastapi import HTTPException


def getPlayerInfo(steamIds):
    """
        Functie om info van een steam gebruiker op te halen van de steam api.
        Args:
            steamIds:   Een lijst met steamIds waarvan de informatie moet worden opgevraagd. (of een enkele int met 1 steamId)
        Returns:
                list - Lijst met de info van de ingevoerde steamIds alleen als er info bij dat id gevonden is
                -1 -  als niet alle steamIds een int zijn
                -2 - geen ids ingevoerd

    """
    # check of er minimaal 1 steamId is ingevoerd
    if not len(steamIds) > 0:
        return -2

    # https://stackoverflow.com/questions/13252333/check-if-all-elements-of-a-list-are-of-the-same-type

    if all(isinstance(x, int) for x in steamIds):
        try:
            playerInfoData = requests.get(
                f"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={STEAM_API_KEY}&steamids={steamIds}")
            playerInfo = playerInfoData.json()["response"]["players"]
            return playerInfo
        except:
            print("Error")
            raise HTTPException(status_code=500, detail="Er ging iets fout bij het ophalen van de playerInfo")
    else:
        # Er is iets mis met de ingevoerde steam ids
        return -1


print(getPlayerInfo([76561198856529269, 76561199118065040]))
