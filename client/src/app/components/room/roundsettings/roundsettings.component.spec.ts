import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundSettingsComponent } from './roundsettings.component';

describe('CreateroundComponent', () => {
  let component: RoundSettingsComponent;
  let fixture: ComponentFixture<RoundSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
