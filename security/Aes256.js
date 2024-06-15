
import crypto from 'crypto'

export const Aes256 = {
    encryptUsingAES256,
    decryptUsingAES256
};

const key = Buffer.from('bf3c199c2470cb477d907b1e0917c17b'); // 32-byte key
const iv = Buffer.from('5183666c72eec9e4'); // 16-byte IV

function encryptUsingAES256(val) {
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

function decryptUsingAES256(encrypted) {
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
}