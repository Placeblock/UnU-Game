import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service';

@Injectable({
  providedIn: 'root'
})
export class GameGuardGuard implements CanActivate {
  constructor(private gameService: GameService, private authService:AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const gameid = route.paramMap.get("gameid");
    if(gameid != null) {
      this.authService.gameid = gameid;
    }
    if (this.gameService.getCurrentRoom() == undefined) {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
  
}
