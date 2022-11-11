import uvicorn
from fastapi import FastAPI

app = FastAPI()

d = {}
file = open('PLZO_CSV_LV95.csv', encoding="utf-8")
next(file)
for line in file:
    daten = line.strip().split(";")
    ortschaft = daten[0]
    plz = daten[1]  # ZIP für PLZ 
    zusatzziffer = daten[2]
    gemeinde = daten[3]
    bfsnr = daten[4]
    kanton = daten[5]
    easting = daten[6]
    northing = daten[7]
    language = daten[8]

    d[gemeinde] = {
            "Gemeinde": gemeinde,
            "Ort": ortschaft,
            "PLZ": plz,
            "Kanton": kanton,
            "Zusatzziffer": zusatzziffer,
            "BFS-Nr": bfsnr,
            "Ost-Wert": easting,
            "Nord-Wert": northing,
            "Sprache": language}

file.close()

@app.get("/gemeinde")
async def gemeinde(gemeinde: str):
    if gemeinde in d:
        return d[gemeinde]
    else:
        return {"error": "not found"}

uvicorn.run(app, host="127.0.0.1", port = 8000)