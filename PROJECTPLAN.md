# Prosjektplan

Dette er vår foreløpige plan for prosjekt 4. Beskrivelsen er lagt ut som svar på deloppgave "4.1 Evaluering av arkitektur"


## Beskrivelse av applikasjonen
Vi har planlagt å lage en applikasjon som viser oversikt over røde og hvite viner fra vinmonopolet. Det skal være mulig for en bruker å legge til viner som favoritter og se en oversikt over favorittvinene sine.

Vår mer fancy datavisning skal gå ut på at man kan trykke på verdensdel og så videre inn på land fra ett kart. En liste vil filtrere ut og vise frem viner fra kartets valgte område.

Vinene skal kunne sorteres og filtreres på flere forskjellige måter. Foreløpig:

### Sortering:
- Pris (høy-lav / lav-høy)
- Alfabetisk (A-Å / Å-A)

### Filtrering:
- Type vin (Hvit/Rød)
- Land

### Søk:
Vi har ett søkefeltet i fritekst som søker i varenavn


## Beskrivelse av data
Vår data vil være rød og hvite viner, med deres tilhørende attributter.
ID, Varenummer, Varenavn, Volum, Pris, Literpris, Varetype, Farge, Lukt, Smak, Land, Distrikt, Underdistrikt, Årgang, Alkohol, Produsent, Korktype, Vareurl

Vi vil også lagre data om brukere.
De vil ha en ID, brukernavn og passord (som hashes og saltes).
Det er også planlagt at en brukers data skal inneholde viner markert som favoritter, siste viner man har sett på og muligens søkehistorikk.


## Beskrivelse av database
Databasen vi har valgt å bruke er en standard MongoDB database. Det er klassifisert som et NoSQL databaseprogram og er bygget opp med JSON-filer. Den er forskjellig fra en standard SQL database, spesielt i konseptnavn.

| MySQL  | MongoDB |
| ------------- | ------------- |
| Table  | Collection  |
| Row  | Document  |
| Column  | Field  |
| Joins | Embedded documents  |


## Beskrivelse av moduler og komponenter


### Moduler
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatDialogModule, MatTabsModule } from '@angular/material';
```

Dette er modulene vi foreløpig har/har planlagt å ta i bruk. Kort beskrivelse av modulene som ikke er standard i AngularCLI:
- RouterModule: Tillater routing
- HttpModule: Tillater HTTP request og responses
- FormsModule: Module for input handling
- BrowserAnimationsModule: Dependency for Angular Material
- Mat***Module(s): Moduler for å ta i bruk Angular Material komponenter/design.

### Komponenter
```
import { AppComponent } from './app.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WineSearchComponent } from './wine-search/wine-search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
```

Dette er komponentene vi foreløpig har implementert. Planen videre er å lage komponenter for:
- Brukerprofil
- Favoritter
- Logg/historikk


## Beskrivelse av "services"
En service er en funksjon eller object som er tilgjengelig for hele applikasjonen vår, men ikke utenfor.
### Services
```
import { UserService} from './services/users.service';
import { DataService } from './data.service';
import { AuthGuard } from './auth-guard.service';
```

Beskrivelse av våre services:
- UserService: Brukerbehandling på frontend
- DataService: Uthenting av vin fra databasen
- AuthGuard: Henter bruker fra server, legger lokalt og holder orden på om man er logget inn eller ikke

Det er nok veldig sannsynlig at vi lager flere services for mer ryddighet og bedre uthenting og behandling av forskjellig data.

## Overordnet arkitektur til systemet
Vi har som mange andre grupper valgt å bruke "MEAN Stack" [wikipedia](https://en.wikipedia.org/wiki/MEAN_(software_bundle)).

Denne "stakken" består av MongoDB, Express.js, Angular og Node.js. Dataflyten og bruken av disse "lagene" er illustrert i bildet under.

![MEAN stack data flow graphic](https://cdn-images-1.medium.com/max/1024/0*Nq9iCe61Aq5IxUGl.png)


## Medvirkende

* **Christian Nyvoll** - *Oppsett, struktur og tekst* - [Chr1stian](https://github.com/Chr1stian/)
* **Øystein Hammersland** - *Utfyllende tekst og illustrasjoner* - [oystpoyst](https://github.com/oystpoyst)

Resten av gruppen har bidratt med tekst, informasjon og beskrivelser. Se alle deltakere under [contributors](https://github.com/IT2810/it2810-webutvikling-h17-prosjekt-4-group-37/contributors)
