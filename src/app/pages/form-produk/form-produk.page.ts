import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-form-produk',
  templateUrl: './form-produk.page.html',
  styleUrls: ['./form-produk.page.scss'],
  standalone: false,
})
export class FormProdukPage implements OnInit {

  productForm!: FormGroup;
  isEditMode: boolean = false;
  productId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private toastController: ToastController,
    private productService: ProductService // 1. Inject ProductService
  ) { }

  ngOnInit() {
    this.initForm();
    
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.productId = Number(idParam);
      this.loadProductData(this.productId);
    }
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['Sembako', [Validators.required]],
      buyPrice: [null, [Validators.required, Validators.min(1)]],
      sellPrice: [null, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  loadProductData(id: number) {
    // 2. Ambil data asli dari ProductService, bukan dari mockProducts
    const existingProduct = this.productService.getProductById(id);
    if (existingProduct) {
      this.productForm.patchValue({
        name: existingProduct.name,
        category: existingProduct.category,
        buyPrice: existingProduct.buyPrice,
        sellPrice: existingProduct.sellPrice,
        stock: existingProduct.stock
      });
    }
  }

  get f() {
    return this.productForm.controls;
  }

  async onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = this.productForm.value;

    // 3. Eksekusi simpan ke ProductService (Tambah Baru atau Update)
    if (this.isEditMode && this.productId) {
      this.productService.updateProduct({
        id: this.productId,
        ...formData
      });
    } else {
      this.productService.addProduct(formData);
    }

    const actionText = this.isEditMode ? 'diperbarui' : 'ditambahkan';

    const toast = await this.toastController.create({
      message: `Produk "${formData.name}" berhasil ${actionText}!`,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();

    // 4. Kembali ke daftar produk
    this.navCtrl.back();
  }

}