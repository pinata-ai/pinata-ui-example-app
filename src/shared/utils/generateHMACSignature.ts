import CryptoJS from "crypto-js";

export function generateHMACSignature(payload: string, secret: string): string {
    const hmac = CryptoJS.HmacSHA256(payload, secret);
    return CryptoJS.enc.Base64.stringify(hmac);
}
