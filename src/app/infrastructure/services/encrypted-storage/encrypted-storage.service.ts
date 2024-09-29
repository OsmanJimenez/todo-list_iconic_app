import { Injectable, Inject } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ENCRYPTION_KEY } from './encryption-key.token';

@Injectable({
  providedIn: 'root',
})
export class EncryptedStorageService {
  /**
   * Constructor for EncryptedStorageService.
   *
   * @param {string} encryptionKey - The encryption key used to encrypt and decrypt data in local storage.
   */
  constructor(@Inject(ENCRYPTION_KEY) private encryptionKey: string) {}

  /**
   * Encrypts and saves a value to local storage.
   *
   * The value is first converted to a JSON string, then encrypted using AES encryption before being stored.
   *
   * @param {string} key - The local storage key under which the encrypted value will be saved.
   * @param {any} value - The value to be encrypted and saved (can be any type).
   * @returns {void}
   */
  public save(key: string, value: any): void {
    const encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      this.encryptionKey
    ).toString();
    localStorage.setItem(key, encryptedValue);
  }

  /**
   * Retrieves and decrypts a value from local storage.
   *
   * If the value exists, it is decrypted and parsed back into its original type.
   *
   * @template T The expected return type of the decrypted value.
   * @param {string} key - The local storage key from which to retrieve the encrypted value.
   * @returns {T | null} The decrypted value, or null if the key does not exist in local storage.
   */
  public get<T>(key: string): T | null {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      const decryptedValue = CryptoJS.AES.decrypt(
        encryptedValue,
        this.encryptionKey
      ).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedValue) as T;
    }
    return null;
  }

  /**
   * Removes an item from local storage.
   *
   * This method deletes the item associated with the specified key.
   *
   * @param {string} key - The local storage key to remove.
   * @returns {void}
   */
  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
