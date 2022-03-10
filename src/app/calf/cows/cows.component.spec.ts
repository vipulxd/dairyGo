import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CowsComponent } from './cows.component';

describe('CowsComponent', () => {
  let component: CowsComponent;
  let fixture: ComponentFixture<CowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
