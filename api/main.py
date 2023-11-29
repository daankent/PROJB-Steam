from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def get_slash():
    return "Hello world!"
