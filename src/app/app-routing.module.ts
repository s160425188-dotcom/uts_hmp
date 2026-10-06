import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'pengaturan',
    loadChildren: () => import('./pages/pengaturan/pengaturan.module').then( m => m.PengaturanPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'detail-produk/:id',
    loadChildren: () => import('./pages/detail-produk/detail-produk.module').then( m => m.DetailProdukPageModule)
  },
  {
    path: 'form-produk',
    loadChildren: () => import('./pages/form-produk/form-produk.module').then( m => m.FormProdukPageModule)
  },
  {
    path: 'keranjang',
    loadChildren: () => import('./pages/keranjang/keranjang.module').then( m => m.KeranjangPageModule)
  },
  {
    path: 'detail-transaksi',
    loadChildren: () => import('./pages/detail-transaksi/detail-transaksi.module').then( m => m.DetailTransaksiPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
