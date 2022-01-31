import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/round/user-info/user-info.component';
import { UserInfosComponent } from './components/round/user-infos/user-infos.component';
import { UnocardComponent } from './components/round/unocard/unocard.component';
import { TimesPipe } from './pipes/times.pipe';
import { InventoryComponent } from './components/round/inventory/inventory.component';
import { TypeofPipe } from './pipes/typeof.pipe';
import { CastPipe } from './pipes/cast.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UnocardanimationDirective } from './directives/unocardanimation.directive';
import { DrawpileComponent } from './components/round/drawpile/drawpile.component';
import { RoundComponent } from './components/round/round/round.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomComponent } from './components/room/room.component';
import { NgParticlesModule } from "ng-particles";
import { TooltipModule } from 'ng2-tooltip-directive';
import { RoundSettingsComponent } from './components/room/roundsettings/roundsettings.component';
import { SwitchComponent } from './components/shared/switch/switch.component';
import { CounterInputComponent } from './components/shared/counter-input/counter-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserInfoComponent,
    UserInfosComponent,
    UnocardComponent,
    TimesPipe,
    InventoryComponent,
    TypeofPipe,
    CastPipe,
    UnocardanimationDirective,
    DrawpileComponent,
    RoundComponent,
    RoomComponent,
    RoundSettingsComponent,
    SwitchComponent,
    CounterInputComponent
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
