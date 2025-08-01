<!DOCTYPE html>
<html lang="it">
    <head>
      <meta charset="utf-8">
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Progetto Wiki - Home</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/railscasts.min.css">
      <link rel="stylesheet" href="/assets/css/scribbler-global.css">
      <link rel="stylesheet" href="/assets/css/scribbler-landing.css">
      <link rel="stylesheet" href="/assets/css/home.css">
      <link rel="author" href="author.txt">
      <link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.bubble.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.min.js" integrity="sha384-VQqxDN0EQCkWoxt/0vsQvZswzTHUVOImccYmSyhJTp7kGtPed0Qcx8rK9h9YEgx+" crossorigin="anonymous"></script>
    </head>
    <body class="min-vh-100">
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="ModalLabel"></h1>
              <button type="button" class="btn-close" id="modalCloseCredential" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div id="modalbody" class="">
                <!-- <div class="input-container">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Email">
                    </div>
                    <div class="input-container">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Password">
                    </div>
                    <div class="input-container">
                        <label>Register as:</label>
                        <div class="role-selection">
                            <input type="radio" id="approver" name="role" value="approver">
                            <label class="role-btn black" for="approver">approver</label>
                            <input type="radio" id="editor" name="role" value="editor">
                            <label class="role-btn gray" for="editor">editor</label>
                        </div>
                    </div>-->

              </div>
            </div>
          </div>
        </div>
    </div>
        <div id="nav-bar"></div>

        <div>
            <div id="home" class="wiki-page wrapper">
              <aside id = "sidebar">

              </aside>

                <div class="installation">
                    <div class="search-bar mt-3" id="search-bar">                        </div>

                    <div class="tab__container">

                            <!--<input type="text" placeholder="Search...">
                            <button>Search</button>-->
                        <!--Aggiungere qua search-->

                    </div>
                </div>
                <div class="feature" id="pages">

                </div>
                <div class="callout mb-5">
                    <p>Read our documentation for advanced keybindings and customization</p>
                    <a href="index.html" class="button--primary">Documentation</a>
                </div>
                <div id="editorButtonAdd" class="position-fixed d-none bottom-0 end-0 mb-5 me-3">
                    <button type="button" class="btn btn-primary" id="btnAddPage"><i class="fa fa-plus"></i></button>
                </div>
            </div>
            <div id="user" class="wiki-page container-fluid d-none">
                <div class ="row">
                    <aside class="col-md-3 bg-light p-3" id="sidebarAccount"></aside>
                    <div class="col-md-9 p-3" id="userPage"></div>
                </div>
            </div>
            <div id="login" class="d-none"></div>
            <div id="docs" class="wiki-page container-fluid d-none">
              <div class ="row">
                <aside class="col-md-3 bg-light p-3" id = "sidebarContent"></aside>
                <div class="col-md-9 p-3" id = "docsPage"></div>
              </div>
            </div>
            <div id="editor" class="wiki-page d-none"></div>
        </div>

        <footer class="footer position-relative fixed-bottom">© Copyright <?php echo date("Y"); ?> Angelo Ripamonti, Alexandros Kotis, Lorenzo Di Donna e Simone Tacconi</footer>
        <script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>
        <script type="module" src="./index.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
        <script>
          hljs.initHighlightingOnLoad();
        </script>
        <script src="/assets/js/scribbler.js" defer></script>
    </body>
</html>