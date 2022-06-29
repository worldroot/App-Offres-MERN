const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });

var PublicKey = key.exportKey("public");
var PrivateKey = key.exportKey("private");


const ToCrypte = (key, text) => {
  try {
    let key_public = new NodeRSA(key);
    const encrypted = key_public.encrypt(text, "base64");
    return encrypted;
  } catch (error) {
    console.log(error);
  }
};

const ToDecrypte = (key, dec) => {
  try {
    let key_private = new NodeRSA(key);
    const decrypted = key_private.decrypt(dec, "utf8");
    return decrypted;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { ToCrypte, ToDecrypte, PrivateKey, PublicKey };
