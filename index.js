const fs = require('fs');
const axios = require('axios').default;

function readConfigFile(path= '') {
    fs.readFile(path || "./paymob-config.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            return JSON.parse(jsonString);
        } catch (err) {
            console.log("Error parsing JSON string:", err);
            return;
        }
    })
}

module.exports.auth = function (path = '') {
    let config = readConfigFile(path);
    if(config){
        axios.post('https://accept.paymob.com/api/auth/tokens', {
                "api_key": config.apiKey
            })
            .then(function (response) {
                const {token, profile} = response.data;
                console.log('profile', profile)
                return token;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}




