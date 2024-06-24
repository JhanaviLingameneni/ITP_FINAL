import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Piebar2Component } from './piebar2.component';

describe('Piebar2Component', () => {
  let component: Piebar2Component;
  let fixture: ComponentFixture<Piebar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Piebar2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Piebar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
