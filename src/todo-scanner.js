var fs = require('fs');

var ToDoScanner = (function () {
    function ToDoScanner(path) {
        this.rootProject = (path !== undefined) ? path : '.';
    }

    ToDoScanner.prototype.start = function (){

        var rootProject = this.rootProject;
        var dir = fs.readdirSync(rootProject);
        dir.forEach(item => {
            var path = rootProject + '/' + item;
            retrieveData(path);
        })
    }

    retrieveData = function(folderPath) {
        var path = folderPath;
        fs.stat(path, (err, stats) => {
            if (stats.isFile()) {
                readFile(path)
            } else {
                checkIsFileOrFolder(path);
            }
        })
    }

    checkIsFileOrFolder = function(path) {
        var dir = fs.readdirSync(path);
        dir.forEach(item => {
            var itemPath = path + '/' + item;
            fs.stat(itemPath, (err, stats) => {
                if (stats.isFile()) readFile(itemPath)
                if (stats.isDirectory()) retrieveData(itemPath)
            })
        })
    }

    readFile = function(path) {
        fs.readFile(path, (err, data) => {
            var resp = checkToDoIsExist(data.toString());
            if (resp) {
                console.log('found at ' + path)
            }
        });
    }

    checkToDoIsExist = function(string) {
        if (string.indexOf("TODO") > -1) {
            return true;
        }
    }

    return ToDoScanner;
})();

module.exports = ToDoScanner;