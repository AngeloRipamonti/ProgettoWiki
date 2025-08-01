export const generateLoginComponent = (parentElement, pubSub) => {
    return {
        renderFormLogin: function ()  {
            let html = `<div>
                                <input type="text" id="usernameInput" placeholder="Email">
                               </div>
                                <div>
                                    <input type="password" id="passwordInput" placeholder="Password">
                                </div>
                                <p>Non hai un account? <a type="button" id="registerA" href='#'>Registrati</a></p>
                                <div id="result"></div>
                                <div class="modal-footer">
                                    <button type="button" id="closeModalClient" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" id="loginButton" class="btn btn-primary">Login</button>
                                </div>`;
            parentElement.innerHTML = html;
            document.querySelector("#ModalLabel").innerHTML = "Login";

            document.querySelector("#registerA").onclick = () => {
                this.renderFormRegister();
            };
            pubSub.subscribe("loginVerified", (data) => {
                document.querySelector("#closeModalClient").click();
            })
            document.querySelector("#registerA").onclick = () => {
                this.renderFormRegister()
                document.querySelector("#ModalLabel").innerHTML = "Registrati";
            }
            document.getElementById("loginButton").onclick = () => {
                let usernameInput = document.getElementById("usernameInput");
                let passwordInput = document.getElementById("passwordInput");
                pubSub.publish("loginComplete",{ email: usernameInput.value, password: passwordInput.value });
                document.getElementById("closeModalClient").click();
            }
        },
        renderFormRegister: function()  {
            let html = `<div class="input-container">
                                <label for="email">Email</label>
                                <input type="email" id="email" placeholder="Email" required>
                             </div>
                             <div class="input-container">
                                <label for="password">Password</label>
                                <input type="password" id="password" placeholder="Password" required>
                             </div>
                             <div class="input-container"> 
                                <label for="name">Nome</label>
                                <input type="text" id="name" placeholder="Nome" required> 
                             </div>
                             <div class="input-container">
                                <label for="class">Classe</label>
                                <select id="class" placeholder="Classe" required>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                             </div>
                             <div class="input-container">
                                <label for="date">Data di nascita</label>
                                <input type="date" id="dateOfBirth" placeholder="Data di nascita" required>
                             </div>
                             <div class="input-container">
                                <label>Register as:</label>
                                <div class="role-selection">
                                    <input type="radio" id="approver" name="role" value="approver">
                                    <label class="role-btn black" for="approver">approver</label>
                                    <input type="radio" id="editor" name="role" value="editor">
                                    <label class="role-btn gray" for="editor">editor</label>
                                </div>
                                <p>hai già un account? <a  id="AccediA" href='#'>Accedi</a></p>
                             </div>
                             <div id="result"></div>
                            <div class="modal-footer">
                                <button type="button" id="closeModalClient" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" id="registerButton" class="btn btn-primary">Register</button>
                            </div>`;
            parentElement.innerHTML = html;
            document.querySelector("#ModalLabel").innerHTML = "Registrati";
            document.querySelector("#AccediA").onclick = () => this.renderFormLogin();
            document.getElementById("registerButton").onclick = () => {
                if(document.getElementById("email").value && document.getElementById("password").value && document.getElementById("name").value && document.getElementById("class").value && document.getElementById("dateOfBirth").value) {
                    let data = {
                        email: document.getElementById("email").value,
                        password: document.getElementById("password").value,
                        name: document.getElementById("name").value,
                        class: document.getElementById("class").value,
                        dateOfBirth: document.getElementById("dateOfBirth").value,
                        role: document.getElementById("approver").checked ? "approver" : document.getElementById("editor").checked ? "editor" : "viewer"
                    }
                    pubSub.publish("register", data);
                    document.querySelector("#modalCloseCredential").click()
                }else{
                    alert("Compila tutti i campi");
                }
            }
        }
    };
};