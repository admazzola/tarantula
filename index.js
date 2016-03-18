var request = require("request");
var Slack = require('node-slack');
var fs =  require('fs');


var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));


var options = null;


var slack = new Slack(config.slack_webhook_url,options);


console.log('Tarantula bot started.');
crawl();


var interval = setInterval(function() {
  console.log('crawling');
  crawl();

}, config.period*1000);

function crawl()
{
  for(var i in config.tested_domains)
  {
    var domain = config.tested_domains[i];

  request(domain, function(error, response, body) {

   
    if(error || response.statusCode != 200)
    {

      var success = slack.send({
           text: 'Tarantula cannot access '+ domain + '!!' +' Response code: '+ response.statusCode
           //,
           //  channel: '#tarantula',
           //  username: 'TarantulaBot'
         });

        //console.log(success);

      console.log('Tarantula cannot access '+ domain + '!!' +' Response code: '+ response.statusCode)
    }



    });
  }
}
