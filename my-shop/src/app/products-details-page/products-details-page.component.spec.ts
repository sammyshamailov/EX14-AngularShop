import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetailsPageComponent } from './products-details-page.component';

describe('ProductsDetailsPageComponent', () => {
  let component: ProductsDetailsPageComponent;
  let fixture: ComponentFixture<ProductsDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
