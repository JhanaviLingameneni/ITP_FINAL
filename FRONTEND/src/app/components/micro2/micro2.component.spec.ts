import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Micro2Component } from './micro2.component';

describe('Micro2Component', () => {
  let component: Micro2Component;
  let fixture: ComponentFixture<Micro2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Micro2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Micro2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
