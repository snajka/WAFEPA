## WAFEPA

### Web Application For Evidenting Physical Activities

Activity sadrži polja:
* id
* name

User sadrži polja:
* id
* first name
* last name
* email
* password

Address sadrži polja:
* id
* street
* number

Aplikacija ima sledeće funkcionalnosti:

* Omogućene CRUD operacije za aktivnosti i korisnike
* Omogućeno pretraživanje aktivnosti po nazivu 
* Omogućeno pretraživanje korisnika po imenu ili prezimenu (dakle ukoliko je upit pretrage "pet", pronalazi korisnika koji se zove npr. "Petar", ali i korisnika koji se preziva npr. "Petrović")
* Omogućeno sortiranje aktivnosti prosleđivanjem parametara direction (ASC ili DESC) i property (jedno od polja entiteta Activity)
* Omogućeno sortiranje korisnika prosleđivanjem parametara direction (ASC ili DESC) i property (jedno od polja entiteta User)
* Omogućeno prikazivanje korisnika i aktivnosti po 5 na strani
