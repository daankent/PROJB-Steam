from fastapi import FastAPI
import getPlayerInfo
import getPlayerOwnedGames

app = FastAPI()


@app.get("/")
def get_slash():
    return "Hello world"


@app.get("/playerInfo/")
def playerInfo(ids):
    data = getPlayerInfo.getPlayerInfo(ids)
    return data


@app.get("/playerOwnedGames/")
def playerOwnedGames(id):
    data = getPlayerOwnedGames.getPlaterOwnedGames(id)
    return data
