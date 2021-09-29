const crypto = require('crypto');

const PKCS7Encoder = new Object({
    decode: function(text) {
        var pad = text[text.length - 1];
    
        if (pad < 1 || pad > 16) {
            pad = 0;
        }
    
        return text.slice(0, text.length - pad);
    },

    encode: function(text) {
        var blockSize = 16;
        var textLength = text.length;
        var amountToPad = blockSize - (textLength % blockSize);
    
        var result = new Uint8Array(amountToPad);
        result.fill(amountToPad);
    
        return Buffer.concat([text, result]);
    }
})

const decryptAES = function(text, key) {
    key = crypto.createHash('sha256').update(key).digest();
    var iv = new Uint8Array(16);
    iv.fill(0);
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    decipher.setAutoPadding(false);
    var deciphered = Buffer.concat([decipher.update(text, 'base64'), decipher.final()]);
    deciphered = PKCS7Encoder.decode(deciphered);
    return deciphered.toString();
};

const tripleDes = (key, str) => {
    const keyAscii = strToAscii(key);

    const md5 = crypto.createHash("MD5");
    const bytes = Buffer.from(keyAscii, 'utf-8');

    const md5Hash = md5.update(bytes).digest();
    const md5HashButLonger = Buffer.concat([md5Hash], 24);

    var i2 = 16;
    for (var i3 = 0; i3 < 8; i3++) {
        md5HashButLonger[i2] = md5HashButLonger[i3];
        i2++;
    } 

    const cipherKey =  md5HashButLonger;
    var iv = new Buffer.alloc(0);
    var cipher = crypto.createCipheriv('des-ede3', cipherKey, iv);
    var cipher2 = cipher.update(str, 'utf8', 'base64');
    cipher2 += cipher.final('base64');

    return Buffer.from(cipher2, 'base64').toString('base64');
}

const strToAscii = (str) => {
    return str.split('')
            .map((char) => {return char.charCodeAt(0)})
            .reduce((result,current) => result + current.toString());
}

const salt = (str) =>{
    const format = `${str.charAt(0)}${str.charAt(4)}${str.charAt(6)}${str.charAt(8)}`
    const date = new Date().getDate();

    const bruh = parseInt(format) * date;
    const str2 = bruh + format;
    let i = 0;
    for(let j = 0; j < str2.length; j++){
        i += parseInt(str2.charAt(j));
    }

    const result = bruh + "-" + i;
    console.log(result);
    return result;
}

function generatePresensiPayload(id, token, encryptedKeyMessage, encryptedKeyMessageKey){
    const str = `${token};${id};${salt(id)}`;
    
    try {
        var key = decryptAES(encryptedKeyMessage, encryptedKeyMessageKey);
    } catch (error) {
        return error;
    }

    return tripleDes(key,str);
}

module.exports = {
    generatePresensiPayload : generatePresensiPayload
}