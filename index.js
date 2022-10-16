const fs = require('fs');
const axios = require('axios').default;

async function readConfigFile(path= '', _f) {
    const _p = path || "./paymob-config.json";
    fs.readFile(_p , "utf8", (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
        }
        
        _f(jsonString);
    })
}

module.exports.auth = async function (path = '') {
    // to read the config file data and get the api key
    const f = (json) =>{
        return json;
    }

    const config = await readConfigFile(path, f);
    console.log('config', config);
    if(config != '' && config != undefined && config != null){
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




