const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });

var PublicKey = key.exportKey();
var PrivateKey = key.exportKey();

let key_public = new NodeRSA(PublicKey);
let key_private = new NodeRSA(PrivateKey);

const ToCrypte = (text) => {
  const encrypted = key_public.encrypt(text, "base64");
  return encrypted;
};

const ToDecrypte = (dec) => {
  const decrypted = key_private.decrypt(dec, "utf8");
  return decrypted;
};

const VerifyKey = (key) => {
  let toVerif = new NodeRSA(key);
  const verif = toVerif.verify();
  return verif;
};

module.exports = { ToCrypte, ToDecrypte, VerifyKey, PrivateKey };
