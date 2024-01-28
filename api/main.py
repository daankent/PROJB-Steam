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
import zoek_algoritme
import statistiek_algoritme as sa

# de fastapi initialiseren
app = FastAPI()

# CORS configureren
origins = [

    "http://localhost:3000",
    "https://steamhub.online",
    "https://steamhub.nl",
    "http://steamhub.online",
    "http://steamhub.nl",
    
    

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# het cache object aanmaken
cache = {}


# Test endpoint
@app.get("/")
def get_slash():
    return "Hello world"

#  Endpoint om info over een speler op te vragen
@app.get("/playerInfo/")
def playerInfo(ids):
    data = getPlayerInfo.getPlayerInfo(ids)
    return data

#  Endpoint om uitgebreide info over een speler op te vragen
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

#  Endpoint om info over een game op te vragen
@app.get("/gameInfoExtended/")
def playerInfoExtended(id):
    data = getGameFromJson.getGameFromJson(id)
    if data == -1:
        data = getAppInfoFromSteam.getAppInfoFromSteam(id)
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
    platforms = data["platforms"].split(";")
    genres = data["genres"].split(";")
    return {
        "appid": id,
        "name": data["name"],
        "release_date": data["release_date"],
        "categories": categories,
        "platforms": platforms,
        "developer": data["developer"],
        "prijs": data["price"],
        "genres": genres,
        "ratings": {"known": True, "negative": data["negative_ratings"], "positive": data["positive_ratings"]},
        "owners": {
            "known": True,
            "min": data["owners"].split("-")[0],
            "max": data["owners"].split("-")[1],
            "minmax": data["owners"]
        }
    }

#  Endpoint om lijst met games die een gebruiker bezit op te vragen
@app.get("/playerOwnedGames/{sort}")
def playerOwnedGames(id, sort):
    cache_key = f'playerOwnedGames-{sort}-{id}'
    if cache_key in cache:
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


#  Endpoint om vrienden van een speler op te vragen
@app.get("/playerFriends/")
def playerFriends(id):
    data = getPlayerFriendList.getPlayerFriendList(id)
    return data

#  Endpoint om uitgebreide info over vrienden van een speler op te vragen
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

# Endpoint om de laatst gepspeelde games op te vragen van een steam gebruiker
@app.get("/playerLastPlayedGames/")
def playerLastPlayedGames(id):
    data = getPlayerLastPlayed.getPlayerLastPlayedGames(id)
    return data

# Endpoint om de laatst gepspeelde game op te vragen van een steam gebruiker
@app.get("/playerLastPlayedGame/")
def playerLastPlayedGames(id):
    data = getPlayerLastPlayed.getPlayerLastPlayedGames(id)[0]
    return data

# Endpoint om lijst met alle games van vrienden op te vragen van een bepaalde gebruiker
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

# Endpoint om een speelmoment aan te maken
@app.get("/createSpeelmoment")
async def createspeelmoment(creator, datum, starttijd, eindtijd, game_name, game_id, creator_name):
    return createSpeelmoment.create(creator, True, datum, starttijd, eindtijd, game_name, game_id, creator_name)

# Endpoint om een uitnodiging aan te maken
@app.get("/uitnodiging")
async def createuitnodiging(speelmoment, player, player_name):
    return csu.create(speelmoment, player, player_name)

# Endpoint om een uitnodiging te beantwoorden
@app.get("/uitnodiging-answer")
async def answeruitnodiging(id, answer):
    return csu.answer(id, answer)

# Endpoint om alle speelmomenten van een speler op te vragen
@app.get("/speelmomenten")
async def speelmomenten(id):
    return {
        "public": getSpeelmomenten.getPublicSpeelmomenten(),
        "private": getSpeelmomenten.getPlayerSpeelmomenten(id)
    }

# Endpoint om een specifiek speelmoment op te vragen
@app.get("/speelmoment")
async def speelmomenten(id):
    return getSpeelmomenten.getSingle(id)

# Endpoint om de genre statistieken op te vragen
@app.get("/genrestats")
async def genrestats():
    return getGenreStats.getGenreStats()

# Endpoint om de prijs-speeltijd statistieken op te vragen
@app.get("/priceplaytimestats")
async def priceplaytimestats():
    return getPricePlaytimeStats.getPricePlaytimeStats()

# Endpoint om de statistieken van een developer op te vragen
@app.get("/devstats")
async def devStats(dev):
    kwal_var = sa.kwalitatieve_variabele(dev, "genres")
    kwal = []
    for i in  kwal_var.items():
        kwal.append({"genre": i[0], "aantal": i[1]})
    # sorteer de genres op basis van meeste aantal naar minste aantal
    kwal_sorted = sortOwnedGames.desc(kwal, "aantal")
    return {
        "kwal": kwal_sorted,
        "kwan": sa.kwantitatieve_variabele(dev, "price"),
        "gd": sa.gradient_descent_for_developer(dev, 1000)
    }

# Endpoint voor het zoeken in het json bestand
@app.get("/zoeken")
async def genrestats(filter, zoekterm):
    return zoek_algoritme.zoek_spel(filter,zoekterm)

# Endpoint om de hardware te testen
@app.get("/hardware/echo")
async def hardwareecho(id, online):
    return f"Hallo {id}"

# Endpoint om te zien wat er allemaal in de cache zit
@app.get("/cache")
def getCache():
    return cache
