from fastapi import FastAPI
import getPlayerInfo
import json

app = FastAPI()


@app.get("/")
def get_slash():
    return "Hello world"


@app.get("/playerInfo/")
def playerInfo(ids):
    data = getPlayerInfo.getPlayerInfo(json.loads(ids))
    return data
