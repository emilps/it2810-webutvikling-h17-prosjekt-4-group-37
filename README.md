# IT2810 Webutvikling Prosjekt 4 - Group 37
## Om prosjektet vårt
Dette er vårt repository for IT2810 Webtvikling prosjekt 4. Vi skal bruke Angular 4, og har valgt å bruke MEAN stakken med MongoDB, Express.js, Angular og Node.js

**Se [Prosjektkrav](#prosjektkrav) for hvordan vi har svart på oppgavekravene**

## Dokumentasjon
* [Kom i gang](#kom-i-gang)
* [Kjør prosjekt på egen maskin](#kjør-prosjektet-på-egen-maskin)
* [Prosjektplan](#prosjektplan)
* [Komponenter og rammeverk](#komponenter-og-rammeverk)
* [Prosjektkrav](#prosjektkrav)


## Kom i gang
Om du kun ønsker å se og teste funksjonalitet på siden vår, følg disse enkle stegene:
1. Vær på NTNU-nettverk (eller bruk VPN)
2. Besøk [IT2810 Grupppe 37 - Prosjekt 4](http://it2810-37.idi.ntnu.no:8084/)

## Kjør prosjektet på egen maskin
Prosjektet kan lastes ned og kjøres lokalt:

*(Må være på NTNU nettverk og ha `npm` installert)*

1. Clone repoet: `git clone https://github.com/IT2810/it2810-webutvikling-h17-prosjekt-4-group-37.git`
2. Naviger inn i prosjektmappen: `cd my-app`
3. Installer nødvendige moduler: `npm install`
4. Start angular og node: `npm start`
5. Åpne ny terminal/kommandovindu på samme lokasjon. Start server: `npm run server`
6. Naviger til `localhost:4200` i nettleseren din

[//]: # "Eventuel beskrivelse av hvordan man kan kjøre tester"

## Prosjektplan
En underoppgave til prosjekt 4 var å lage en plan for prosjektet. Vår plan og svar til oppgaven `4.1: Evaluering av arkitektur` finnes i [PROJECTPLAN.md](PROJECTPLAN.md)

## Komponenter og rammeverk
Beskrivelse og innføring i de største og viktigste komponenter og rammeverk vi har tatt i bruk.

### Angular Material
Angular Material er google's design components for Angular. Disse har vi benyttet i steden for de kjedelige standardelementene man får i HTML. Vi får da ett gjennomgående design på hele siden vår, med pene elementer. Noen av de viktigste modulene vi har brukt er f.eks:
* Material Card
* Material Table
* Material Expansion Panel
* Material Button
* Material Dialog
* Material Progress Spinner
* Material Tooltip

Full oversikt og dokumentasjon på Angular Material finnes [her.](https://material.angular.io/)

### Chart.js
https://valor-software.com/ng2-charts/

ng2-charts

![Image of our favourite chart](https://i.imgur.com/bwcZZH4.png)

### GeoChart
GeoChart er en type chart/diagram fra Google Charts. Den lar deg definere områder eller land på ett kart. Du kan tilegne landene egenskaper som folketall eller lignende. Vi har brukt GeoChart for å først la brukeren velge ett kontinent, det zoomes så inn på kontinentet slik at man kan velge ett land. Hvert land har informasjon om antall viner som kommer fra det landet når du holder musepekeren over. Om du trykker på et land vil en liste laste inn viner fra det valge landet.

![Image of our GeoChart Map](https://i.imgur.com/sqDFyVd.png)

Google Charts skal kunne importeres som en Angular Component, men GeoChart fungerer per dags dato ikke. Vi synes kartet og funksjonaliteten var for bra til å ikke implementere. Dermed har vi lagt det til med Javascript.

---
Andre komponenter, moduler og services er godt dokumentert i koden.

## Prosjektkrav
Her følger en punktvis beskrivelse av hvordan vi har svart på kravene til prosjektet.

1. [På virtuell maskin, node.js og AngularCLI](#på-virtuell-maskin-node.js-og-angularcli)
2. [Backend database](#backend-database)
3. [Skriving, lesing og søk mot DB](#skriving-lesing-og-søk-mot-db)
4. [Listebasert visning med Expansion Panel](#listebasert-visning-med-expansion-panel)
5. [Listebasert sortering](#listebasert-sortering)
6. [Listebasert filtrering](#listebasert-filtrering)
7. [Listebasert dynamisk lasting av data](#listebasert-dynamisk-lasting-av-data)
8. [Min side funksjonalitet](#min-side-funksjonalitet)
9. [Sessionhåndtering](#sessionhåndtering)
10. [Fancy alternativ visning](#fancy-alternativ-visning)
11. [Testet kode](#testet-kode)
12. [Godt dokumentert](#godt-dokumentert)

### På virtuell maskin node.js og AngularCLI
*Webapplikasjonen skal kjøres på gruppas virtuelle maskin og bruke node.js på serversiden, og skal være utviklet i Angular (bruk v2 eller v4, https://angular.io ). Det er selvsagt greit å i tillegg bruke andre bibliotek eller løsninger som dere finner hensiktsmessig.*

### Backend database
*I webappliksjonen skal det inngå en backend database som kjøres på gruppas virtuelle maskin. Type database og hvordan denne brukes er opp til dere å bestemme, men grensesnittet til databasen skal være godt designet ihht. god praksis (bruk av REST ea).*

### Skriving lesing og søk mot DB
*Dere skal demonstrere både skriving og lesing til databasen fra webapplikasjonen inklusive en form for søk (i praksis dynamisk brukerdefinert utvalg av det som skal vises). Generelt er det mye artigere å jobbe med en datamengde som gir et realistisk inntrykk (eksempevis mulig å søke på forskjellige ting og få resultatsett som er forskjellige og har forskjellig antall). Bruk data dere finner på web, eller lag egne data.*

### Listebasert visning med Expansion Panel
*Brukergrensensittet skal ha listebasert visning med få detaljer for hver enhet, og hvor målet er å vise brukeren hva som er i databasen eller hva som er resultatet av et søk. Brukeren skal ha mulighet til å se flere detaljer for hver enhet enten i et eget vindu, eller ved at listen enheten i lista har expand/collpase egenskap.*

### Listebasert sortering
*Den listebaserte visningen skal kunne sorteres på minimum to forskjellge egenskaper. Eksempel: etter at brukeren har fått returnert en liste etter et søk skal brukeren kunne bytte mellom forskjellige sorteringer.*

### Listebasert filtrering
*Den listebaserte visningen skal kunne filtreres på minimum to forskjellge egenskaper. Eksempel: etter at brukeren har fått returnert en liste etter et søk skal brukeren kunne krysse av på en egenskap for å få begrenset antallet enheter i resultatsettet til kun de som har denne egenskapen.*

### Listebasert dynamisk lasting av data
*Den listebaserte visningen skal ha dynamisk lasting av data. Eksempel: etter et søk vises de 10 første treffene, men flere lastes når brukeren scroller eller ved blaing i sider.*

### Min side funksjonalitet
*Webapplikasjonen skal ha "min side" funksjonalitet som i praksis betyr at en bruker skal kunne logge seg på og at det blir registrert noe fra brukerens søkeaktiviteten f.eks. hva brukeren har sett på tidligere eller søkene som brukeren har brukt.*

### Sessionhåndtering
*Webapplisjonen må implementere "session"-håndtering (som du f.eks. trenger for å implementere dynamisk lasting, min side, og filtrering/sortering som skal fungere med sidevisning).*

### Fancy alternativ visning
*Webapplikasjonen skal ha et litt "fancy" alternativ visning av listen f.eks. visning på kart eller visuell grafisk fremstilling av data, ordsky ea.*

### Testet kode
*Kode skal være testet og funksjonaliteten skal være godt utprøvd og feilfri.*

### Godt dokumentert
*Prosjektet skal være godt dokumentert, slik at det er lett å sette seg inn i for andre.*
