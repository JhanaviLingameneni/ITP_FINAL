import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pop2Component } from './pop2.component';

describe('Pop2Component', () => {
  let component: Pop2Component;
  let fixture: ComponentFixture<Pop2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Pop2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Pop2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
