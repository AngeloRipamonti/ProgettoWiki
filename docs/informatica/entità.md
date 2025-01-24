# Le Entità

## Introduzione
Durante l’analisi della realtà, per la creazione del database, si nota che ci sono più attori con delle proprietà comuni. Per esempio, nella creazione di un database scolastico individuiamo come principali concetti studente e insegnante. Le entità quindi vengono usate per mettere a fattor comune gli oggetti con caratteristiche analoghe.
Agli atti pratici le entità vengono viste come tabelle le cui righe rappresentano le singole istanze.



## Caratteristiche delle entità
- Le entità sono caratterizzate dagli attributi, informazioni aggiuntive;

- Ogni entità possiede una chiave primaria, un attributo che permette di distinguere un’istanza dall’altra;

- Nello schema E/R le entità vengono rappresentate con un rettangolo che al suo interno ha il nome dell’entità stessa.


## Rappresentazione ER

![er](https://i.ibb.co/YhqyDC3/Cattura.png)

## Entità deboli e forti

### Entità Forti
Hanno una chiave primaria autonoma che permette di identificare ciascuna tupla senza bisogno di altre entità. Ad esempio, un Cliente con un ID univoco non necessita di ulteriori informazioni esterne per essere identificato. Sono indipendenti e possono esistere senza riferimenti ad altre entità.

### Entità Deboli
Non possiedono una chiave primaria consistente. Dipendono da un'entità forte per essere identificate. La loro chiave primaria è spesso composta da un identificatore proprio e dalla chiave primaria dell'entità forte a cui sono collegate. Per esempio, un’entità studente con matricola come chiave primaria ha bisogno di un’entità scuola per poter garantire consistenza.
Le entità deboli necessitano di associazioni particolari (identificative) per esistere e per essere identificate insieme all’entità forte.

## Rappresentazione ER

![er](https://i.postimg.cc/cLJrg18r/Cattura.png)

## Entità Associative

Le entità associative vengono utilizzate per rappresentare relazioni n-a-n tra due o più entità.
- Non sono entità "autonome" come le forti, né dipendenti come le deboli.
- Servono come ponte tra altre entità, includendo chiavi primarie delle entità collegate come chiavi esterne e formando una chiave primaria composta.
### Esempio:
Se abbiamo due entità Studente e Corso, e uno studente può iscriversi a più corsi, mentre un corso può avere più studenti, utilizziamo un'entità associativa come Iscrizione con gli attributi:
- ID_Studente
- ID_Corso
- Data_Iscrizione
L’entità iscrizione rappresenta la relazione n-a-n tra Studente e Corso.

## Rappresentazione ER

![er](https://i.postimg.cc/pdwT6DcF/Cattura.png)

*Scritto da: Avveduto Luca - Revisionato da: Cicoria Davide*
