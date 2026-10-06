import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormProdukPage } from './form-produk.page';

const routes: Routes = [
  {
    path: '',
    component: FormProdukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormProdukPageRoutingModule {}
