import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserInfosComponent } from './components/user-infos/user-infos.component';
import { UnocardComponent } from './components/unocard/unocard.component';
import { TimesPipe } from './pipes/times.pipe';
import { InventoryComponent } from './components/inventory/inventory.component';
import { TypeofPipe } from './pipes/typeof.pipe';
import { CastPipe } from './pipes/cast.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardstackComponent } from './components/cardstack/cardstack.component';
import { UnocardanimationDirective } from './directives/unocardanimation.directive';
import { DrawpileComponent } from './components/drawpile/drawpile.component';
import { GameComponent } from './components/game/game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './components/create/create.component';

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
    CardstackComponent,
    UnocardanimationDirective,
    DrawpileComponent,
    GameComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
