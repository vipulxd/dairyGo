import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalfsComponent } from './calfs.component';

describe('CalfsComponent', () => {
  let component: CalfsComponent;
  let fixture: ComponentFixture<CalfsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalfsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
