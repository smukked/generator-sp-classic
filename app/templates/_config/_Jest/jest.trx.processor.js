var builder = require('jest-trx-results-processor');

var fs = require('fs');
if (!fs.existsSync("./Reports")) {
    fs.mkdirSync("./Reports");
}

var processor = builder({
    outputFile: './Reports/testresults.trx'
});

module.exports = processor;