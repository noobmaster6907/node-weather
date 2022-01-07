const request = require('request');

const geoCode = (address, callback) => {
    const url ='http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJhbmphbDEyMzQ1IiwiYSI6ImNreDB3eWIzYTA2aGUyb3J6NGdmb3h0bm4ifQ.FPhz2XVmchzHUUqqL8jU3A&limit=1'
    request({url, json: true}, (error,{body} = {}) => {
    

        if(error){
           callback('Unable to connect to location services!',undefined);
        } else if (body.features.length === 0){
            callback('Location not found.',undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

//destructuring response.body to body

module.exports = geoCode;