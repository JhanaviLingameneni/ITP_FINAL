import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PactsComponent } from './pacts.component';

describe('PactsComponent', () => {
  let component: PactsComponent;
  let fixture: ComponentFixture<PactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
