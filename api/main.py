from fastapi import FastAPI
import getPlayerInfo
import getPlayerOwnedGames
import getPlayerFriendList
import getPlayerLastPlayed
import sortOwnedGames
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = [

  "http://localhost:3000"
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cache = {}

@app.get("/")
def get_slash():
    return "Hello world"


@app.get("/playerInfo/")
def playerInfo(ids):
    data = getPlayerInfo.getPlayerInfo(ids)
    return data


@app.get("/playerOwnedGames/{sort}")
def playerOwnedGames(id, sort):
    cache_key = f'playerOwnedGames-{sort}-{id}'
    print(cache_key)
    if cache_key in cache:
        print("CACHEEEEEE")
        return cache[cache_key]
    else:
        data = getPlayerOwnedGames.getPlayerOwnedGames(id)
        
    if sort == "az":
        cache[cache_key] = sortOwnedGames.asc(data["response"]["games"], "name")
        return cache[cache_key] 
    elif sort == "za":
        cache[cache_key] = sortOwnedGames.desc(data["response"]["games"], "name")
        return cache[cache_key] 
    elif sort == "playtime-asc":
        cache[cache_key] = sortOwnedGames.asc(data["response"]["games"], "playtime_forever")
        return cache[cache_key] 
    elif sort =="playtime-desc":
        cache[cache_key] = sortOwnedGames.desc(data["response"]["games"], "playtime_forever")
        return cache[cache_key] 
    else:
        cache[cache_key] = data["response"]["games"]
        return data["response"]["games"]


@app.get("/playerFriends/")
def playerFriends(id):
    data = getPlayerFriendList.getPlayerFriendList(id)
    return data


@app.get("/playerLastPlayedGames/")
def playerLastPlayedGames(id):
    data = getPlayerLastPlayed.getPlayerLastPlayedGames(id)
    return data


@app.get("/playerLastPlayedGame/")
def playerLastPlayedGames(id):
    data = getPlayerLastPlayed.getPlayerLastPlayedGames(id)[0]
    return data

@app.get("/playerFriendsOwnedGames/{sort}")
def platerFriendsOwnedGames(id, sort):
  
    cache_key_sort = f'playerFriendsGames-{sort}-{id}'
    if cache_key_sort in cache:
        return cache[cache_key_sort]
    friends = getPlayerFriendList.getPlayerFriendList(id)
    games = []
    for friend in friends:
        cache_key = f'playerGames-{id}'
        if cache_key in cache:
            games.extend(cache[cache_key])
        else:
            data = getPlayerOwnedGames.getPlayerOwnedGames(friend["steamid"])
            games.extend(data["response"]["games"])
    
    if sort == "az":
        cache[cache_key_sort] = sortOwnedGames.asc(games, "name")
        return cache[cache_key_sort] 
    elif sort == "za":
        cache[cache_key_sort] = sortOwnedGames.desc(games, "name")
        return cache[cache_key_sort] 
    elif sort == "playtime-asc":
        cache[cache_key_sort] = sortOwnedGames.asc(games, "playtime_forever")
        return cache[cache_key_sort] 
    elif sort == "playtime-desc":
        cache[cache_key_sort] = sortOwnedGames.desc(games, "playtime_forever")
        return cache[cache_key_sort] 
    else:
        cache[cache_key] = data
        return games


@app.get("/cache")
def getCache():
    return cache