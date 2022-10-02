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
          console.log("config [api-key] is:", config.apiKey); // => "Customer address is: Infinity Loop Drive"
        } catch (err) {
          console.log("Error parsing JSON string:", err);
        }
    });
}




