import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoomState } from '../states/room-state.service';

@Injectable({
  providedIn: 'root'
})
export class GameGuardGuard implements CanActivate {
  constructor(private roomState: RoomState, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const gameid = route.paramMap.get("gameid");
    if(gameid != null) {
      this.roomState.authname = gameid;
    }
    if (this.roomState.authname == "") {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
  
}
