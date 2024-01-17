import requests
player_id = "76561198819434745"
playerinfo = requests.get(f'http://steamhub.online/playerInfoExtended?id={player_id}').json()

friends_states = []
for friend in playerinfo[0]["friends"]:
    friends_states.append(friend["personastate"])


print(friends_states)

def calcPercentageOnline():
    online = 0
    for i in friends_states:
        if i != 1:
            online += 1

    return (online/len(friends_states) )*100


print(calcPercentageOnline(), "%")