import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GameService } from '../services/game.service';

@Injectable({
  providedIn: 'root'
})
export class GameGuardGuard implements CanActivate {
  constructor(private gameService: GameService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const gameid = route.paramMap.get("gameid");
    if(gameid != null) {
      this.gameService.setAuthGameName(gameid);
    }
    if (this.gameService.getCurrentRoom() == undefined) {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
  
}
