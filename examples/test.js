// Run following command to install async
// npm install async

var fs = require('fs'),
	async = require('async'),
	jsonpath = require('../json-path')

var files = ['samples.json'];

async.map(files, fs.readFile, function (err, data) {
	var instances = {},
		valuePath = "$.InstanceId",
        aliasPath = "$.Tags[?(@.Key == 'Name')].Value",
		value,
		alias,
		j,
		i;

	for (j = 0; j < files.length; ++j) {
		instances = JSON.parse(data[j].toString()).instances;

		var t0 = process.hrtime();

		for (i = 0; i < instances.length; ++i) {
			value = jsonpath(instances[i], valuePath);
			alias = jsonpath(instances[i], aliasPath);
			console.log(value.toString() + ": " + alias.toString());
		}

		var t1 = process.hrtime();
		console.log("Parse samples.json took: " + ((t1[0] * 1000 - t0[0] * 1000) + (t1[1]/1000000 - t0[1]/1000000)).toString() + " milliseconds.");
	}
});