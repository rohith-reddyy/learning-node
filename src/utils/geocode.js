const request = require('request');

const geocode = function(place, callback){
   var  url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1Ijoicm9oaXRyZWRkeTA0NCIsImEiOiJjazNyaWx2a3YwYnB4M2RtbnducHZkanowIn0._Fq7TfXnEmgzQtCx7n8dCg`;
   request(url, {json:true}, (error, response)=>{
       if(response.body){
         callback(response.body);
       }else if(error){
           console.log(error);
       }
   })
}

module.exports ={
    geocode:geocode
}
