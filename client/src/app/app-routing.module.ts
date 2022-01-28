import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { GameComponent } from './components/game/game.component';
import { LoginComponent } from './components/login/login.component';
import { GameGuardGuard } from './guards/game-guard.guard';
import { PlayerGuard } from './guards/player.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'create', component: CreateComponent, canActivate: [PlayerGuard]},
  { path: ':gameid', component: GameComponent, canActivate: [GameGuardGuard, PlayerGuard]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
