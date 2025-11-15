import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

export const permisoGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
  const router = inject(Router);
  const alertCtrl = inject(AlertController);

  const permisos = await localStorage.getItem('permisos');
  const token = localStorage.getItem('token');
  const vista = route.routeConfig?.path;
  console.log(vista);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  if (permisos && vista && permisos.includes(vista)) {
    return true;
  }

  const alert = await alertCtrl.create({
    header: 'Acceso denegado',
    message: 'No tienes permiso para entrar a esta sección.',
    buttons: ['OK']
  });

  await alert.present();
  router.navigate(['/medicamento']);
  return false;
};