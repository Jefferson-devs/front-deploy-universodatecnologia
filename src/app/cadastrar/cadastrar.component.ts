import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User()
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {

    if(this.user.nome.length<5){
      this.alertas.showAlertSuccess("Preencha o nome com pelo menos 5 caracteres")
    }

    if(this.user.usuario.indexOf("@") == -1 || this.user.usuario.indexOf(".") == -1){
      this.alertas.showAlertSuccess("Preencha o campo usuario com pelo menos um @ e um .")
    }

    this.user.tipo = this.tipoUsuario

    if(this.user.senha.length<8){
      this.alertas.showAlertSuccess("Preencha o campo senha com pelo menos 8 caracteres")
    }

    if (this.user.senha != this.confirmarSenha) {
      this.alertas.showAlertSuccess('A senhas estão incorretas.')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
      })
    }
  }
}
