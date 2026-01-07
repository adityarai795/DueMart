import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallProduct } from './showall-product';

describe('ShowallProduct', () => {
  let component: ShowallProduct;
  let fixture: ComponentFixture<ShowallProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowallProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowallProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
