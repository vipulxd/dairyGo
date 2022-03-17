import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalfComponent } from './calf.component';

describe('CalfComponent', () => {
  let component: CalfComponent;
  let fixture: ComponentFixture<CalfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
