// Import
import {database} from "./components/database.js";
import { searchBarComponent } from "./components/searchBar.js";
import { navBarComponent} from "./components/navBar.js";
import { generateLoginComponent } from "./components/formLogin.js";
import { createNavigator } from "./components/navigator.js";
import {pubSub} from "./components/pubsub.js";
import { content } from "./components/content.js";
import {sideBarComponent} from"./components/sideBar.js";
import { user } from "./components/user.js"
import { doc } from "./components/doc.js"

// Variabili
const pubsub = pubSub();
const db = database();
const navigator = createNavigator(document.querySelector("#pages"));
const navbar = navBarComponent(document.getElementById("nav-bar"));
const search = searchBarComponent(document.querySelector("#search-bar"),pubsub);
const credential =  generateLoginComponent(document.querySelector("#modalbody"), pubsub);
const homeContent = content(document.getElementById("pages"), pubsub);
const accountSidebar  = sideBarComponent("sidebarAccount", pubsub);
const docSidebar  = sideBarComponent("sidebarContent", pubsub);
const documentation = doc(document.getElementById("docsPage"), pubsub);
let utente;

// Build
homeContent.build(await db.content6rand());
documentation.build(await db.getDocs());

// Render
search.render();
navbar.render(true);
credential.renderFormLogin();
homeContent.homePage();

// PubSub
pubsub.publish("sidebar", await db.sidebar());
pubsub.subscribe("loginComplete", async (data)=>{
    let response = await db.login(data.email, data.password);
    if(response.error) return;
    utente = user(document.getElementById("userPage"), response, pubsub);
    utente.renderAccount();
    accountSidebar.render();
    location.href="#user";
})
pubsub.subscribe("register", async (data)=>{
    console.log(data)
    let r = await db.register(data.email, data.password, data.name, data.dateOfBirth, data.class, data.role);
    console.log(r)
    if(r.error) return;
    let response = await db.login(data.email, data.password);
    console.log(response)
    if(response.error) return;
    utente = user(document.getElementById("userPage"), response, pubsub);
    utente.renderAccount();
    accountSidebar.render();
    location.href="#user";
})
pubsub.subscribe("search", async (data)=>{
    let response = await db.searchbar(data);
    homeContent.filter(response);
})
pubsub.subscribe("searchFailed", ()=> homeContent.homePage());
pubsub.subscribe("modifyAccount", async (data) => {
   let response = await db.updateAccount(data.column, data.email, data.value);
   pubsub.publish("confirmModifyAccount");
});
pubsub.subscribe("approverContent", async () => {
    let response = await db.approverContent();
    pubsub.publish("confirmApproverContent",response);
 });
 pubsub.subscribe("loadVersions", async (id) => {
    let response = await db.getVersions(id);
    pubsub.publish("confirmVersions",response);
 });
 pubsub.subscribe("adminContent", async () => {
    let response = await db.confirms();
    pubsub.publish("confirmAdminContent",response);
 });
 pubsub.subscribe("loadVersionDetail", async (data) => {
    let response = await db.getVersion(data.id, data.version);
    pubsub.publish("confirmVersion",response);
 });
 pubsub.subscribe("confirmUsers", async (data) => {
    let response = await db.updateConfirms( data.email);
    //pubsub.publish("updateConfirmUsers");
 });
 pubsub.subscribe("deleteUsers", async (data) => {
    let response = await db.deleteUsers( data.email);
    console.log(response);
    //pubsub.publish("updateConfirmUsers");
 });
pubsub.subscribe("saveDoc", async (data) => {
    const {title, description, content, author_email} = data;
    let response = await db.createContent(title, description, content, author_email);
    console.log(response);
    location.href="#home";
});

pubsub.subscribe("updateVersionStatus", async ({ id, version, newStatus }) => {
       let response = await db.updateVersionStatus(Number(id), Number(version), Number(newStatus));
       console.log(id, version, newStatus);
       console.log(response);
});

