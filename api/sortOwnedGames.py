def asc(games, key):
    """
        Functie om de games van een speler te sorteren op basis van een key van hoog naar laag

        Args:
            games:   de list met dictionaries van games die een playtime_forever key bevatten
            key: de key in de dictonary waarop gesorteerd moet worden
        Returns:
                list - gesorteerde lijst
    """
    lst_sorted = games.copy()
    lengte = len(games)
    for ronde in range(lengte - 1):
        verwisseling = False
        for i in range(lengte - 1 - ronde):
            if lst_sorted[i][str(key)] > lst_sorted[i + 1][str(key)]:
                lst_sorted[i], lst_sorted[i + 1] = lst_sorted[i + 1], lst_sorted[i]
                verwisseling = True
        if not verwisseling:
            break
    return lst_sorted

def desc(games, key):
    """
        Functie om de games van een speler te sorteren op basis van een key van hoog naar laag
        Args:
            games:   de list met dictionaries van games die een playtime_forever key bevatten
            key: de key in de dictonary waarop gesorteerd moet worden
            
        Returns:
                list - gesorteerde lijst
    """
    sorted = asc(games, key)
    sorted.reverse()
    return  sorted


