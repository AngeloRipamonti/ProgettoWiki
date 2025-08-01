export function doc(parentElement, pubsub) {
    let data;
    let idArticle = -1;

    function render(){
        let dati = idArticle !== -1 
            ? data.filter(e => e.id === idArticle)
            : data;

        parentElement.innerHTML = `${dati?.map((e, i) => {
            return `<article ${i !== 0 ? "class='d-none hVh'" : "class='hVh'"}>
                        <h1>${e.title}</h1>
                        <h4>${e.description}</h4>
                        <p>${e.content}</p>
                        <h6>${e.author_email} - ${e.approver_email}</h6>
                    </article>`
        }).join("") || "No docs available"}`;
    }

    pubsub.subscribe("sidebarClick", (id) => {
        idArticle = id;
        render();
    });

    return {
        build: function (values){
            console.log(values);
            data = values;
            render();
        }
    }
}
