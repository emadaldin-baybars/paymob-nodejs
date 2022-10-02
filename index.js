const fs = require('fs')

module.exports.converter = function (sentence){
    let capitalized = []
    let words = sentence.split(" ") //split the sentence into words
    words.forEach(word => { 
        let capitalizedWord = word.slice(0, 1).toUpperCase();
        word.slice(1) //capitalize the first letter of every word
        capitalized.push(capitalizedWord)         
    })
    let converted = capitalized.join(" ") 
    return converted
}

module.exports.readConfigFile = function (path = '') {
    fs.readFile(path || "./paymob-config.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("Error reading file from disk:", err);
          return;
        }
        try {
          const config = JSON.parse(jsonString);

          fetch('https://accept.paymob.com/api/auth/tokens', {
                method: 'POST',
                body: JSON.stringify({
                    "api_key": config.apiKey
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(json => console.log(json));

        } catch (err) {
          console.log("Error parsing JSON string:", err);
        }
    });
}




