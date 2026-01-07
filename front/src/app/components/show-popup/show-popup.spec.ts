import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPopup } from './show-popup';

describe('ShowPopup', () => {
  let component: ShowPopup;
  let fixture: ComponentFixture<ShowPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
