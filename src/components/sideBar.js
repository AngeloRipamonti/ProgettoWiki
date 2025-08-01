export function sideBarComponent(idParentElement, pubSub) {
    const parentElement = document.getElementById(idParentElement);
    let index = idParentElement == "sidebarAccount" ? 0 : 1;
    const variable = {
        0: `<aside class="doc__nav bg-light p-2 d-flex flex-column min-vh-100 col-1">
        <ul class="list-unstyled">
          <li class="js-btn"><button class="btn btn-light text-start w-100 mb-1 shadow-none border-0" id="sidebarEditorBtn">Editor</button></li>
          <li class="js-btn"><button class="btn btn-light text-start w-100 mb-1 shadow-none border-0" id="sidebarApproverBtn">Approver</button></li>
          <li class="js-btn"><button class="btn btn-light text-start w-100 mb-1 shadow-none border-0" id="sidebarAdminBtn">Admin</button></li>
        </ul>
      </aside>`,

        1: `<ul class="nav flex-column list-unstyled">
        <li class="nav-item"><a class="nav-link" href="#UML">UML/ER/Logic Model</a>
        </li>
    </ul>`

    };

    const render = () => {
        if (variable[index]) {
            parentElement.innerHTML = variable[index];
            if (index === 0) {
                document.getElementById("sidebarEditorBtn").onclick = () => pubSub.publish("sidebarEditorBtn");
                document.getElementById("sidebarApproverBtn").onclick = () => pubSub.publish("sidebarApproverBtn");
                document.getElementById("sidebarAdminBtn").onclick = () => pubSub.publish("sidebarAdminBtn");
            }
        } else {
            console.error("Template sidebar non trovato per indice:", index);
            parentElement.innerHTML = "Errore caricamento sidebar.";
        }
    };

    pubSub.subscribe("sidebar", (data) => {
        console.log(data);
        if (Array.isArray(data)) {
            // Genero la lista con data-id e onclick inline
            variable[1] = `
                <ul class="nav flex-column list-unstyled">
                    ${data.map(el => `
                        <li class="nav-item">
                            <a 
                              class="nav-link btn btn-light text-start w-100 mb-1 shadow-none border-0" 
                              href="#docs" 
                              data-id="${el.id}" 
                            >
                              ${el.title}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            `;
            render();
            data.map(el => {
                const link = document.querySelector(`a[data-id="${el.id}"]`);
                if (link) {
                    link.onclick = () => pubSub.publish("sidebarClick", el.id);
                }
            });
        } else {
            console.error("Dati non validi ricevuti per sidebar:", data);
        }
    });
    
    return {
        render: render,
    };
}
