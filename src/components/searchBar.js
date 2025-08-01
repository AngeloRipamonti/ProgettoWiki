export const searchBarComponent = (parentElement, pubSub) => {
    return {
        render: async () => {
                try {
                    const html = `<input type="text" id="table-search" class="form-control w-75 me-2" placeholder="Search for items">
                                          <button id="search-table" type="button" class="btn btn-outline-primary">
                                            <i class="fa fa-search"></i>
                                          </button>`;
                    parentElement.innerHTML = html;

                    document.getElementById("search-table").onclick = () => {
                        const value = document.getElementById("table-search").value.trim();
                        document.getElementById("table-search").value = "";
                        if (!value) {
                            pubSub.publish("searchFailed");
                            return;
                        }

                        pubSub.publish("search", value);
                    };

                    return (html);
                } catch (e) {
                    throw (e);
                }
        }
    };
};
