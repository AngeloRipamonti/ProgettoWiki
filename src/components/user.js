export function user(parentElement, data, pubSub) {

    return {


        renderApprover: function () {
            pubSub.publish("approverContent");

            pubSub.subscribe("confirmApproverContent", async (data) => {
                parentElement.innerHTML = `
            <div class="container text-center my-4">
                <h2 class="mb-4">contenuti da approvare</h2>
                <div class="row justify-content-start">
                    <div class="col-2 d-flex flex-column align-items-start">
                        ${data.map(e => `
                            <button class="contentButton btn btn-outline-primary mb-2" id="approverContent_${e.id}">${e.title}</button>
                        `).join("")}
                    </div>
                </div>
            </div>
        `;

                const buttons = Array.from(document.querySelectorAll("button")).filter(btn => btn.id.startsWith("approverContent_"));
                buttons.forEach(btn => {
                    btn.onclick = () => {
                        const contentId = btn.id.split("_")[1];
                        const contentName = btn.innerText;

                        pubSub.publish("loadVersions", contentId);

                        pubSub.subscribe("confirmVersions", versions => {
                            parentElement.innerHTML = `
                        <div class="container text-center my-4">
                            <h2 class="mb-4">seleziona la versione per <strong>${contentName}</strong>:</h2>
                            <div class="row justify-content-center">
                                <div class="col-auto d-flex flex-column align-items-end">
                                    ${versions.map(v => `
                                        <div class="d-flex align-items-center mb-2 ${v.versionStatus == 0 ? "bg-secondary" : v.versionStatus == 1 ? "bg-success" : v.versionStatus == -1 ? "bg-danger" : "bg-primary"}">
                                            <button class="btn btn-outline-primary me-2" id="approverVersionContent_${v.version}">${v.version}</button>
                                            <span>visualizza</span>
                                        </div>
                                    `).join("")}
                                </div>
                            </div>
                        </div>
                    `;

                            Array.from(parentElement.querySelectorAll("button"))
                                .filter(btn => btn.id.startsWith("approverVersionContent_"))
                                .forEach(verBtn => {
                                    verBtn.onclick = () => {
                                        const selectedVersion = verBtn.id.split("_")[1];
                                        pubSub.publish("loadVersionDetail", {
                                            id: contentId,
                                            version: selectedVersion
                                        });

                                        pubSub.subscribe("confirmVersion", ([data]) => {
                                            let html = `
                                        <div class="container my-4">
                                            <h1>${data.title}</h1>
                                            <h5>${data.description}</h5>
                                            <p>${data.content}</p>
                                            <h6>${data.author_email}</h6>
                                            <div class="mt-4">`;

                                            if (Number(data.versionStatus) === 1) {
                                                html += `<button class="btn btn-outline-secondary me-2" id="reset_${data.version}_${data.id}">Reset</button>`;
                                            } else if (Number(data.versionStatus) === 0) {
                                                html += `
                                            <button class="btn btn-outline-success me-2" id="approve_${data.version}_${data.id}">Approve</button>
                                            <button class="btn btn-outline-danger me-2" id="deny_${data.version}_${data.id}">Deny</button>
                                        `;
                                            } else if (Number(data.versionStatus) === -1) {
                                                html += `<div class="text-danger fw-bold">Versione negata - sola visualizzazione</div>`;
                                            }

                                            html += `</div></div>`;
                                            parentElement.innerHTML = html;

                                            // Event binding
                                            const approveBtn = document.getElementById(`approve_${data.version}_${data.id}`);
                                            const denyBtn = document.getElementById(`deny_${data.version}_${data.id}`);
                                            const resetBtn = document.getElementById(`reset_${data.version}_${data.id}`);

                                            if (approveBtn) {
                                                approveBtn.onclick = () => {
                                                    pubSub.publish("updateVersionStatus", {
                                                        id: data.id,
                                                        version: data.version,
                                                        newStatus: 1
                                                    });
                                                    pubSub.publish("loadVersionDetail", {
                                                        id: data.id,
                                                        version: data.version
                                                    });
                                                };
                                            }

                                            if (denyBtn) {
                                                denyBtn.onclick = () => {
                                                    pubSub.publish("updateVersionStatus", {
                                                        id: data.id,
                                                        version: data.version,
                                                        newStatus: -1
                                                    });
                                                    pubSub.publish("loadVersionDetail", {
                                                        id: data.id,
                                                        version: data.version
                                                    });
                                                };
                                            }

                                            if (resetBtn) {
                                                resetBtn.onclick = () => {
                                                    pubSub.publish("updateVersionStatus", {
                                                        id: data.id,
                                                        version: data.version,
                                                        newStatus: 0
                                                    });
                                                    pubSub.publish("loadVersionDetail", {
                                                        id: data.id,
                                                        version: data.version
                                                    });
                                                };
                                            }
                                        });
                                    };
                                });
                        });
                    };
                });
            });
        },
        renderEditor: function (element) {
            element.innerHTML = `<div>Come funziona? <br> 
            <ul>
                <li>Prima riga: Titolo</li>
                <li>Seconda riga: Descrizione</li>
                <li>Le righe successive: Contenuto</li>
                <li>Finito di scrivere premere il bottone "Save"</li>
            </ul>
            </div>
            </div><div id="editorQuill"></div>
            <div><button id="saveDoc" class="btn btn-success">Save</button></div>`;
            const quill = new Quill("#editorQuill", {
                modules: {
                    toolbar: false
                },
                placeholder: "Title\nDescription\nContent",
                theme: "bubble"
            });
            document.getElementById("saveDoc").onclick = () => {
                pubSub.publish("saveDoc", {
                    title: quill.getText().split("\n")[0],
                    description: quill.getText().split("\n")[1],
                    content: quill.getText().split("\n").slice(2).join("\n"),
                    author_email: data.email
                });
                quill.root.innerHTML = "";
            }
        },
            
        renderAdmin: function () {
            const self = this;
            pubSub.publish("adminContent");
            pubSub.subscribe("confirmAdminContent", async (values) => {
                let string = "";
                values.forEach((value) => {
                    string += `
                        <div>
                            <h6>${value.email}</h6>
                            <button class="btn btn-primary confirm-btn" data-email="${value.email}">Conferma</button>
                            <button class="btn btn-danger reject-btn" data-email="${value.email}">Rifiuta</button>
                        </div>
                    `;
                });
                parentElement.innerHTML = string;
        
                document.querySelectorAll(".confirm-btn").forEach(button => {
                    button.onclick = function () {
                        const email = this.dataset.email;
                        console.log("Confermata:", email);
                        pubSub.publish("confirmUsers", {email});
                        self.renderAdmin();
                    };
                });
        
                document.querySelectorAll(".reject-btn").forEach(button => {
                    button.onclick = function () {
                        const email = this.dataset.email;
                        console.log("Rifiutata:", email);
                        pubSub.publish("deleteUsers", {email});
                        self.renderAdmin();
                    };
                });
            });
        },
        
        
        renderAccount: function () {
            parentElement.innerHTML = `Dati:
                <ul class="list-unstyled small" id="accountData">
                    <li><span>Nome 
                        <input type="text" value="${data.name}" column="name" disabled class="fieldInput form-control form-control-sm d-inline-block w-auto ms-2" id="inputName">
                        <button class="btn btn-outline-dark btn-sm ms-2 fieldButton" id="modifyName">
                            <i class="fa fa-pencil"></i> 
                        </button>
                    </span></li>
        
                    <li><span>Anno di Nascita 
                        <input type="date" value="${data.birth_date}" disabled class="form-control form-control-sm d-inline-block w-auto ms-2" id="inputBirth">
                    </span></li>
        
                    <li><span>Email 
                        <input type="email" value="${data.email}" disabled class="form-control form-control-sm d-inline-block w-auto ms-2" id="inputEmail">
                    </span></li>
        
                    <li><span>Password 
                        <input type="password" value="${data.password}" column="password" disabled class="fieldInput form-control form-control-sm d-inline-block w-auto ms-2" id="inputPassword">
                        <button class="btn btn-outline-dark btn-sm ms-2 fieldButton" id="modifyPassword">
                            <i class="fa fa-pencil"></i> 
                        </button>
                    </span></li>
        
                    <li><span>Classe 
                        <input type="text" value="${data.class}" column="class" disabled class="fieldInput form-control form-control-sm d-inline-block w-auto ms-2" id="inputClass">
                        <button class="btn btn-outline-dark btn-sm ms-2 fieldButton" id="modifyClass">
                            <i class="fa fa-pencil"></i> 
                        </button>
                    </span></li>
                </ul>`;

            const inputs = document.querySelectorAll(".fieldInput");
            document.querySelectorAll(".fieldButton").forEach((btn, i) => {
                btn.onclick = () => {
                    if (inputs[i].disabled) {
                        inputs[i].disabled = false;
                        btn.innerHTML = `<i class="fa fa-check"></i>`;
                        if (inputs[i].getAttribute("column") === "password") inputs[i].value = "";
                    }
                    else {
                        pubSub.publish("modifyAccount", {
                            value: inputs[i].value,
                            email: data.email,
                            column: inputs[i].getAttribute("column")
                        });
                        pubSub.subscribe("confirmModifyAccount", () => {
                            inputs[i].disabled = true;
                            btn.innerHTML = `<i class="fa fa-pencil"></i>`
                        });
                    }
                }
            });


            pubSub.subscribe("sidebarApproverBtn", () => {
                if (data.role === "approver") this.renderApprover();
            });


            pubSub.subscribe("sidebarAdminBtn", () => {
                if (data.role === "admin") this.renderAdmin();
            });

            pubSub.subscribe("sidebarEditorBtn", () => {
                if (data.role === "editor") {
                    document.getElementById("editorButtonAdd").classList.remove("d-none");
                    document.getElementById("editorButtonAdd").onclick = () => {
                        this.renderEditor(document.getElementById("editor"));
                        location.href = "#editor";
                    }
                    location.href = "#home";
                }
            });

        }

    }
}