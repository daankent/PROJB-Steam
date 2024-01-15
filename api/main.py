from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import getPlayerInfo
import getPlayerOwnedGames
import getPlayerFriendList
import getPlayerLastPlayed
import sortOwnedGames
import getGameFromJson
import getPlayerLevel
import getAppInfoFromSteam
import createSpeelmoment
import createSpeelmomentUitnodiging as csu
import getSpeelmomenten
import getGenreStats
import getPricePlaytimeStats
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


@app.get("/playerInfoExtended/")
def playerInfoExtended(id):
    data = getPlayerInfo.getPlayerInfo([id])
    data[0]["level"] = getPlayerLevel.getPlayerLevel(id)
    
    data[0]["lastPlayed"] = getPlayerLastPlayed.getPlayerLastPlayedGames(id)[0]
    games = getPlayerOwnedGames.getPlayerOwnedGames(id)
    data[0]["games"] = sortOwnedGames.desc(games["response"]["games"], "playtime_forever")
    friends = getPlayerFriendList.getPlayerFriendList(id)
    data[0]["friends"] = friends
    return data


@app.get("/gameInfoExtended/")
def playerInfoExtended(id):
    data = getGameFromJson.getGameFromJson(id)
    if data == -1:
        print("Niet in Json")
        data = getAppInfoFromSteam.getAppInfoFromSteam(id)
        print(data)
        return {
                "appid": id,
                "name": data["name"],
                "release_date": data["release_date"]["date"],
                "categories": [cat["description"] for cat in data["categories"]],
                
                "platforms": [platform for platform in data["platforms"]],
                "developer": data["developers"][0],
                "prijs": data["price_overview"]["final_formatted"].strip("€") if "price_overview" in data else "0,-",
                "genres": [genre["description"] for genre in data["genres"]],
                "ratings": {
                    "known": False
                },
                "owners": {
                    "known": False
                }
                }
    
    categories = data['categories'].split(";")
    platforms = data["platforms"].split( ";")
    genres = data["genres"].split( ";")
    return {
                "appid": id,
                "name": data["name"],
                "release_date": data["release_date"],
                "categories": categories,
                "platforms": platforms,
                "developer": data["developer"],
                "prijs": data["price"],
                "genres": genres,
                "ratings": {"known": True, "negative":data["negative_ratings"],"positive": data["positive_ratings"]},
                "owners": {
                    "known": True,
                    "min": data["owners"].split("-")[0],
                    "max": data["owners"].split("-")[1],
                    "minmax": data["owners"]
                }
            }


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
    elif sort == "playtime-desc":
        cache[cache_key] = sortOwnedGames.desc(data["response"]["games"], "playtime_forever")
        return cache[cache_key]
    else:
        cache[cache_key] = data["response"]["games"]
        return data["response"]["games"]


@app.get("/playerFriends/")
def playerFriends(id):
    data = getPlayerFriendList.getPlayerFriendList(id)
    return data


@app.get("/playerFriendsExtended")
def playerFriends(id):
    data = getPlayerFriendList.getPlayerFriendList(id)

    for index, friend in enumerate(data):
        cache_key = f"playerFriends-lastgame-{friend['steamid']}"
        if cache_key in cache:
            data[index]["lastPlayed"] = cache[cache_key]
        else:
            lastGame = getPlayerLastPlayed.getPlayerLastPlayedGames(friend["steamid"])[0]
            cache[cache_key] = lastGame
            data[index]["lastPlayed"] = lastGame
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

@app.get("/createSpeelmoment")
async def createspeelmoment(creator,datum,starttijd, eindtijd, game_name, game_id, creator_name):
    return createSpeelmoment.create(creator, True,datum, starttijd, eindtijd, game_name, game_id, creator_name)

@app.get("/uitnodiging")
async def createuitnodiging(speelmoment, player, player_name):
    return csu.create(speelmoment,player,player_name)

@app.get("/uitnodiging-answer")
async def answeruitnodiging(id, answer):
    return csu.answer(id, answer)

@app.get("/speelmomenten")
async def speelmomenten(id):
    return {
        "public": getSpeelmomenten.getPublicSpeelmomenten(),
        "private": getSpeelmomenten.getPlayerSpeelmomenten(id)
    }
    
@app.get("/speelmoment")
async def speelmomenten(id):
    return getSpeelmomenten.getSingle(id)


@app.get("/genrestats")
async def genrestats():
    return getGenreStats.getGenreStats()

@app.get("/priceplaytimestats")
async def priceplaytimestats():
    return getPricePlaytimeStats.getPricePlaytimeStats()
@app.get("/cache")
def getCache():
    return cache
