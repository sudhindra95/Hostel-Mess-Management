import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPurchaseComponent } from './modify-purchase.component';

describe('ModifyPurchaseComponent', () => {
  let component: ModifyPurchaseComponent;
  let fixture: ComponentFixture<ModifyPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
