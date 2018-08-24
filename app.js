var request = require("request");
var fs = require('fs');
var apiUrl = "http://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/(mail=grodri@br.ibm.com).list/byjson?serialnumber&preferredidentity&callupname&jobresponsibilities&telephonenumber&co";
var string = "Serial Number, Intranet ID, Full Name, Job Responsibilities, Phone Number, Country\n";

request.get(apiUrl, (error, response, body) => {
  if (error) {
    return console.dir(error);
  }

  var jsonData = JSON.parse(body);
  var serialNumber = jsonData.search.entry[0]['attribute'][0]['value'];
  var preferredIdentity = jsonData.search.entry[0]['attribute'][1]['value'];
  var callupName = jsonData.search.entry[0]['attribute'][2]['value'];
  var jobResponsibilities = jsonData.search.entry[0]['attribute'][3]['value'];
  var telephoNenumber = jsonData.search.entry[0]['attribute'][4]['value'];
  var country = jsonData.search.entry[0]['attribute'][5]['value'];

  string += serialNumber + "," + preferredIdentity +"," + callupName + "," + jobResponsibilities + "," + telephoNenumber + "," + country + "\n";

  console.log(string);

  fs.writeFile("bpUsersData.csv", string, function(error){
    if (error) return console.log(error);
    console.log("Done!");
  });



});
