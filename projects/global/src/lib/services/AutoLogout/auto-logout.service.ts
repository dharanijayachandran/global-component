import { Injectable, OnDestroy } from "@angular/core";
import { Router } from '@angular/router';
const MINUTES_UNITL_AUTO_LOGOUT = 1 // in mins
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY = 'lastAction';
@Injectable()
export class AutoLogoutService implements OnDestroy {
  currentSigOnTime: any;
  userId: string;
  inter: NodeJS.Timeout;
  public getLastAction() {
    return parseInt(localStorage.getItem("lastAction"));
  }
  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router) {
    // this.check();
    //this.initListener();
    //this.initInterval();
    // localStorage.setItem(STORE_KEY, Date.now().toString());
  }

  ngOnDestroy() {
    clearInterval(this.inter);
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    this.inter = setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }
  getSignOnHistoryByUserId(userId: string) {
    /* this.logoutService.getSignOnHistoryByUserId(userId).subscribe(res => {
      this.currentSigOnTime = res;
      // 
    },
      error => {
        
      }
    ) */
  }
  check() {
    this.userId = sessionStorage.getItem('userId');
    const now = Date.now();
    let lastAction = this.getLastAction();
    const timeleft = lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;
    if (this.currentSigOnTime != null || this.userId != undefined || this.userId != null) {
      if (isTimeout) {
        alert("session expired");
        this.logout();
        localStorage.clear();
        this.router.navigate(['']);
      }
    }
  }


  logout() {
    this.userId = sessionStorage.getItem('userId');
    /* this.logoutService.logout(this.userId).subscribe(response => {
      localStorage.clear();
      localStorage.removeItem('pagemenu');
      sessionStorage.clear();
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userName');
      this.router.navigate(['']);
    },
      error => {
        
    );
  } */
  }
}
