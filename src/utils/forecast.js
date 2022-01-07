const request= require('request');

const forecast= (lat, lon, callback) => {
    const url= 'http://api.weatherstack.com/current?access_key=b80d884e214fed47a9a680ff1b012e62&query=' + lat + ',' + lon
  
    request({url, json: true},(error, {body}) => {
        if(error){
            callback('Unable to connect to the Network.', undefined);
        } else if(body.error){
            callback('Incorrect Coordinates.', undefined);
        } else {
            callback(undefined, "It is currently "+ body.current.temperature + " degrees. The weather is " +
                     body.current.weather_descriptions[0] + '.' + 
                    ' There is a ' + body.current.precip  +'% chance of rain. Humidity is ' + body.current.weather_descriptions.humidity + ', wind speed is ' + body.current.weather_descriptions.wind_speed + '.');
        }
    })
}


module.exports= forecast;