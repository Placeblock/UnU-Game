import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerlistitemComponent } from './playerlistitem.component';

describe('PlayerlistitemComponent', () => {
  let component: PlayerlistitemComponent;
  let fixture: ComponentFixture<PlayerlistitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerlistitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerlistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
