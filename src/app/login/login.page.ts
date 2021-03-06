import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, Events } from '@ionic/angular';
import {EventosService} from '../services/eventos.service'
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  errorMessage: string= "";

  usuario : Usuario;

  // usuarios: any;
  
  url: string = "spielback.com";

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController , private eventosService : EventosService, public events : Events , public http : HttpClient) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      )
    });
  }


  ngOnInit() {
  }

  // loginUser(credentials) {
  //   this.eventosService.getUsuarios().then( newUsuarios =>{
  //     this.usuario = newUsuarios.filter( e => e.login == credentials.email && e.contraseña==credentials.password);
  //     this.eventosService.actualizarUsuario(this.usuario);
  //     console.log(this.usuario);
  //   });
  //   if(     this.usuario!=null   ){
  //     this.idUsuario = credentials.email;
  //     this.navCtrl.navigateForward("/tabs/home-tab");
  //   }
  //   else{
  //     alert("Credenciales incorrectas");
  //   }
  // }

  // loginUser2 (credentials) : void {
  //   this.eventosService.getUsuarioLogin(credentials);
  //   this.usuario = this.eventosService.getUsuarioActual();
  //   if(this.usuario!=null && this.usuario.contrasena==credentials.password && this.usuario.login==credentials.email ){
  //           this.navCtrl.navigateForward("/tabs/home-tab");
  //   }
  //   else{
  //           alert("Credenciales incorrectas");
  //   }
  // }


  goToRegister(){
    this.navCtrl.navigateForward("/register");
  }


  // loginUser2(credentials ): void{
  //   this.eventosService.getUsuarioLogin(credentials.email);
  //   this.usuario = this.eventosService.getUsuarioActual();
  //   console.log(this.usuario);
    
  // }


  loginUser2(credentials): void {
    this.http.get( 'http://' + this.url + ':8000/' + 'gen?tabla=usuario&login=' + credentials.email).subscribe(data => {
      this.usuario = data["json"][0];
      console.log(this.usuario.apellido);
      this.eventosService.actualizarUsuario(this.usuario);
      if(this.usuario!=null && this.usuario.contrasena==credentials.password && this.usuario.login==credentials.email ){
        this.navCtrl.navigateForward("/tabs/home-tab");
      }
      else{
        alert("Credenciales incorrectas");
      }
      });    

  }

}
