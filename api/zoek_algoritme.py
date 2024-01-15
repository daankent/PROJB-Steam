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

# Verkrijgt beschikbare filters en toont ze.
beschikbare_filters = verkrijg_beschikbare_filters()
print("Beschikbare filters:", beschikbare_filters)

# Vraagt de gebruiker om een filter en waarde in te voeren voor het zoeken.
zoek_filter_te_zoeken = input("Voer het filter in waarop je wilt zoeken: ")
zoek_waarde_te_zoeken = input(f"Voer de waarde in van het filter '{zoek_filter_te_zoeken}' waarop je wilt zoeken: ")

# Voert de zoekfunctie uit en toont de resultaten.
gevonden_spellen = zoek_spel(zoek_filter_te_zoeken, zoek_waarde_te_zoeken)

if not gevonden_spellen:
    print(f"Geen spellen gevonden met '{zoek_waarde_te_zoeken}' in het filter '{zoek_filter_te_zoeken}'.")
else:
    print("Gevonden spellen:")
    for spel in gevonden_spellen:
        print(f"""
        AppID: {spel['appid']}
        Naam: {spel['name']}
        Releasedatum: {spel['release_date']}
        Ontwikkelaar: {spel['developer']}
        Uitgever: {spel['publisher']}
        Genres: {spel['genres']}
        Prijs: {spel['price']}
        ---------------------------
        """)
