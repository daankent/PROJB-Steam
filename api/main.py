from fastapi import FastAPI
import getPlayerInfo
import getPlayerOwnedGames
import getPlayerFriendList

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


@app.get("/playerFriends/")
def playerFriends(id):
    data = getPlayerFriendList.getPlayerFriendList(id)
    return data
