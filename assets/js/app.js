var _firebase = new googleFirebase();

var _main = new main();

var _utility = new Util();

var DEBUG = false;
if (!DEBUG) {
    if (!window.console) window.console = {};
    var methods = ["log", "debug", "warn", "info"];
    for (var i = 0; i < methods.length; i++) {
        console[methods[i]] = function () {};
    }
}

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