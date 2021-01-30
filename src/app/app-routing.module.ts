import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { LoginComponent } from './components/login/login.component';
import { ProductosFormComponent } from './components/productos/productos-form.component';
import { ProductosComponent } from './components/productos/productos.component';
import { VentasComponent } from './components/ventas/ventas.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'productos'},
  {path: 'productos', component: ProductosComponent},
  {path: 'productos/form', component: ProductosFormComponent},
  {path: 'productos/form/:id', component: ProductosFormComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
