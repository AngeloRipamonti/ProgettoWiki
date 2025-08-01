export function database() {
    const url = 'http://localhost:8050/src/service/api.php';

    return {
        createContent: async function (title, description, content, author_email) {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    table: "content",
                    title,
                    description,
                    content,
                    author_email
                })
            });
            return await response.json();
        },
        register: async function (email, password, name, birth_date, userClass, role) {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    table: "users",
                    email,
                    password,
                    name,
                    birth_date,
                    class: userClass,
                    role
                })
            });
            return await response.json();
        },

        login: async function (email, password) {
            const params = new URLSearchParams({ table: "users", email, password });
            const response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            return await response.json();
        },

        deleteUsers: async function (email  ) {
            const params = new URLSearchParams({ table: "deleteUsers", email });
            console.log("params: "+params);
            const response = await fetch(`${url}?${params.toString()}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            return await response.json();
        },

        sidebar: async function () {
            const params = new URLSearchParams({ table: "sidebar"});
            const response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            return await response.json();
        },

        searchbar: async function (value) {
            const params = new URLSearchParams({ table: "searchbar", value: value});
            const response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            return await response.json();
        },

        content6rand: async function () {
            const params = new URLSearchParams({ table: "homeDefault"});
            const response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            return await response.json();
        },

        updateAccount: async function (column, email, value) {
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    table: "users",
                    column,
                    email,
                    value
                })
            });
            return await response.json();
        },

        approverContent: async function () {
            const params = new URLSearchParams({ table: "approverContent"});
            const response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            return await response.json();
        },

        getVersions: async function (contentID) {
            const params = new URLSearchParams({ table: "versions", id: contentID});
            const response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            return await response.json();
        },

        getVersion: async function (contentID, version) {
            const params = new URLSearchParams({ table: "content", id: contentID, version: version});
            const response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            return await response.json();
        },

        confirms: async function () {
            const params = new URLSearchParams({ table: "confirms"});
            console.log("params confirm: " + params);
            const response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            return await response.json();
        },

        updateConfirms: async function (email) {
            
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    table: "confirm",
                    email,
                })
            });
            return await response.json();
        },
        updateVersionStatus: async function (id, version, newStatus) {
            
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    table: "updateVersionStatus",
                    id, version, newStatus
                })
            });
            return await response.json();
        },

        getDocs: async function () {
            const params = new URLSearchParams({ table: "docs"});
            const response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            return await response.json();
        },
    };
}