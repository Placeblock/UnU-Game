import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawpileComponent } from './drawpile.component';

describe('DrawpileComponent', () => {
  let component: DrawpileComponent;
  let fixture: ComponentFixture<DrawpileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawpileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawpileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
