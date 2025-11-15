import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../services/cliente';
import { Login } from '../services/login';
import axios from 'axios';
import { Permiso } from '../services/permiso';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: Login,
    private permisoService: Permiso

  ) { }

  ciudadUrl: string = "http://localhost:8080/ciudad";
  ciudad: any = [];

  ngOnInit() {
    this.buildForm();
    this.cargarCiudades();
  }

  public registro!: FormGroup;

  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye!: ElementRef;

  passwordTypeInput = 'password';


  validation_messages: any = {
    'username': [
      { type: 'required', message: 'Matrícula requerida.' },

    ],
    'password': [
      { type: 'required', message: 'Contraseña requerida.' },

    ],
    'password_confirm': [
      { type: 'required', message: 'Contraseña requerida.' },
      { type: 'notEquivalent', message: 'No coinciden las contraseñas' },
    ],
    'cli_nombre': [
      { type: 'required', message: 'El nombre es obligatorio' },

    ],

    'cli_apellido_paterno': [
      { type: 'required', message: 'El apellido paterno es obligatorio.' },

    ],
    'cli_apellido_materno': [
      { type: 'required', message: 'El apellido materno es obligatorio.' },

    ],
    'cli_fecha_nacimiento': [
      { type: 'required', message: 'La fecha de nacimiento es obligatoria.' },

    ],
    'cli_direccion': [
      { type: 'required', message: 'La direccion es obligatoria.' },

    ],
    'cli_telefono': [
      { type: 'required', message: 'El telefono es obligatorio.' },

    ],
    'cli_correo': [
      { type: 'required', message: 'El correo es obligatorio.' },

    ],
    'cli_rfc': [
      { type: 'required', message: 'El RFC es obligatorio.' },

    ],
    'cli_fkciu_id': [
      { type: 'required', message: 'La ciudad es obligatoria.' },

    ],
  }

  buildForm() {
    this.registro = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      password_confirm: ['', Validators.compose([
        Validators.required
      ])],
      cli_nombre: ['', [Validators.required]],
      cli_apellido_paterno: ['', [Validators.required]],
      cli_apellido_materno: ['', [Validators.required]],
      cli_fecha_nacimiento: ['', [Validators.required]],
      cli_direccion: ['', [Validators.required]],
      cli_telefono: ['', [Validators.required]],
      cli_correo: ['', [Validators.required]],
      cli_rfc: ['', [Validators.required]],
      cli_fkciu_id: ['', [Validators.required]],
    });
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  async submitRegistrar() {
    localStorage.clear();
    const registrarData = this.registro?.value;
    try {
      await this.loginService.registrar(registrarData).subscribe(
        async response => {
          if (response?.status == 200 && response?.data !== '') {
            await localStorage.setItem('token', response?.data);
            localStorage.setItem('sesion', 'login');
            localStorage.setItem('username', registrarData.username);

            this.permisoService.permisos().subscribe(
              async permisosResponse => {
                if (permisosResponse?.data) {
                  await localStorage.setItem('permisos', JSON.stringify(permisosResponse.data));
                }
                this.router.navigate(['/login']);
              },
              error => {
                console.error('Error obteniendo permisos:', error);
                this.alertError();
              }
            );


          } else if (response?.data === '') {
            this.alertError();
          }
        },
        error => {
          if (error.status == 422) {
            this.alertDuplicado();
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertError() {
    const alert = await this.alertCtrl.create({
      header: 'Importante',
      subHeader: 'Error',
      message: 'Nombre de usuario o contraseña incorrecta.',
      cssClass: 'alert-center',
      buttons: ['Corregir'],
    });
    await alert.present();
  }

  async alertDuplicado() {
    const alert = await this.alertCtrl.create({
      header: 'Importante',
      subHeader: 'Duplicado',
      message: 'La matricula ya se encuentra registrada',
      cssClass: 'alert-center',
      buttons: ['Corregir'],
    });
    await alert.present();
  }

  getError(controlName: string) {
    let errors: any[] = [];
    const control = this.registro.get(controlName);
    if (control!.touched && control!.errors != null) {
      errors = JSON.parse(JSON.stringify(control!.errors));
    }
    return errors;
  }

  login() {
    this.router.navigate(['/']);
  }

  togglePasswordMode() {
    const e = window.event;
    e!.preventDefault();
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    const inputSelection = nativeEl.selectionStart;
    nativeEl.focus();
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
  }

  async cargarCiudades() {
    const response = await axios({
      method: 'get',
      url: this.ciudadUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.ciudad = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }


}
