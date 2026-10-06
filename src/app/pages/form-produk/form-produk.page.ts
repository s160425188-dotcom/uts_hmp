import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

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

  mockProducts = [
    { id: 1, name: 'Beras Pandan Wangi 5kg', category: 'Sembako', buyPrice: 58000, sellPrice: 65000, stock: 20 },
    { id: 2, name: 'Minyak Goreng Bimoli 1L', category: 'Minyak', buyPrice: 13000, sellPrice: 15000, stock: 15 }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.initForm();
    
    // Perbaikan: gunakan this.activatedRoute
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.productId = Number(idParam);
      this.loadProductData(this.productId);
    }
  }

  initForm() {
    // Perbaikan: gunakan this.formBuilder
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['Sembako', [Validators.required]],
      buyPrice: [null, [Validators.required, Validators.min(1)]],
      sellPrice: [null, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  loadProductData(id: number) {
    const existingProduct = this.mockProducts.find(p => p.id === id);
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
    const actionText = this.isEditMode ? 'diperbarui' : 'ditambahkan';

    // Perbaikan: gunakan this.toastController
    const toast = await this.toastController.create({
      message: `Produk "${formData.name}" berhasil ${actionText}!`,
      duration: 2000,
      color: 'success'
    });
    await toast.present();

    this.navCtrl.back();
  }

}