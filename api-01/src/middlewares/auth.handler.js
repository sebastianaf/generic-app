/**
 * 1. Verify if the request is public
 * 2. Verify if the token exist
 * 3. If token exist check the token
 * 4. If token is ok then proceed
 */
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { MD5, AES, SHA256 } from "crypto-js";
import boom from "@hapi/boom";
require("dotenv").config();

const publicRoutes = [`/api/users/login`];

const authHandler = (req, res, next) => {
  try {
    let token = req.headers.token;
    if (publicRoutes.some((e) => e === req.url)) {
      next();
    } else {
      token = AES.decrypt(
        token,
        SHA256(process.env.API_TOKEN).toString()
      ).toString(CryptoJS.enc.Utf8);
      token = jwt.verify(`${token}`, process.env.API_TOKEN);
      if (token) {
        next();
      } else {
        res.send(boom.unauthorized());
        next(boom.unauthorized());
      }
    }
  } catch (error) {
    console.log(error);
    res.send(boom.badRequest());
    next(boom.badRequest());
  }
};

export default authHandler;

/* import boom from "@hapi/boom";
require("dotenv").config();


const authHandler = (req, res, next) => {
  try {
    //if(publicRoutes.some((e)=>{e===req}))

    let token = req.headers.token;
    if (token) {
      token = AES.decrypt(
        token,
        SHA256(process.env.SECRET_TOKEN_SHA256).toString()
      ).toString(CryptoJS.enc.Utf8);
      //const decodedToken = jwt.verify(token, process.env.TOKEN_SIGN);
      //return decodedToken;
      req.headers.token = token;
      console.log(req.headers.token);
      next(); 
    }
    if(){
      
    }
    else {
      res.send(boom.unauthorized("Token error"));
      next(boom.unauthorized());
    }
  } catch (error) {
    res.send(boom.badRequest());
    next(boom.badRequest());
  }
};

export default authHandler;
 */
