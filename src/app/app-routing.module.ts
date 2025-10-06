import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'pais',
    loadChildren: () => import('./pais/pais.module').then( m => m.PaisPageModule)
  },
  {
    path: 'ciudad',
    loadChildren: () => import('./ciudad/ciudad.module').then( m => m.CiudadPageModule)
  },
  {
    path: 'municipio',
    loadChildren: () => import('./municipio/municipio.module').then( m => m.MunicipioPageModule)
  },
  {
    path: 'estado',
    loadChildren: () => import('./estado/estado.module').then( m => m.EstadoPageModule)
  },
  {
    path: 'tipo-estado',
    loadChildren: () => import('./tipo-estado/tipo-estado.module').then( m => m.TipoEstadoPageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'medicamento',
    loadChildren: () => import('./medicamento/medicamento.module').then( m => m.MedicamentoPageModule)
  },
  {
    path: 'medicamento-componente',
    loadChildren: () => import('./medicamento-componente/medicamento-componente.module').then( m => m.MedicamentoComponentePageModule)
  },
  {
    path: 'factura',
    loadChildren: () => import('./factura/factura.module').then( m => m.FacturaPageModule)
  },
  {
    path: 'entidad-medicamento',
    loadChildren: () => import('./entidad-medicamento/entidad-medicamento.module').then( m => m.EntidadMedicamentoPageModule)
  },
  {
    path: 'entidad-comercial',
    loadChildren: () => import('./entidad-comercial/entidad-comercial.module').then( m => m.EntidadComercialPageModule)
  },
  {
    path: 'devolucion',
    loadChildren: () => import('./devolucion/devolucion.module').then( m => m.DevolucionPageModule)
  },
  {
    path: 'compra',
    loadChildren: () => import('./compra/compra.module').then( m => m.CompraPageModule)
  },
  {
    path: 'componente',
    loadChildren: () => import('./componente/componente.module').then( m => m.ComponentePageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'categoria-medicamento',
    loadChildren: () => import('./categoria-medicamento/categoria-medicamento.module').then( m => m.CategoriaMedicamentoPageModule)
  },
  {
    path: 'pais-detalle',
    loadChildren: () => import('./pais-detalle/pais-detalle.module').then( m => m.PaisDetallePageModule)
  },
  {
    path: 'entidad-comercial-detalle/:ent_id',
    loadChildren: () => import('./entidad-comercial-detalle/entidad-comercial-detalle.module').then( m => m.EntidadComercialDetallePageModule)
  },
  {
    path: 'ciudad-detalle/:ciu_id',
    loadChildren: () => import('./ciudad-detalle/ciudad-detalle.module').then( m => m.CiudadDetallePageModule)
  },
  {
    path: 'entidad-medicamento-detalle/:entmed_id',
    loadChildren: () => import('./entidad-medicamento-detalle/entidad-medicamento-detalle.module').then( m => m.EntidadMedicamentoDetallePageModule)
  },
  {
    path: 'pago-detalle/:pag_id',
    loadChildren: () => import('./pago-detalle/pago-detalle.module').then( m => m.PagoDetallePageModule)
  },
  {
    path: 'factura-detalle/:fac_id',
    loadChildren: () => import('./factura-detalle/factura-detalle.module').then( m => m.FacturaDetallePageModule)
  },
  {
    path: 'devolucion-detalle/:dev_id',
    loadChildren: () => import('./devolucion-detalle/devolucion-detalle.module').then( m => m.DevolucionDetallePageModule)
  },
  {
    path: 'compradetalle',
    loadChildren: () => import('./compradetalle/compradetalle.module').then( m => m.CompradetallePageModule)
  },
  {
    path: 'cliente-detalle/:cli_id',
    loadChildren: () => import('./cliente-detalle/cliente-detalle.module').then( m => m.ClienteDetallePageModule)
  },
  {
    path: 'medicamento-detalle/:med_id',
    loadChildren: () => import('./medicamento-detalle/medicamento-detalle.module').then( m => m.MedicamentoDetallePageModule)
  },
  {
    path: 'compra-detalle/:comp_id',
    loadChildren: () => import('./compra-detalle/compra-detalle.module').then( m => m.CompraDetallePageModule)
  },
  {
    path: 'municipio-crear',
    loadChildren: () => import('./municipio-crear/municipio-crear.module').then( m => m.MunicipioCrearPageModule)
  },
  {
    path: 'estado-crear',
    loadChildren: () => import('./estado-crear/estado-crear.module').then( m => m.EstadoCrearPageModule)
  },
  {
    path: 'estado-detalle/:estd_id',
    loadChildren: () => import('./estado-detalle/estado-detalle.module').then( m => m.EstadoDetallePageModule)
  },
  {
    path: 'municipio-detalle/:mun_id',
    loadChildren: () => import('./municipio-detalle/municipio-detalle.module').then( m => m.MunicipioDetallePageModule)
  },
  {
    path: 'pais-crear',
    loadChildren: () => import('./pais-crear/pais-crear.module').then( m => m.PaisCrearPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
