
import crypto from 'crypto'

export const Aes256 = {
    encryptUsingAES256,
    decryptUsingAES256
};

function encryptUsingAES256(val) {
    let cipher = crypto.createCipheriv(`${process.env.BASE_URL}/doctor/saveDoctor`, process.env.key, process.env.iv);
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

function decryptUsingAES256(encrypted) {
    let decipher = crypto.createDecipheriv(process.env.secret, process.env.key, process.env.iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
}