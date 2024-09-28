import { Injectable, Inject } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ENCRYPTION_KEY } from './encryption-key.token';

@Injectable({
  providedIn: 'root',
})
export class EncryptedStorageService {
  constructor(@Inject(ENCRYPTION_KEY) private encryptionKey: string) {}

  save(key: string, value: any): void {
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), this.encryptionKey).toString();
    localStorage.setItem(key, encryptedValue);
  }

  get<T>(key: string): T | null {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, this.encryptionKey).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedValue) as T;
    }
    return null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
