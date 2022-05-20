const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });

var PublicKey = key.exportKey("public");
var PrivateKey = key.exportKey("private");

//let key_public = new NodeRSA(PublicKey);

const ToCrypte = (key,text) => {
  let key_public = new NodeRSA(key);
  console.log(PublicKey);
  const encrypted = key_public.encrypt(text, "base64");
  return encrypted;
};

const ToDecrypte = (key,dec) => {
  let key_private = new NodeRSA(key);
  const decrypted = key_private.decrypt(dec, "utf8");
  return decrypted;
};


module.exports = { ToCrypte, ToDecrypte, PrivateKey, PublicKey };
