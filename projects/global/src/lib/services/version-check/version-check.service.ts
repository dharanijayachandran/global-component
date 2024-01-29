
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VersionCheckService {
  // this will be replaced by actual hash post-build.js
  private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';
  constructor(private http: HttpClient) { }
  /**
   * Checks in every set frequency the version of frontend application
   * @param url
   * @param {number} frequency - in milliseconds, defaults to 30 minutes
   */
  public initVersionCheck(url, frequency = 3000) {
    setInterval(() => {
      this.checkVersion(url);
    }, frequency);
  }
  /**
   * Will do the call and check if the hash has changed or not
   * @param url
   */
  private checkVersion(url) {
    // timestamp these requests to invalidate caches
    // this.http.get(url + '?t=' + new Date().getTime())
    this.http.get(url).pipe(first()).subscribe({
      next: (response: any) => {
        const hash = response.hash;
        const hashChanged = this.hasHashChanged(this.currentHash, hash);
        if (hashChanged) {
          location.reload();
        }
        this.currentHash = hash;
      },
      error: (err) => {
        console.error(err, 'Could not get version');
      }
    });
  }

  /**
   * Checks if hash has changed.
   * This file has the JS hash, if it is a different one than in the version.json
   * we are dealing with version change
   * @param currentHash
   * @param newHash
   * @returns {boolean}
   */
  private hasHashChanged(currentHash, newHash) {
    if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
      return false;
    }
    return currentHash !== newHash;
  }
}
