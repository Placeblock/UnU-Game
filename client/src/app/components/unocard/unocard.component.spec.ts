import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnocardComponent } from './unocard.component';

describe('UnocardComponent', () => {
  let component: UnocardComponent;
  let fixture: ComponentFixture<UnocardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnocardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnocardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
