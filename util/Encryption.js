const { createHash, createCipheriv, randomBytes, createDecipheriv } = require("crypto");

function hash(userid, salt) {
    return createHash("sha256")
        .update(userid + salt)
        .digest("hex")
        .substr(0, 32);
}

function encrypt(key, msg) {
    const iv = randomBytes(16);
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    const encMsg = cipher.update(msg, "utf8");
    const enc = cipher.final();
    const tag = cipher.getAuthTag();

    return Buffer.concat([encMsg, enc, iv, tag]).toString("hex");
}

function decrypt(key, str) {
    str = Buffer.from(str, "hex");

    const msg = str.slice(0, str.length - 32);
    const iv = str.slice(str.length - 32, str.length - 16);
    const tag = str.slice(str.length - 16);
    const decipher = createDecipheriv("aes-256-gcm", key, iv);

    decipher.setAuthTag(tag);
    let dencMsg = decipher.update(msg);
    dencMsg += decipher.final("utf8");

    return dencMsg;
}

module.exports = {
    hash: hash,
    encrypt: encrypt,
    decrypt: decrypt,
};
