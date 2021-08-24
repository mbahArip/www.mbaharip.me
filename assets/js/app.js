var _firebase = new googleFirebase();

var _index = new index();

var _modal = new modal();
var _utility = new Util();

async function global__init() {
    _firebase.init();
    _index.imageLoad();
}

async function home__init() {
    global__init();
    _firebase.getWorks();
    _utility.footer();
}