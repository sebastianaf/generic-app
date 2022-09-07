import CryptoJS from "crypto-js";
import { AES, SHA256 } from "crypto-js";
import jwt from "jsonwebtoken";
require("dotenv").config();

const decrypt = (token) => {
  let decryptedToken = AES.decrypt(
    token,
    SHA256(process.env.API_TOKEN).toString()
  ).toString(CryptoJS.enc.Utf8);
  const decodedToken = jwt.decode(`${decryptedToken}`, process.env.API_TOKEN);
  return decodedToken;
};

const encrypt = (token) => {
  let encryptedToken = AES.encrypt(
    token,
    SHA256(process.env.API_TOKEN).toString()
  ).toString();
  return encryptedToken;
};

export { decrypt, encrypt };
