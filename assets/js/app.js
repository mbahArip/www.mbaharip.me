var _firebase = new googleFirebase();

var _index = new index();
var _details = new details();

var _modal = new modal();
var _utility = new Util();

async function global__init() {
    _firebase.init();
}

async function home__init() {
    global__init();
    _firebase.getWorks();
    _utility.footer();
}

async function works__init() {
    global__init();
    _utility.footer();
}

async function details__init() {
    global__init();
    _details.populateData();
    _utility.footer();
}