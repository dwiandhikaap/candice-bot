const { createHash, createCipheriv, randomBytes, createDecipheriv } = require('crypto');

function hashUserId(userid, salt){
    return createHash('sha256').update(userid+salt).digest('hex').substr(0,32);
}

function encrypt(key, msg){
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const encMsg = cipher.update(msg, 'utf8');
    const enc = cipher.final();
    const tag = cipher.getAuthTag();
    
    return Buffer.concat([encMsg, enc, iv, tag]).toString('hex');
}

function decrypt(key, str){
    str = Buffer.from(str, 'hex');

    const msg = str.slice(0,str.length-32);
    const iv = str.slice(str.length-32, str.length-16);
    const tag = str.slice(str.length-16);
    const decipher = createDecipheriv('aes-256-gcm', key, iv);

    decipher.setAuthTag(tag);
    let dencMsg = decipher.update(msg);
    dencMsg += decipher.final('utf8');

    return dencMsg;
}

module.exports = {
    hashUserId : hashUserId,
    encrypt : encrypt,
    decrypt : decrypt
}

/* const userid = 7895613984137123;

const id = hashUserId(userid, "pog");
const key = hashUserId(userid, "keysalt");
const username = encrypt(key, "20.61.0200");
const password = encrypt(key, "96960");

console.log([userid,key,id,username,password]); 



const dKey = hashUserId(userid, "keysalt");
const dUsername = decrypt(dKey, 'eb804e1ce92e9de4c61b0b42f5d139afa9d246d1e29048e0a3fbf5162205311065a0c2fe9d1e23991b0c')
const dPass = decrypt(dKey, '2a537a376ea790f2cd1e8a258cfc1964a47145a593b49a415d929462af96391e216563ce52')

console.log([dKey, dUsername, dPass]); */