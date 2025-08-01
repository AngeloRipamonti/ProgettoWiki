export function navBarComponent(parentElement) {
    let callback;
    let loginCallback;
    let registerCallback;
    let title;
    let buttons;

    return {
        render: (isLogged) => {
           /////// if (!title || !buttons) return false;

            let newNavBar = `<nav class="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                                      <div class="d-flex align-items-center">
                                        <div class="logo me-2"></div>
                                        <a href="#home" class="text-decoration-none fw-bold text-dark fs-5">Progetto Wiki</a>
                                      </div>
                                    
                                      <ul class="d-flex list-unstyled mb-0">
                                        <li class="me-5">
                                          <a href="#docs" class="link-dark text-decoration-none">
                                            <i class="fa fa-book"></i> Documentation
                                          </a>
                                        </li>
                                        <li class="me-3">
                                          <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-link link-dark p-0">
                                            <i class="fa fa-user"></i>
                                          </button>
                                        </li>
                                      </ul>
                                    </nav>`;

            parentElement.innerHTML = newNavBar;

          //  document.querySelector("#open").onclick = () => callback();
            //document.querySelector("#login").onclick = () => loginCallback();
         //   document.querySelector("#register").onclick = () => registerCallback();
        },
        callback(value) {
            callback = value;
        },
        loginButton(value) {
            loginCallback = value;
        },
        registerCallback(value) {
            registerCallback = value;
        }
    }
}
