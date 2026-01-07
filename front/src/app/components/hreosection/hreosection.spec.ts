import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hreosection } from './hreosection';

describe('Hreosection', () => {
  let component: Hreosection;
  let fixture: ComponentFixture<Hreosection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hreosection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hreosection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
