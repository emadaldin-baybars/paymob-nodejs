const fs = require('fs');
const axios = require('axios').default;

async function readConfigFile(path= '') {
    const _p = path || "./paymob-config.json";
    console.log('_p', _p)
    await fs.readFile(_p , "utf8", (err, jsonString) => {
        console.log('jsonString', jsonString)
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        
        return jsonString
    })
}

module.exports.auth = async function (path = '') {
    const config = await readConfigFile(path);
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




