from fastapi import FastAPI, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from util import answerMe

app = FastAPI()

# Mount the static files directory
app.mount("/static", StaticFiles(directory="E:\BACKUP\C_drive\PycharmProjects\QA_system_GPT_API\static"))

# Load HTML templates
templates = Jinja2Templates(directory=r"E:\BACKUP\C_drive\PycharmProjects\QA_system_GPT_API\templates")

@app.get("/Hello_baby")
async def myfirstgetAPI():
    return {"message" : "This is my first time baby"}

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/ask")
async def ask_question(request: Request, question: str = Form(...)):
    # Call the answerMe function from util.py to get the response
    response = answerMe(question)
    # return templates.TemplateResponse("index.html", {"request": request, "response": answer})
    return templates.TemplateResponse("index.html", {"request": request, "response": response})








# from fastapi import FastAPI, Request, Form
# from fastapi.templating import Jinja2Templates
# from backend.util import answerMe

# app = FastAPI()

# # Load HTML templates
# templates = Jinja2Templates(directory=".")

# @app.get("/")
# async def read_root(request: Request):
#     return templates.TemplateResponse("index.html", {"request": request})

# @app.post("/ask")
# async def ask_question(request: Request, question: str = Form(...)):
#     # Call the answerMe function from util.py to get the response
#     response = answerMe(question)
#     return templates.TemplateResponse("index.html", {"request": request, "response": response})
