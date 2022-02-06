import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/round/user-info/user-info.component';
import { UserInfosComponent } from './components/round/user-infos/user-infos.component';
import { UnocardComponent } from './components/round/unocard/unocard.component';
import { InventoryComponent } from './components/round/inventory/inventory.component';
import { TypeofPipe } from './pipes/typeof.pipe';
import { CastPipe } from './pipes/cast.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoundComponent } from './components/round/round.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomComponent } from './components/room/room.component';
import { NgParticlesModule } from "ng-particles";
import { TooltipModule } from 'ng2-tooltip-directive';
import { RoundSettingsComponent } from './components/room/roundsettings/roundsettings.component';
import { SwitchComponent } from './components/shared/switch/switch.component';
import { CounterInputComponent } from './components/shared/counter-input/counter-input.component';
import { PlayerlistComponent } from './components/shared/playerlist/playerlist.component';
import { PlayerlistitemComponent } from './components/shared/playerlistitem/playerlistitem.component';
import { GameComponent } from './components/game/game.component';
import { NextTimerComponent } from './components/round/next-timer/next-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserInfoComponent,
    UserInfosComponent,
    UnocardComponent,
    InventoryComponent,
    TypeofPipe,
    CastPipe,
    RoundComponent,
    RoomComponent,
    RoundSettingsComponent,
    SwitchComponent,
    CounterInputComponent,
    PlayerlistComponent,
    PlayerlistitemComponent,
    GameComponent,
    NextTimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgParticlesModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
