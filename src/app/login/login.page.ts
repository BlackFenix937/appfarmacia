import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Login } from '../services/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,

    private router: Router,
    private LoginService: Login
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  login!: FormGroup;

  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye!: ElementRef;

  passwordTypeInput = 'password';

  validation_messages: any = {
    'username': [
      { type: 'required', message: 'El username es requerido.' },
      { type: 'pattern', message: 'Dígite un usuario valido' },
    ],
    'password': [
      { type: 'required', message: 'Contraseña requerida.' },
    ]
  }

  private buildForm() {
    this.login = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.maxLength(15)
      ])],
    });
  }

  async submitLogin() {
    localStorage.clear();
    const loginData = this.login?.value;
    try {
      await this.LoginService.login(loginData).subscribe(
        async response => {
          if (response?.status == 200 && response?.data !== '') {
            await localStorage.setItem('token', response?.data);
            localStorage.setItem('sesion', 'login');
            localStorage.setItem('username', loginData.username);
            this.router.navigate(['/medicamento']);
          } else if (response?.data === '') {
            this.alertError();
          }
        },
        error => {
          console.log(error);
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

  getError(controlName: string) {
    let errors: any[] = [];
    const control = this.login.get(controlName);
    if (control!.touched && control!.errors != null) {
      errors = JSON.parse(JSON.stringify(control!.errors));
    }
    return errors;
  }

  registrar() {
    this.router.navigate(['/registro']);
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

}
