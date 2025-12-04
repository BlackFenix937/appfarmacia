import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { permisoGuard } from './guard/permiso-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'categoriamedicamento',
    loadChildren: () => import('./categoriamedicamento/categoriamedicamento.module').then(m => m.CategoriamedicamentoPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'ciudad',
    loadChildren: () => import('./ciudad/ciudad.module').then(m => m.CiudadPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClientePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'componente',
    loadChildren: () => import('./componente/componente.module').then(m => m.ComponentePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'compra',
    loadChildren: () => import('./compra/compra.module').then(m => m.CompraPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'devolucion',
    loadChildren: () => import('./devolucion/devolucion.module').then(m => m.DevolucionPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'entidad-comercial',
    loadChildren: () => import('./entidad-comercial/entidad-comercial.module').then(m => m.EntidadComercialPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'entidad-medicamento',
    loadChildren: () => import('./entidad-medicamento/entidad-medicamento.module').then(m => m.EntidadMedicamentoPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'estado',
    loadChildren: () => import('./estado/estado.module').then(m => m.EstadoPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'factura',
    loadChildren: () => import('./factura/factura.module').then(m => m.FacturaPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'medicamento',
    loadChildren: () => import('./medicamento/medicamento.module').then(m => m.MedicamentoPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'medicamentocomponente',
    loadChildren: () => import('./medicamentocomponente/medicamentocomponente.module').then(m => m.MedicamentocomponentePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'municipio',
    loadChildren: () => import('./municipio/municipio.module').then(m => m.MunicipioPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'pago',
    loadChildren: () => import('./pago/pago.module').then(m => m.PagoPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'pais',
    loadChildren: () => import('./pais/pais.module').then(m => m.PaisPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'tipo-estado',
    loadChildren: () => import('./tipo-estado/tipo-estado.module').then(m => m.TipoEstadoPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'categoriamedicamento-detalle/:catmed_id',
    loadChildren: () => import('./categoriamedicamento-detalle/categoriamedicamento-detalle.module').then(m => m.CategoriamedicamentoDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'ciudad-detalle/:ciu_id',
    loadChildren: () => import('./ciudad-detalle/ciudad-detalle.module').then(m => m.CiudadDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'entidad-comercial-detalle/:ent_id',
    loadChildren: () => import('./entidad-comercial-detalle/entidad-comercial-detalle.module').then(m => m.EntidadComercialDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'entidad-medicamento-detalle/:entmed_id',
    loadChildren: () => import('./entidad-medicamento-detalle/entidad-medicamento-detalle.module').then(m => m.EntidadMedicamentoDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'pago-detalle/:pag_id',
    loadChildren: () => import('./pago-detalle/pago-detalle.module').then(m => m.PagoDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'factura-detalle/:fac_id',
    loadChildren: () => import('./factura-detalle/factura-detalle.module').then(m => m.FacturaDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'devolucion-detalle/:dev_id',
    loadChildren: () => import('./devolucion-detalle/devolucion-detalle.module').then(m => m.DevolucionDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'cliente-detalle/:cli_id',
    loadChildren: () => import('./cliente-detalle/cliente-detalle.module').then(m => m.ClienteDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'medicamento-detalle/:med_id',
    loadChildren: () => import('./medicamento-detalle/medicamento-detalle.module').then(m => m.MedicamentoDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'compra-detalle/:comp_id',
    loadChildren: () => import('./compra-detalle/compra-detalle.module').then(m => m.CompraDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'medicamentocomponente-detalle/:medcomp_id',
    loadChildren: () => import('./medicamentocomponente-detalle/medicamentocomponente-detalle.module').then(m => m.MedicamentocomponenteDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'compradetalle',
    loadChildren: () => import('./compradetalle/compradetalle.module').then(m => m.CompradetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'municipio-crear',
    loadChildren: () => import('./municipio-crear/municipio-crear.module').then(m => m.MunicipioCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'estado-crear',
    loadChildren: () => import('./estado-crear/estado-crear.module').then(m => m.EstadoCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'estado-detalle/:estd_id',
    loadChildren: () => import('./estado-detalle/estado-detalle.module').then(m => m.EstadoDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'municipio-detalle/:mun_id',
    loadChildren: () => import('./municipio-detalle/municipio-detalle.module').then(m => m.MunicipioDetallePageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'pais-crear',
    loadChildren: () => import('./pais-crear/pais-crear.module').then(m => m.PaisCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'ciudad-crear',
    loadChildren: () => import('./ciudad-crear/ciudad-crear.module').then(m => m.CiudadCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'medicamento-crear',
    loadChildren: () => import('./medicamento-crear/medicamento-crear.module').then(m => m.MedicamentoCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'cliente-crear',
    loadChildren: () => import('./cliente-crear/cliente-crear.module').then(m => m.ClienteCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'entidad-comercial-crear',
    loadChildren: () => import('./entidad-comercial-crear/entidad-comercial-crear.module').then(m => m.EntidadComercialCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'compra-crear',
    loadChildren: () => import('./compra-crear/compra-crear.module').then(m => m.CompraCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'entidad-medicamento-crear',
    loadChildren: () => import('./entidad-medicamento-crear/entidad-medicamento-crear.module').then(m => m.EntidadMedicamentoCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'devolucion-crear',
    loadChildren: () => import('./devolucion-crear/devolucion-crear.module').then(m => m.DevolucionCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'pago-crear',
    loadChildren: () => import('./pago-crear/pago-crear.module').then(m => m.PagoCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'categoriamedicamento-crear',
    loadChildren: () => import('./categoriamedicamento-crear/categoriamedicamento-crear.module').then(m => m.CategoriamedicamentoCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'componente-crear',
    loadChildren: () => import('./componente-crear/componente-crear.module').then(m => m.ComponenteCrearPageModule),
    canActivate: [permisoGuard]
  },
  {
    path: 'medicamentocomponente-crear',
    loadChildren: () => import('./medicamentocomponente-crear/medicamentocomponente-crear.module').then(m => m.MedicamentocomponenteCrearPageModule),
    canActivate: [permisoGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
