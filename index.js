var ToDoScanner = require('./src/lib')

var params = process.argv.slice(2);

var path_params = params[0];

var scanner = new ToDoScanner(path_params);

scanner.start()