import { Injectable } from '@angular/core';
import { RemoteConfig } from '@angular/fire/remote-config';
import {
  fetchAndActivate,
  getStringChanges,
} from '@angular/fire/remote-config';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  /**
   * Constructor for RemoteConfigService.
   *
   * @param {RemoteConfig} remoteConfig - The RemoteConfig service from Firebase used to manage remote configurations.
   */
  constructor(private remoteConfig: RemoteConfig) {}

  /**
   * Activates the Firebase Remote Config and fetches new values.
   *
   * This method sets the `minimumFetchIntervalMillis` to 0 to ensure that remote config is fetched on every call.
   * It returns an observable that emits `true` when the fetch and activation are successful.
   *
   * @returns {Observable<boolean>} An observable that emits `true` when the remote config is fetched and activated.
   */
  public activateRemoteConfig(): Observable<boolean> {
    this.remoteConfig.settings.minimumFetchIntervalMillis = 0;
    return from(fetchAndActivate(this.remoteConfig));
  }

  /**
   * Retrieves a boolean value from Firebase Remote Config.
   *
   * This method listens for changes to the specified key in the Remote Config and maps the string value
   * to a boolean. If the value is `"true"`, it returns `true`, otherwise it returns `false`.
   *
   * @param {string} key - The key in the Remote Config whose boolean value should be retrieved.
   * @returns {Observable<boolean>} An observable that emits a boolean value based on the remote config.
   */
  public getBooleanValue$(key: string): Observable<boolean> {
    return getStringChanges(this.remoteConfig, key).pipe(
      map(value => value === 'true')
    );
  }
}
