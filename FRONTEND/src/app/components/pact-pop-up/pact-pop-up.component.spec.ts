import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PactPopUpComponent } from './pact-pop-up.component';

describe('PactPopUpComponent', () => {
  let component: PactPopUpComponent;
  let fixture: ComponentFixture<PactPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PactPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PactPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
