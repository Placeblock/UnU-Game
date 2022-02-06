import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextTimerComponent } from './next-timer.component';

describe('NextTimerComponent', () => {
  let component: NextTimerComponent;
  let fixture: ComponentFixture<NextTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
