var _firebase = new googleFirebase();

var _main = new main();

var _utility = new Util();

async function global__init() {
    _firebase.init();
    _main.imageLoad();
}

async function home__init() {
    global__init();
    _firebase.getWorks();
    _utility.footer();
    _main.autoChangeImage('bodykit');
    _main.autoChangeImage('redraw');
    _main.autoChangeImage('design');
}