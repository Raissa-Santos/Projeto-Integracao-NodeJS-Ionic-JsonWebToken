import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { ContaService } from '../services/conta.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public email: string;
  public senha: string;
  public contas: any[] = [];

  constructor(private contaService: ContaService,
              private alertController: AlertController,
              private toastController: ToastController, 
              private authentication: AuthenticationService,
              private router: Router){
    this.buscarTodos();  
  }

  public buscarTodos(){
    this.contaService.getAll().then((contas) => {
      this.contas = contas;
    }).catch((erro) => {
      console.log(erro);
    });
  }

  public remover(i: number){
    this.contaService.remove(i).then(() => {
      this.exibirMensagem("Excluído com sucesso!");
      this.buscarTodos();
    }).catch((erro) => {
      console.log(erro);
    });
  }
  private async exibirMensagem(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  private async confirmarExclusao(i: number) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      buttons: [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          handler: () => {
            this.remover(i);
          },
        },
      ],
    });

    await alert.present();
  }


  private criarConta(){
    const c = {
      "email":this.email,
      "senha":this.senha
    }
    return c;
  }

  public cadastrar(){
    this.contaService.create(this.criarConta()).then(() => {
      this.exibirMensagem("Cadastrado com sucesso!");
      this.buscarTodos();
    }).catch((erro) => {
      console.log(erro);
    });
  }

  logout() {
    this.authentication.logout();
    this.router.navigate(["/login"]);
  }

}
