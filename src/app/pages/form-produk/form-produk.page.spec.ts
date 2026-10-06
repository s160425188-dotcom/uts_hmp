import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormProdukPage } from './form-produk.page';

describe('FormProdukPage', () => {
  let component: FormProdukPage;
  let fixture: ComponentFixture<FormProdukPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProdukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
