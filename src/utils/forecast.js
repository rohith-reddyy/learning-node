const request = require('request');

const forecast = function(lat, long, callback){
   var  url = `https://api.darksky.net/forecast/5ff0f56d9ec4ae14b091f417cda68da0/${lat},${long}`;
   request(url, {json:true}, (error, response)=>{
       if(response.body){
         callback(response.body);
       }else if(error){
           console.log(error);
       }
   })
}

module.exports ={
    forecast:forecast
}