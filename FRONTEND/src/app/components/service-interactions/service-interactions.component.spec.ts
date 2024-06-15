import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInteractionsComponent } from './service-interactions.component';

describe('ServiceInteractionsComponent', () => {
  let component: ServiceInteractionsComponent;
  let fixture: ComponentFixture<ServiceInteractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceInteractionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceInteractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
