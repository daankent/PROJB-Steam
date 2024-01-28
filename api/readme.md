# API

Een restapi die dient als koppeling tussen het steamhub dashboard en de verschillende databronnen (database, json file, steam web api en de hardware)

## Installatie

Voer de commands hieronder uit om de benodigde module te installeren

```
pip install fastapi requests psycopg2
pip install "uvicorn[standard]"
```

## Uitvoeren

Om de api te kunnen gebruiken moet deze gestart worden.
Dit doer je door het volgende commando uit te voeren:
```uvicorn main:app --reload```
De api zal dan starten. De --reload zorgt ervoor dat de api opnieuw gestart wordt wanneer er wijzigingen zijn
aangebracht.

