// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/************************************************************ Show dev tools */

// require('nw.gui').Window.get().showDevTools();

/************************************************************** Node example */

function leNode() {
    var fs = require('fs');
    var listing = document.getElementById('listing');
    fs.readdir('.', function(err, files) {
        if (err) {
            listing.innerHTML = 'Error: ' + err;
        } else {
            var ul = document.createElement('ul');
            for (var i = 0; i < files.length; i++) {
                var li = document.createElement('li');
                li.innerHTML = files[i];
                ul.appendChild(li);
            }
            listing.appendChild(ul);
        }
    });
}

/**************************************************************** DB example */

function leDb() {
    var Datastore = require('nedb');
    var db = new Datastore({
        filename : getUserDataPath() + '/dudes.db',
        autoload: true
    });
    var listing = document.getElementById('listing');

    getAllTheThings();

    var buttonForm = document.getElementById('submit');
    buttonForm.addEventListener('click', function() {
        saveUser(getValueAndClearInput('firstName'), getValueAndClearInput('lastName'));
    });

    function getValueAndClearInput(id) {
        var input = document.getElementById(id);
        var value = input.value;
        input.setAttribute('value', '');
        return value;
    }

    function saveUser(firstName, lastName) {
        db.insert({
            firstName: firstName,
            lastName: lastName
        }, function(err, newDoc) {
            if (err) {
                console.log(err);
            } else {
                showUser(newDoc);
            }
        });
    }

    function showUser(dude) {
        console.log(dude);
        var li = document.createElement('li');
        li.innerHTML = dude.firstName + ' ' + dude.lastName;
        listing.appendChild(li);
    }

    function getAllTheThings() {
        db.find({}, function(err, docs) {
            for (var i = 0; i < docs.length; i++) {
                showUser(docs[i]);
            }
        });
    }
}

function getUserDataPath() {
    var path = require('path');
    return path.dirname(process.execPath);
}

/************************************************************** File example */

function leFileUpload() {
    var files;
    var listing = document.getElementById('listing');
    var dropbox = document.getElementById('dropbox');
    dropbox.addEventListener('dragenter', dragenter, false);
    dropbox.addEventListener('dragover', dragover, false);
    dropbox.addEventListener('drop', drop, false);

    function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        files = dt.files;

        document.querySelector('.pure-button-disabled').classList.remove('pure-button-disabled');

        dropbox.style.display = 'none';

        var buttonForm = document.getElementById('submitFile');
        buttonForm.addEventListener('click', sendToFtp);
    }


    function sendToFtp() {
        var Client = require('ftp');
        var c = new Client();

        var port = document.getElementById('port').value;

        var options = {
            host: document.getElementById('server').value,
            port: port,
            user: document.getElementById('login').value,
            password: document.getElementById('password').value,
            secure: port == 22
        };

        console.log(options);

        c.on('ready', function() {

            var folder = document.getElementById('folder').value;

            for (var i=0; i<files.length; i++) {
                var file = files[i];
                sendFile(c, file.path, folder, file.name);
            }

        });

        c.connect(options);

    }

    function sendFile(c, path, folder, name) {

        c.put(path, folder + '/' + name, function(err) {
            if (err) {
                logFile('upload ' + name + ' ko: ' + err + '<br/>');
            } else {
                logFile('upload ' + name + ' ok !<br/>');
            }
            c.end();
        });


        function logFile(msg) {
            var li = document.createElement('li');
            li.innerHTML = msg;
            listing.appendChild(li);
        }
    }
}