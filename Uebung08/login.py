import uvicorn
import databases
import sqlalchemy
from fastapi import FastAPI, Depends, status, Form, Request
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from fastapi.templating import Jinja2Templates

space = [""]
app = FastAPI()
templates = Jinja2Templates(directory="templates/")

database = databases.Database('sqlite:///datenbank.db')

manager = LoginManager("aadsfashlfkshdflkaeuowuqprvbpiwe", token_url="/auth/login", use_cookie=True)
manager.cookie_name = "ch.fhnw.testapp" # Darf nur einmal vergeben werden wenn man das Programm online stellt

engine = sqlalchemy.create_engine('sqlite:///datenbank.db',
            connect_args={"check_same_thread": False})

metadata = sqlalchemy.MetaData() # Metadaten laden

notes = sqlalchemy.Table( # Daten eintragen in der Datenbank
    "notes", metadata, 
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key = True),
    sqlalchemy.Column("user", sqlalchemy.String),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("text", sqlalchemy.String)
)

metadata.create_all(engine)

DB = {"user1":{ "name":"Hans Muster", 
                "email":"hansmuster@gmail.com", 
                "passwort":"12345", 
                "username":"Hans"}, 
      "user2": {"name":"Alexandra Meier", 
                "email": "alexandra.meier@gmx.net", 
                "passwort":"thatsmypassword", 
                "username": "Alexandra"}}



@manager.user_loader()
def load_user(username: str):
    user = DB.get(username)
    return user

@app.post("/auth/login")
def login(data: OAuth2PasswordRequestForm = Depends()):
    username = data.username
    password = data.password
    user = load_user(username)

    if not user:
        raise InvalidCredentialsException
    if user["passwort"] != password:
        raise InvalidCredentialsException

    access_token = manager.create_access_token(
        data = {"sub": username}
    ) 

    resp = RedirectResponse(url = "/new", status_code=status.HTTP_302_FOUND)
    manager.set_cookie(resp, access_token)

    return resp

# -------- LOGIN --------------------------------------------------------------------------
@app.get("/login")
def login():
    file = open("templates/login.html", encoding="utf-8")
    data = file.read()
    file.close()
    return HTMLResponse(content=data)

# -------- Text Nachricht --------------------------------------------------------------------------

@app.get("/new")
async def create_note(request: Request, user=Depends(manager)):
    return templates.TemplateResponse("new.html",context={"request": request})

@app.post("/new")
async def post_note(request: Request, titel=Form(), text=Form(), user = Depends(manager)):
    query = notes.insert().values(title=titel, text=text, user = user["username"])
    myid = await database.execute(query)
    return templates.TemplateResponse('new.html', context={'request': request})
    
@app.get("/notes")
async def read_notes():
    query = notes.select()
    return await database.fetch_all(query)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get(f"""/users/Hans""" )
async def read_notes():
    query = notes.select().where(notes.c.user== "user1")
    return await database.fetch_all(query)
@app.get(f"""/users/Alexandra""" )
async def read_notes():
    query = notes.select().where(notes.c.user== "user2")
    return await database.fetch_all(query)


uvicorn.run(app, host="127.0.0.1", port=8000)




