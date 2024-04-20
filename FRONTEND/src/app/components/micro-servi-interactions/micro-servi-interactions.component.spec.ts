import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroServiInteractionsComponent } from './micro-servi-interactions.component';

describe('MicroServiInteractionsComponent', () => {
  let component: MicroServiInteractionsComponent;
  let fixture: ComponentFixture<MicroServiInteractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicroServiInteractionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MicroServiInteractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
