import {enc, AES, mode, pad} from 'crypto-js';

export default () => {
  const generateRandomHex = length => {
    const characters = '0123456789abcdef';
    let hex = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      hex += characters[randomIndex];
    }

    return hex;
  };

  const encrypt = (text, key) => {
    const iv = generateRandomHex(32);
    const encrypted = AES.encrypt(text, enc.Utf8.parse(key), {
      iv: enc.Hex.parse(iv),
    });

    return {
      iv: encrypted.iv.toString(),
      encryptedData: encrypted.ciphertext.toString(),
    };
  };

  const decrypt = (encrypted, key) => {
    try {
      const base64CipherText = enc.Hex.parse(encrypted.encryptedData).toString(
        enc.Base64,
      );
      const base64Iv = enc.Hex.parse(encrypted.iv).toString(enc.Base64);
      const decrypted = AES.decrypt(base64CipherText, enc.Utf8.parse(key), {
        iv: enc.Base64.parse(base64Iv),
        mode: mode.CBC,
        padding: pad.Pkcs7,
      });

      return decrypted.toString(enc.Utf8);
    } catch (error) {
      return 'Key Salah!';
    }
  };

  return {
    encrypt,
    decrypt,
  };
};
