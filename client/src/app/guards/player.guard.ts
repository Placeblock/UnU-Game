import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoomState } from '../states/room-state.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerGuard implements CanActivate {
  constructor(private roomState: RoomState, private router: Router) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.roomState.me == null) {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
  
}
