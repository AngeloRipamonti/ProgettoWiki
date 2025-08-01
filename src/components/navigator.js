const hide = (elements) => {
    elements.forEach((element) => {
        element.classList.add("d-none");
    });
}

const show = (element) => {
    element.classList.remove("d-none");
}

export const createNavigator = (parentElement, pubsub) => {

    const render = () => {
        const pages = Array.from(document.querySelectorAll(".wiki-page"));
        const url = new URL(document.location.href);
        const pageName = url.hash.replace("#", "");
        const selected = pages.filter((page) => page.id === pageName)[0] || pages[0];
        hide(pages);
        show(selected);
        //show(document.getElementById("spinner"));
    }
    window.addEventListener('popstate', render);
    //render();
}