from fastapi import FastAPI
import getPlayerInfo

app = FastAPI()


@app.get("/")
def get_slash():
    return "Hello world"


@app.get("/playerInfo/")
def playerInfo(ids):
    data = getPlayerInfo.getPlayerInfo(ids)
    return data
