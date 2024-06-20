import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pact2Component } from './pact2.component';

describe('Pact2Component', () => {
  let component: Pact2Component;
  let fixture: ComponentFixture<Pact2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Pact2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Pact2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
