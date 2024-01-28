import json

def verkrijg_beschikbare_filters(json_bestand='steam.json'):
    # Deze functie haalt alle mogelijke filters (sleutels) uit het JSON-bestand.
    with open(json_bestand, 'r') as f:
        gegevens = json.load(f)

    # Maakt een lege lijst om de filters op te slaan.
    beschikbare_filters = []

    # Loopt door elk spel en voeg de filters toe aan de lijst.
    for spel in gegevens:
        for filter in spel.keys():
            if filter not in beschikbare_filters:
                beschikbare_filters.append(filter)

    # Retourneert de lijst met beschikbare filters.
    return beschikbare_filters

def zoek_spel(zoek_filter, zoek_waarde, json_bestand='steam.json'):
    # Deze functie zoekt naar spellen op basis van een opgegeven filter en waarde.
    with open(json_bestand, 'r') as f:
        gegevens = json.load(f)

    # Maakt een lege lijst om de gevonden spellen op te slaan.
    gevonden_spellen = []

    # Loopt door elk spel en controleert of het opgegeven filter overeenkomt met de opgegeven waarde.
    for spel in gegevens:
        if zoek_filter in spel and str(zoek_waarde).lower() in str(spel[zoek_filter]).lower():
            gevonden_spellen.append(spel)

    # Retourneer de lijst met gevonden spellen.
    return gevonden_spellen
