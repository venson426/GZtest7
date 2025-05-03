import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";

const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCDifj76LBy4GDaYfYFDKTXIADmuBAsCKLqAe+eCyCJU91Fby6EUoTYp4Id5GUtdvKnBoMY1KoMdTVdu+fAz1dRy71WsLgOUftIburIk6cVKzLNLj70kgBXtbg7h1a1WXY+Ht7xC2dP1QY5Y+B8l83YE1UFMwo5rgO96x6j4RJvjwIDAQAB";
const privateKey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKRFsha+yhkMhBRTN7cQgrNCRiWrkMP5BjJiDa30mjvOkOOm8OB2x6lgBjEQ8PjSAIwcrkLdxDektVEeXlWzOSVETpyI8li/OsmrAi5DGn6p9SfhpdNl2nRkPPAgTefcbOvTQXG+3pUuvqX+Gt4hw8t6j1rAA2VH3gq7KKh+rGXTAgMBAAECgYAaTH4iXhEEyZgrmNcGm8IQ6L9KMJlQhoGTd1cxTkOS55MSnxtZFCsK1rCnEktByn0D8WOEmPRc5CWTAwWfOr4fEwhkVivro/MtmArxiP6s5u2B88ysqQ5oBXUSNNOtvJuNLoLO6wmKca64hh82KH50rZ/XzaqtocdpD5B8fPvkgQJBAOkpxTRe3gUACJ8aFy7kcS6EyAxgL9nkgLamjumiGsf8DZioXoCyAG4IvFJAz4Pa4qDqGIdgl0tuXWo793dW23ECQQC0XJXHilvKwJ8A9mYJkVu3gCntUI8CRcLI42SVS5q2UyeSiL3MqAGw+AfO/ltWEASQ7BSCKhfCVwNTOqvR8EuDAkEAmj0IeBldcx9PlLf0qA90E5rAnvcuEEyJHMpXdZPHdY12DQsr4KRfhmp+8UZwP8AW9O2Gpl8uFjb+0pyymh458QJAIxdscOFjkKQ/i4FlQvFMJfzCq5Cj8m4+QrWzaTTHijfNmD4Qp5P8mED5y/VDMhB1wvib2ON1sfMaC4R7z6HwHwJAf8N432Zj0/LHlr6uEK1WYc90YlVH7SJzCgXMzxXTD/bD3+aJIW/4K5QWo2hGf0bC7kHOcHJz2V0hIH44D+Lo8Q==";

export function getRSAData_de(response) {
    const RSADecrypt = new JSEncrypt();
    RSADecrypt.setPrivateKey(privateKey);
    const RSAData_de = RSADecrypt.decrypt(response.data.secretKey);

    return RSAData_de;
}


export function decrypt(e, t) {
    var n = CryptoJS.lib.WordArray.create([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        o = CryptoJS.enc.Utf8.parse(t),
        r = CryptoJS.AES.decrypt(e, o, {
            iv: n,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return CryptoJS.enc.Utf8.stringify(r).toString();
}