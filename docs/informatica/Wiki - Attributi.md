***Progetto Wiki***

**Gli Attributi:**

**Cosa sono gli attributi?**

Gli attributi sono le caratteristiche che descrivono un’entità o una relazione.

Cioè le **informazioni** e i **dettagli** che si vogliono memorizzare di un’entità o una relazione.

**Come sono composti?**

Ogni attributo è composto da:

* **Nome:** Ogni attributo deve avere un **nome** che lo identifica all’interno di un’entità o di una relazione.  
    
* **Formato:** Ogni attributo può acquisire solamente un determinato **valore**. **Esempio:** carattere, numero, data…  
    
* **Dimensione:** Ogni attributo ha una sua **capacità** massima   
    
* **Opzionalità:** Ogni attributo ha possibilità di poter assumere una valorizzazione: un attributo può essere **obbligatorio** se non deve avere un valore nullo, e **opzionale** se sono concepibili valori nulli.  
  (l’opzionalità di un attributo nel modello ER è rappresentata con una linea tratteggiata collegata ad un’entità)  
    
* **Dominio:** Ogni attributo possiede un insieme di possibili valori, che devono essere dello stesso tipo.  
  **Esempio attributi di uno studente:**   
  Nome🡪Andrea,Giuseppe,Angela…  
  Cognome🡪Rossi,Verdi,Bianchi…  
  Data di Nascita🡪date…  
  Indirizzo🡪viale liguria…

**Differenza tra attributi Elementari e attributi Calcolati**

**Attributi elementari:**

Gli attributi elementari sono tutti quegli attributi che contengono valori fondamentali, cioè che non derivano da altri attributi.

**Caratteristiche:**

* **Contengono un valore indipendente**   
* **Non richiedono nessuna elaborazione per essere determinati**  
* **Per la gran maggior parte di volte vengono forniti dagli utenti**

**Esempio:**

Entità Persona:

* Nome (Mario)  
* Cognome (Rossi)  
* Data Nascita (03/09/1987)

**Attributi calcolati:**  
Gli attributi calcolati sono tutti quegli attributi che derivano da altri attributi tramite un calcolo.

**Caratteristiche:**

* **Dipendono da uno o più attributi elementari**  
* **Possono essere ottenuti tramite operazione matematiche o logiche**

**Esempio:**

Entità Persona:

* Età🡪calcolata da: **Data Nascita** e la data corrente  
* Nome completo🡪 unione di: **Nome** e **Cognome**

Entità Auto:

* Anni di utilizzo🡪calcolato da: **Anno di immatricolazione** e data corrente

**Gli attributi Chiave:**

Per ogni entità è necessario identificare una **chiave primaria** (**PRIMARY KEY**), costituita da **uno o più attributi**, che consente di identificare in modo univoco ogni istanza dell'entità che si desidera.

La chiave primaria non può contenere **valori nulli**; e nel modello ER viene rappresentata tramite una sottolineatura

**Esempio:**  
Entità Studente:

* Matricola🡪**PrimaryKey** (182918)  
* DataNascita (01/12/2009)  
* Indirizzo (viale lombardia)  
* Cognome (Garibaldi)  
* Nome (Giuseppe)

In questo caso la **PrimaryKey** è Matricola perché, con il minor numero di attributi, si è riusciti a identificare univocamente un’istanza dell’entità studente.

In certi casi si ha bisogno di più attributi per formare la **PrimaryKey**, perché è più complesso identificare univocamente un’istanza di un’entità .

**Attributi di un’associazione:**

Un altro modo per utilizzare gli attributi è quello di collegarli alle **associazioni**.

Solitamente questi tipi di attributi servono a descrivere **informazioni aggiuntive** che appartengono all’**associazione** NON alle singole entità.

Che al di fuori della relazione non hanno significato.

**Esempio:**

**Entità:**

* Entità Utente (Mario Rossi)  
* Entità Libro (Il signore degli Anelli)

**Associazione:**

* Prende in prestito: rappresenta la relazione tra gli **utenti** e i **libri**

**Attributi dell’Associazione:**

* Data del prestito: la data in cui l’utente ha preso il libro  
* Data di restituzione prevista: la data in cui il libro deve essere restituito

In questo esempio “Data del prestito”  e  “Data di restituzione prevista” sono attributi della relazione “**Prendere in prestito**”.

Scritto da **Alexandros Kotis**

Revisionato da **Angelo Ripamonti**

