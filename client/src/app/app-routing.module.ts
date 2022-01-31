import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RoomComponent } from './components/room/room.component';
import { GameGuardGuard } from './guards/game-guard.guard';
import { PlayerGuard } from './guards/player.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: ':gameid', component: RoomComponent, canActivate: [GameGuardGuard, PlayerGuard]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
