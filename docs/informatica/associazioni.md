
        <main class="pl-5 mx-5 my-3">

            <article id="intro">
                <h1 class="text-6xl text-center text-red-600 mb-3">Associazioni</h1>
                <p class>Un'associazione collega due entità. Ha due versi, ognuno con:</p>
                <ul class="list-disc list-inside pl-4">
                    <li>Un'entità di partenza e una di arrivo</li>
                    <li>Una descrizione che spiega il significato</li>
                </ul>
            </article>
            <hr class="divisor">
            <article id="rappr">

                <section id="introduction">
                    <p>Per rappresentare graficamente le associazioni, nel modello E/R si usa un rombo con scritto al suo
                        interno il verbo dell'associazione.</p>
                    <figure class="text-center justify-self-center">
                        <img src="../../assets/associazione.drawio.png"
                            alt="Rappresentazione di un associazione nel modello E/R">
                        <figcaption class="italic text-xs">Fig.1 - Associazione nel modello E/R</figcaption>
                    </figure>
                    <p>Ogni associazione ha una cardinalità, cioè un limite massimo di istanze della relazione a cui può
                        partecipare ogni istanza delle entità.</p>
                    <ul class="list-disc list-inside pl-4">
                        <li>Una persona può possedere più telefoni</li>
                        <li>Un telefono è di proprietà di una sola persona</li>
                    </ul>
                    <figure class="text-center justify-self-center">
                        <img src="../../assets/cardinalità.drawio.png"
                            alt="Rappresentazione della cardinalità nel modello E/R">
                        <figcaption class="italic text-xs">Fig.2 - Cardinalità di un associazione nel modello E/R
                        </figcaption>
                    </figure>
                </section>
                <hr class="divisor">
                <section id="cardinalità">
                    <p>Nel modello E/R esistono diversi tipi di cardinalità:</p>
                    <dl class="list-disc list-inside pl-4">

                        <!-- 1:1 -->
                        <dt class="relative before:content-['□'] before:absolute before:-left-4">Associoazioni 1:1
                        </dt>
                        <dd class="pl-6">Un'associazione 1:1 (o associazione biunivoca) che collega un'istanza della prima
                            entità a una sola istanza della seconda, e viceversa.
                            <ul class="list-disc list-inside pl-8">
                                <li>Una persona possiede una carta d'identità</li>
                                <li>Una carta d'identità è possdeduta da una sola persona</li>
                            </ul>
                            <figure class="text-center justify-self-center">
                                <img src="../../assets/1-1.drawio.png" alt="Rappresentazione dell'associazione 1:1'">
                                <figcaption class="italic text-xs">Fig.3 - Associazione 1:1</figcaption>
                            </figure>
                        </dd>

                        <!-- 1:n -->
                        <dt class="relative before:content-['□'] before:absolute before:-left-4">Associazioni 1:n</dt>
                        <dd class="pl-6">Un'associazione 1:n (o associazione semplice) che collega un'istanza della prima
                            entità a una o più istanze della seconda, ma ogni istanza della seconda entità è collegata a una
                            sola della prima.
                            <ul class="list-disc list-inside pl-8">
                                <li>Una persona possiede una o più macchine</li>
                                <li>Una macchina è possdeduta da una sola persona</li>
                            </ul>
                            <figure class="text-center justify-self-center">
                                <img src="../../assets/1-n.drawio.png" alt="Rappresentazione dell'associazione 1:n'">
                                <figcaption class="italic text-xs">Fig.4 - Associazione 1:n</figcaption>
                            </figure>
                        </dd>

                        <!-- n:n -->
                        <dt class="relative before:content-['□'] before:absolute before:-left-4">Associazioni n:n</dt>
                        <dd class="pl-6">Un'associazione n:n (o associazione complessa) che collega ogni istanza della prima
                            entità a una o più istanze della seconda, e viceversa.
                            <ul class="list-disc list-inside pl-8">
                                <li>Un pilota partecipa a una o più gare</li>
                                <li>Ad una gara possono partecipare più piloti</li>
                            </ul>
                            <figure class="text-center justify-self-center">
                                <img src="../../assets/n-n.drawio.png" alt="Rappresentazione dell'associazione n:n'">
                                <figcaption class="italic text-xs">Fig.5 - Associazione n:n</figcaption>
                            </figure>
                        </dd>


                    </dl>
                </section>
                <hr class="divisor">
                <section id="obbligatorietà">

                    <p>L'obbligatorietà di un'associazione è il numero minimo di istanze dell'entità collegate ad
                        un'associazione.
                        E possono essere:</p>
                    <dl class="list-disc list-inside pl-4 mr-2">
                        <div>
                            <dt class="inline relative before:content-['□'] before:absolute before:-left-4">0:
                            </dt>
                            <dd class="inline">Associazione <strong>opzionale</strong> espressa con una
                                linea singola.
                            </dd>
                        </div>
                        <div>
                            <dt class="inline relative before:content-['□'] before:absolute before:-left-4">1:
                            </dt>
                            <dd class="inline">Associazione <strong>obbligatoria</strong> espressa con una
                                doppia linea.
                            </dd>
                        </div>
                    </dl>
                    <h5>Esempio: </h5>
                    <ul class="list-disc list-inside pl-8">
                        <li>Una persona può possedere una carta di debito</li>
                        <li>Una carta di debito deve esser posseduta da una sola persona</li>
                        <li class="underline">Attenzione: non tutte le persone hanno carte di debito, ma le carte di debito
                            hanno sempre un titolare.</li>
                    </ul>
                    <figure class="text-center justify-self-center">
                        <img src="../../assets/obbligatorietà.drawio.png"
                            alt="Obbligatorietà di un associazione nel modello E/R'">
                        <figcaption class="italic text-xs">Fig.6 - Obbligatorietà di un associazione nel modello E/R
                        </figcaption>
                    </figure>
                </section>

                <hr class="divisor">
                <section id="speciali">
                    <p>Infine ci sono 3 associazioni "speciali" esse sono:</p>
                    <dl class="list-disc list-inside pl-4 mr-2">
                        <dt class="relative before:content-['□'] before:absolute before:-left-4">Associazione
                            Identificativa:
                        </dt>
                        <dd class="pl-6">
                            Quest'associazione serve ad identificare un'entità debole, ed è obbligata a partecipare
                            all'associazione. <br>
                            Di conseguenza, per ogni istanza dell'entità debole, deve esistere esattamente un'istanza
                            dell'entità che la identifica.
                            <p class="italic">L'esempio che segue appartiene ad un contesto di un applicazione per gestire
                                le prenotazioni degl'appartamenti</p>
                            <ul class="list-disc list-inside pl-8">
                                <li>Un appartamento identifica le proprie disponibilità</li>
                                <li>Un appartamento può avere diverse disponibilità.</li>
                            </ul>
                            <figure class="text-center justify-self-center">
                                <img src="../../assets/identificativa.drawio.png"
                                    alt="Associazione Identificativa nel modello E/R'">
                                <figcaption class="italic text-xs">Fig.7 - Associazione Identificativa nel modello E/R
                                </figcaption>
                            </figure>
                        </dd>

                        <dt class="relative before:content-['□'] before:absolute before:-left-4">Associazione Ternaria:
                        </dt>
                        <dd class="pl-6">
                            Quest'associazione serve a legare più di 2 entità. Ed ha senso di esistere se la cardinalità è
                            sempre N. <br>
                            Queste associazioni sono rare, ed è sempre meglio verificare che non possano esser gestite
                            tramite 2 associazioni complesse.
                            <ul class="list-disc list-inside pl-8">
                                <li>Un fornitore fornisce N coppie prodotto-dipartimento</li>
                                <li>Un prodotto è fornito da N coppie di fornitore-dipartimento</li>
                                <li>Un dipartimento è rifornito da N coppie di fornitore-prodotto</li>
                            </ul>
                            <figure class="text-center justify-self-center">
                                <img src="../../assets/ternaria.drawio.png" alt="Associazione Ternaria nel modello E/R'">
                                <figcaption class="italic text-xs">Fig.8 - Associazione Ternaria nel modello E/R
                                </figcaption>
                            </figure>
                        </dd>

                        <dt class="relative before:content-['□'] before:absolute before:-left-4">Associazione Unaria:
                        </dt>
                        <dd class="pl-6">
                            Quest'associazione serve a collegare un'entità a se stessa. <br>
                            Essa può essere simmetrica o non simmetrica, nel caso non sia simmetrica serve definire i ruoli
                            di partecipazione.
                            <ul class="list-disc list-inside pl-8">
                                <li>Un alunno può avere uno, due o nessun alunno vicino</li>
                                <li class="underline">In caso fosse stata simmetrica, non cera bisogno di definire chi fosse
                                    il padre e chi il figlio.</li>
                            </ul>
                            <figure class="text-center justify-self-center">
                                <img src="../../assets/unaria.drawio.png" alt="Associazione Unaria nel modello E/R'">
                                <figcaption class="italic text-xs">Fig.9 - Associazione Unaria nel modello E/R
                                </figcaption>
                            </figure>
                        </dd>
                    </dl>
                </section>
            </article>
        </main>

        <footer class="bg-slate-300 mt-5">
            <div class="pl-5">
                <div><small>Scritto da <strong>Angelo Ripamonti</strong></small></div>
                <div><small>Revisionato da <strong>Alexandros Kotis</strong></small></div>
            </div>
        </footer>

