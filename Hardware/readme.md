# Steamhub hardware

## Neopixel
Ook onze hardware maakt verbinding met de api. Zo vraagt de hardware op hoeveel vrienden er online zijn om dit weer te kunnen geven op een neopixel. De firmware van de hardware stuurt een verzoek naar de server en de server stuurt een lijst met vrienden en hun statussen terug. De hardware kijk hoeveel vrienden er online zijn en laat op basis daarvan een aantal leds op de neopixel branden.

## Matrix Keypad
Wij hebben ook een 4x4 keypad gebruikt die websites opent. Als je op een toets klikt opent het een bepaalde website zoals ‘Steamhub.nl’. Dit staat los van de api, en komt verder in niet aanraking met het dashboard.

## Afstand Sensor
De afstand sensor gebruiken wij om te zien of iemand online is. Deze kijkt of er iemand dichtbij is, hij geeft een output naar de api die je dan op online zet bij steamhub.nl.
