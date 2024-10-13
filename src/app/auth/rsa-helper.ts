import { Injectable } from '@angular/core';
import * as Forge from 'node-forge';

@Injectable({
  providedIn: 'root',
})
export class RSAHelper {
  publicKey: string = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDKzH7x6V1SHP1uzrcjjp3Eba/J
pXCjlF19RsyuxUXxCxOufCxgcGv1PfMXWpjiCRT3Pg/AhwSs9y+atEAwva1/mwdN
k3hOGVftRyEEywyT1vfk9Dq94sUrdFQvzOAPSwaKZIVHMJjBnIeA2Vl8oLiW/31B
ORbBgFsOTg+alr16RwIDAQAB
-----END PUBLIC KEY-----`;

  constructor() {}

  encryptWithPublicKey(valueToEncrypt: string): string {
    const rsa = Forge.pki.publicKeyFromPem(this.publicKey);
    return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
  }
}