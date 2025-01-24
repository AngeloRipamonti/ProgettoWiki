# **Associazioni**
Un'associazione collega due entità. Ha due versi, ognuno con:

- Un'entità di partenza e una di arrivo
- Una descrizione che spiega il significato
-----
Per rappresentare graficamente le associazioni, nel modello E/R si usa un rombo con scritto al suo interno il verbo dell'associazione.

![Rappresentazione di un associazione nel modello E/R] 

Fig.1 - Associazione nel modello E/R

Ogni associazione ha una cardinalità, cioè un limite massimo di istanze della relazione a cui può partecipare ogni istanza delle entità.

- Una persona può possedere più telefoni
- Un telefono è di proprietà di una sola persona

![Rappresentazione della cardinalità nel modello E/R][Rappresentazione di un associazione nel modello E/R] 

Fig.2 - Cardinalità di un associazione nel modello E/R 

-----
Nel modello E/R esistono diversi tipi di cardinalità:

Associoazioni 1:1 

Un'associazione 1:1 (o associazione biunivoca) che collega un'istanza della prima entità a una sola istanza della seconda, e viceversa. 

- Una persona possiede una carta d'identità
- Una carta d'identità è possdeduta da una sola persona

  ![Rappresentazione dell'associazione 1:1'][Rappresentazione di un associazione nel modello E/R] 

  Fig.3 - Associazione 1:1

Associazioni 1:n

Un'associazione 1:n (o associazione semplice) che collega un'istanza della prima entità a una o più istanze della seconda, ma ogni istanza della seconda entità è collegata a una sola della prima. 

- Una persona possiede una o più macchine
- Una macchina è possdeduta da una sola persona

  ![Rappresentazione dell'associazione 1:n'][Rappresentazione di un associazione nel modello E/R] 

  Fig.4 - Associazione 1:n

Associazioni n:n

Un'associazione n:n (o associazione complessa) che collega ogni istanza della prima entità a una o più istanze della seconda, e viceversa. 

- Un pilota partecipa a una o più gare
- Ad una gara possono partecipare più piloti

  ![Rappresentazione dell'associazione n:n'][Rappresentazione di un associazione nel modello E/R] 

  Fig.5 - Associazione n:n

-----
L'obbligatorietà di un'associazione è il numero minimo di istanze dell'entità collegate ad un'associazione. E possono essere:

0: 

Associazione **opzionale** espressa con una linea singola. 

1: 

Associazione **obbligatoria** espressa con una doppia linea. 
##### **Esempio:** 
- Una persona può possedere una carta di debito
- Una carta di debito deve esser posseduta da una sola persona
- Attenzione: non tutte le persone hanno carte di debito, ma le carte di debito hanno sempre un titolare.

![Obbligatorietà di un associazione nel modello E/R'][Rappresentazione di un associazione nel modello E/R] 

Fig.6 - Obbligatorietà di un associazione nel modello E/R 

-----
Infine ci sono 3 associazioni "speciali" esse sono:

Associazione Identificativa: 

Quest'associazione serve ad identificare un'entità debole, ed è obbligata a partecipare all'associazione. 
Di conseguenza, per ogni istanza dell'entità debole, deve esistere esattamente un'istanza dell'entità che la identifica. 

L'esempio che segue appartiene ad un contesto di un applicazione per gestire le prenotazioni degl'appartamenti

- Un appartamento identifica le proprie disponibilità
- Un appartamento può avere diverse disponibilità.

  ![Associazione Identificativa nel modello E/R'][Rappresentazione di un associazione nel modello E/R] 

  Fig.7 - Associazione Identificativa nel modello E/R 

Associazione Ternaria: 

Quest'associazione serve a legare più di 2 entità. Ed ha senso di esistere se la cardinalità è sempre N. 
Queste associazioni sono rare, ed è sempre meglio verificare che non possano esser gestite tramite 2 associazioni complesse. 

- Un fornitore fornisce N coppie prodotto-dipartimento
- Un prodotto è fornito da N coppie di fornitore-dipartimento
- Un dipartimento è rifornito da N coppie di fornitore-prodotto

  ![Associazione Ternaria nel modello E/R'][Rappresentazione di un associazione nel modello E/R] 

  Fig.8 - Associazione Ternaria nel modello E/R 

Associazione Unaria: 

Quest'associazione serve a collegare un'entità a se stessa. 
Essa può essere simmetrica o non simmetrica, nel caso non sia simmetrica serve definire i ruoli di partecipazione. 

- Un alunno può avere uno, due o nessun alunno vicino
- In caso fosse stata simmetrica, non cera bisogno di definire chi fosse il padre e chi il figlio.

  ![Associazione Unaria nel modello E/R'][Rappresentazione di un associazione nel modello E/R] 

  Fig.9 - Associazione Unaria nel modello E/R 

Scritto da **Angelo Ripamonti**

Revisionato da **Alexandros Kotis**

[Rappresentazione di un associazione nel modello E/R]: Aspose.Words.52cd6532-253c-4ccc-9c02-dbbc157f7b82.001.png
