import json

# Laat het de gemiddele waarde en de mediaan over alle spellen van geselecteerde developer zien
def kwantitatieve_variabele(developer, filter, json_bestand='steam.json'):
    # Opent het bestand om de benodigde data op te halen
    with open(json_bestand, 'r') as f:
        data = json.load(f)

    # Maakt een lege lijst om de data op te slaan
    speeltijden = []

    # Doorloopt alle spellen en verzamel de gewenste statistische gegevens
    for spel in data: 
        spel_developer = spel["developer"].lower()
        spel_publisher = spel["publisher"].lower()
        
        # Vergelijkt met de ingevoerde developer
        if developer.lower() in spel_developer or developer.lower() in spel_publisher:
            stats = spel[filter]
            speeltijden.append(stats)

    # Controleert of er spellen zijn gevonden
    if not speeltijden:
        return "Geen spellen gevonden."

    # Slaat de lengte van de lijst op en sorteert de lijst
    n = len(speeltijden)
    speeltijden.sort()

    # Berekent de mediaan
    if n % 2 == 0:
        midden_1 = speeltijden[n // 2 - 1]
        midden_2 = speeltijden[n // 2]
        mediaan = (midden_1 + midden_2) / 2
    else:
        mediaan = speeltijden[n // 2]

    # Berekent het gemiddelde
    gem = sum(speeltijden) / n
    
    gem_afgerond = round(gem, 2)
    mediaan_afgerond = round(mediaan, 2)

    # Geeft de resultaten terug als een dictionary
    resultaten = {
        "gemiddelde": gem_afgerond,
        "mediaan": mediaan_afgerond
    }
    
    return resultaten

# Laat alle genres van spellen zien van gekozen developer/publisher
def kwalitatieve_variabele(developer, key, json_bestand='steam.json'):
    # Opent het bestand om de benodigde data op te halen
    with open(json_bestand, 'r') as f:
        data = json.load(f)
    
    # Maakt een lege dictionairy om de data op te slaan
    genre_aantal = {}

    # Doorloopt alle spellen en verzamel de gewenste statistische gegevens
    for spel in data:
        spel_developer = spel["developer"].lower()
        spel_publisher = spel["publisher"].lower()

        # Vergelijkt met de ingevoerde developer, voegt genre toe als deze nog niet in de dictionairy staat en telt er een bij op als deze er al wel in staat
        if developer.lower() in spel_developer or developer.lower() in spel_publisher:
            if key in spel:
                genres = spel[key].split(';')
                for genre in genres:
                    if genre in genre_aantal:
                        genre_aantal[genre] += 1
                    else:
                        genre_aantal[genre] = 1

    return genre_aantal

def gradient_descent_for_developer(developer, num_iterations, learning_rate=0.00000000001, json_bestand='steam.json'):
    # Opent het bestand om de benodigde data op te halen
    with open(json_bestand) as f:
        data = json.load(f)

    # Filteren op de gewenste developer
    for spel in data:
        spel_developer = spel["developer"].lower()
        spel_publisher = spel["publisher"].lower()
        if developer.lower() in spel_developer or developer.lower() in spel_publisher:

            # Voegt benodigde gevens uit json-bestand toe aan een nieuwe lege lijst
            x = []
            y = []
            x.append(spel['average_playtime'])
            y.append(spel['positive_ratings'])

            # Initialiseert a en b met 0
            a, b = 0, 0

            # Itereert num_iterations keer
            for iteration in range(num_iterations):
                # Voor elke observatie (xk, yk)
                for i in range(len(x)):
                    xk, yk = x[i], y[i]

                    # Berekent de error
                    error = (a + b * xk) - yk

                    # Update a en b
                    a = a - error * learning_rate
                    b = b - xk * error * learning_rate

    # Retourneer de bijgewerkte waarden van a en b
    return [a, b]



# Vraagt gebruiker om input voor developer en filter
developer_input = input('Vul gewenste developer of publisher in: ')
filter_input = input('Vul gewenst filter in: ').lower()

# Roept de functie aan met de opgegeven input en print de resultaten
print(kwantitatieve_variabele(developer_input, filter_input))
print(kwalitatieve_variabele(developer_input, key='genres'))

# Geeft de data weer uit het gradient_descent algoritme en kies tbenodigd aantal iterations
iterations = 1000
developer_result = gradient_descent_for_developer(developer_input, iterations)
print(f"Na {iterations} keer doorlopen, a = {developer_result[0]} en b = {developer_result[1]}")