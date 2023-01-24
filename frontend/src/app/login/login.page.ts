import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  senha: string;

  constructor(private authentication: AuthenticationService,
    private router: Router,
    private toastController: ToastController) {
  }

  ngOnInit() {}

  private async exibirMensagem(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
  
  async login() {
    const usuario = {
      email: this.email,
      senha: this.senha,
    };
    const retorno = await this.authentication
    .login(usuario);
    
    if (retorno) {
      this.router.navigate(["/home"]);
    } else {
      this.exibirMensagem("Email ou senha não conferem!");
      console.log('Login failed.');
    }
  }

  
  

}
