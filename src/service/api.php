<?php
    error_reporting(0);
    ini_set('display_errors', 0);

    require_once 'mailService.php';
    $config = json_decode(file_get_contents(__DIR__ . '/config.json'), true);

    $hostname = $config['hostname'];
    $username = $config['username'];
    $password = $config['password'];
    $dbname   = $config['database_name'];
    $port     = $config['port'];

    $conn = new mysqli($hostname, $username, $password, $dbname, $port);
    if ($conn->connect_error) {
        die("Connessione fallita: " . $conn->connect_error);
    }

    $mailer = new MailerService($config["mail"], 'WikiProject');

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $input = json_decode(file_get_contents('php://input'), true);

    function respond($data) {
        echo json_encode($data);
        exit;
    }

    try {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                switch ($_GET["table"]) {
                    case "users":
                        if (!empty($_GET["email"]) && !empty($_GET["password"])) {
                            $stmt = $conn->prepare("SELECT DISTINCT * FROM users u JOIN roles_users ru ON u.email = ru.email WHERE u.email = ? AND ru.confirmed = 1");
                            $stmt->bind_param("s", $_GET["email"]);
                            $stmt->execute();
                            $result = $stmt->get_result();

                            if ($result->num_rows > 0) {
                                $user = $result->fetch_assoc();
                                if (password_verify($_GET["password"], $user["password"])) {
                                    respond($user);
                                } else {
                                    respond(["error" => "Credenziali non valide"]);
                                }
                            } else {
                                respond(["error" => "Utente non trovato o non confermato"]);
                            }
                        } else {
                            respond(["error" => "Parametri mancanti"]);
                        }
                        break;
                    
                    case "specificContent":
                        if (!empty($_GET["version"]) && !empty($_GET["id"])) {
                            $stmt = $conn->prepare("SELECT c.id,c.status AS content_status,c.title,c.description,c.created_at,c.approver_email,c.author_email,v.version,v.status AS version_status,v.content AS version_content FROM contents c JOIN versions v ON v.content_id = c.id WHERE c.id = ? AND v.version = (SELECT MAX(v2.version) FROM versions v2 WHERE v2.content_id = c.id;");
                            $stmt->bind_param("i", $_GET["id"]);
                            $stmt->execute();
                            $result = $stmt->get_result();
                        }

                        $data = [];
                        while ($row = $result->fetch_assoc()) {
                            $data[] = $row;
                        }
                        respond($data);
                        
                        break;

                    case "content":
                        if (!empty($_GET["version"]) && !empty($_GET["id"])) {
                            $stmt = $conn->prepare("SELECT DISTINCT *, v.status AS versionStatus FROM contents c JOIN versions v ON c.id = v.content_id WHERE c.id = ? AND v.version = ?");
                            $stmt->bind_param("ii", $_GET["id"], $_GET["version"]);
                            $stmt->execute();
                            $result = $stmt->get_result();
                        } else {
                            $result = $conn->query("SELECT DISTINCT *, v.status AS versionStatus FROM contents c JOIN versions v ON c.id = v.content_id");
                        }

                        $data = [];
                        while ($row = $result->fetch_assoc()) {
                            $data[] = $row;
                        }
                        respond($data);
                        break;

                    case "sidebar":
                        $result = $conn->query("SELECT title, id FROM contents WHERE status = 1;");
                        $data = [];
                        while ($row = $result->fetch_assoc()) {
                            $data[] = $row;
                        }
                        respond($data);
                        break;

                    case "searchbar":
                        if (isset($_GET['value'])) {
                            $stmt = $conn->prepare("SELECT * FROM contents WHERE LOWER(title) LIKE LOWER(?)");
                            $searchTerm = "%" . $_GET['value'] . "%";
                            $stmt->bind_param("s", $searchTerm);
                            $stmt->execute();
                            $result = $stmt->get_result();
                            $data = [];
                            while ($row = $result->fetch_assoc()) {
                                $data[] = $row;
                            }
                            respond($data);
                        } else {
                            respond(["message" => "Valore di ricerca mancante"]);
                        }
                        break;

                    case "homeDefault":
                        $result = $conn->query("SELECT * FROM contents ORDER BY RAND() LIMIT 6;");
                        $data = [];
                        while ($row = $result->fetch_assoc()) {
                            $data[] = $row;
                        }
                        respond($data);
                        break;

                    case "approverContent":
                        $result = $conn->query("SELECT * FROM contents;");
                        $data = [];
                        while ($row = $result->fetch_assoc()) {
                            $data[] = $row;
                        }
                        respond($data);
                        break;

                    case "versions":
                        if (empty($_GET["id"])) {
                            respond(["message" => "ID contenuto non valido"]);
                        }
                        $stmt = $conn->prepare("SELECT *, v.status AS versionStatus FROM versions v JOIN contents c ON c.id = v.content_id WHERE c.id = ?");
                        $stmt->bind_param("i", $_GET["id"]);
                        $stmt->execute();
                        $result = $stmt->get_result();
                        $data = [];
                        while ($row = $result->fetch_assoc()) {
                            $data[] = $row;
                        }
                        respond($data);
                        break;

                    case "confirms": 
                        $result = $conn->query("SELECT * FROM roles_users where confirmed = 0;");
                        $data = [];
                        while ($row = $result->fetch_assoc()) {
                            $data[] = $row;
                        }
                        respond($data);
                        break;

                    case "docs":
                        $result = $conn->query("SELECT DISTINCT c.*, v.version, v.status AS vStatus, v.content, v.created_at AS vCreatedAt, v.approver_email AS vApproverEmail, v.author_email AS vAuthorEmail  FROM contents c JOIN ( SELECT v1.* FROM versions v1 JOIN ( SELECT content_id, MAX(version) AS max_version FROM versions WHERE status = 1 GROUP BY content_id ) latest ON v1.content_id = latest.content_id AND v1.version = latest.max_version WHERE v1.status = 1) v ON c.id = v.content_id WHERE c.status = 1;");
                        $data = [];
                        while ($row = $result->fetch_assoc()) {
                            $data[] = $row;
                        }
                        respond($data);
                        break;
                    default:
                        respond(["message" => "Tabella non valida"]);
                }
                break;

            case 'POST':
                switch ($input["table"]) {
                    case "users":
                        if (!filter_var($input["email"], FILTER_VALIDATE_EMAIL)) {
                            respond(["error" => "Formato email non valido"]);
                        }

                        $hashedPassword = password_hash($input["password"], PASSWORD_DEFAULT);
                        $stmt = $conn->prepare("INSERT INTO users (email, password, name, `class`, birth_date) VALUES (?, ?, ?, ?, ?)");
                        $stmt->bind_param("sssss", $input["email"], $hashedPassword, $input["name"], $input["class"], $input["birth_date"]);
                        $stmt->execute();

                        $stmt = $conn->prepare("INSERT INTO roles_users (role, email) VALUES (?, ?)");
                        $stmt->bind_param("ss", $input["role"], $input["email"]);
                        $stmt->execute();

                        respond(["message" => "Utente registrato con successo"]);
                        break;

                    case "content":
                        if (!empty($input["content"]) &&!empty($input["title"]) &&!empty($input["description"]) &&!empty($input["author_email"])) {
                            $stmt = $conn->prepare("INSERT INTO contents (title, author_email, description) VALUES (?,?,?)");
                            $stmt->bind_param("sss", $input["title"], $input["author_email"], $input["description"]);
                            $stmt->execute();
                            $content_id = $stmt->insert_id; 
                            $version = 0;
                            $stmt = $conn->prepare("INSERT INTO versions (content_id, version, content, author_email) VALUES (?,?,?,?)");
                            $stmt->bind_param("iiss", $content_id, $version, $input["content"], $input["author_email"]);
                            $stmt->execute();
                            respond(["message" => "Contenuto creato con successo"]);
                        } else {
                            respond(["message" => "Campi mancanti: content, title, description, author"]);
                        }
                        break;
                    default:
                        respond(["error" => "Tabella non valida"]);
                }
                break;

            case 'PUT':
                switch ($input["table"]) {
                    case "users":
                        $allowedColumns = ['name', 'password', 'birth_date', 'class'];
                        if (!in_array($input["column"], $allowedColumns)) {
                            respond(["error" => "Colonna non valida"]);
                        }

                        $sql = "UPDATE users SET {$input["column"]} = ? WHERE email = ?";
                        $stmt = $conn->prepare($sql);
                        $stmt->bind_param("ss", $input["value"], $input["email"]);
                        $stmt->execute();

                        respond(["message" => $stmt->affected_rows > 0 ? "Utente aggiornato" : "Utente non trovato"]);
                        break;

                    case "content":
                        if (!empty($input["approved"]) && !empty($input["approver"]) && !empty($input["version"])) {
                            $msg = "";

                            if (!empty($input["content"])) {
                                $stmt = $conn->prepare("UPDATE contents SET status = ?, approver_email = ? WHERE id = ?");
                                $stmt->bind_param("isi", $input["approved"], $input["approver"], $input["content"]);
                                $stmt->execute();
                                $msg .= $stmt->affected_rows > 0 ? "Contenuto aggiornato. " : "Contenuto non trovato. ";
                            }

                            $stmt = $conn->prepare("UPDATE versions SET status = ?, approver_email = ? WHERE version = ?");
                            $stmt->bind_param("isi", $input["approved"], $input["approver"], $input["version"]);
                            $stmt->execute();
                            $msg .= $stmt->affected_rows > 0 ? "Versione aggiornata." : "Versione non trovata.";

                            respond(["message" => $msg]);
                        } else {
                            respond(["message" => "Campi mancanti: approved, approver e/o version"]);
                        }
                        break;

                        case "updateVersionStatus":
                            $id = isset($input["id"]) ? (int)$input["id"] : null;
                            $version = isset($input["version"]) ? (int)$input["version"] : null;
                            $newStatus = isset($input["newStatus"]) ? (int)$input["newStatus"] : null;

                            if (!is_null($id) && !is_null($version) && !is_null($newStatus)) {
                                $stmt = $conn->prepare("UPDATE versions SET status = ? WHERE content_id = ? AND version = ?");
                                
                                if (!$stmt) {
                                    respond(["error" => "Errore nella prepare: " . $conn->error]);
                                }

                                $stmt->bind_param("iii", $newStatus, $id, $version);

                                if ($stmt->execute()) {
                                    respond(["success" => true, "message" => "Stato della versione aggiornato con successo."]);
                                } else {
                                    respond(["error" => "Errore durante l'aggiornamento della versione."]);
                                }
                            } else {
                                respond(["error" => "Parametri mancanti: id, version o newStatus."]);
                            }

                        break;


                    case "confirm":
                        $sql = "UPDATE roles_users SET confirmed = 1 WHERE email = ? AND confirmed = 0;";
                        $stmt = $conn->prepare($sql);
                        $stmt->bind_param("s", $input["email"]);
                        $stmt->execute();

                        respond(["message" => $stmt->affected_rows > 0 ? "Utente aggiornato" : "Utente non trovato"]);
                        break;

                    default:
                        respond(["message" => "Tabella non valida"]);
                }
                break;

            case 'DELETE':
                switch ($_GET["table"]) {
                    case "deleteUsers":
                        $stmt = $conn->prepare("DELETE FROM users WHERE email = ?");
                        $stmt->bind_param("s", $_GET["email"]);
                        $stmt->execute();
                        respond(["message" => $stmt->affected_rows > 0 ? "Utente eliminato" : "Utente non trovato"]);
                        break;

                    default:
                        respond(["message" => "Tabella non valida"]);
                }
                break;

            default:
                respond(["message" => "Metodo richiesta non valido"]);
        }
    } catch (Exception $e) {
        respond(["error" => "Errore: " . $e->getMessage()]);
    } finally {
        $conn->close();
    }