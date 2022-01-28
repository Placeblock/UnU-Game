import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardstackComponent } from './cardstack.component';

describe('CardstackComponent', () => {
  let component: CardstackComponent;
  let fixture: ComponentFixture<CardstackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardstackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardstackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
