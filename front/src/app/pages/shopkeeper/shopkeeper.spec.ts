import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shopkeeper } from './shopkeeper';

describe('Shopkeeper', () => {
  let component: Shopkeeper;
  let fixture: ComponentFixture<Shopkeeper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shopkeeper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shopkeeper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
