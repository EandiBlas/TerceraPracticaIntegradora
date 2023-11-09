import {dirname} from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"
export const __dirname=dirname(fileURLToPath(import.meta.url))

export const hashData = async (data) => {
    return bcrypt.hash(data, 10)
}

export const compareData = async (data, hash) => {
    return bcrypt.compare(data, hash)
}

export const generateResetToken = () => {
    const tokenLength = 20; // Longitud del token
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
  
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
  
    return token;
};