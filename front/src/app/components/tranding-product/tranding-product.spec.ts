import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrandingProduct } from './tranding-product';

describe('TrandingProduct', () => {
  let component: TrandingProduct;
  let fixture: ComponentFixture<TrandingProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrandingProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrandingProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
