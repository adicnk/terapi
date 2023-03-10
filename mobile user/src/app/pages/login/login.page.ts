import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { Login, LoginService } from 'src/app/services/login.service';
import { Storage } from '@ionic/storage-angular';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: Login[];
  username: string;
  password: any;
  

  constructor(
    private router:Router,
    private navCtrl : NavController,
    private toastCtrl : ToastController,
    private service: LoginService,
    private storage: Storage,
    private modalCtrl: ModalController
  ) { 
    this.service.get('').subscribe(res=>{
      if (res){ 
        this.storage.set('sClient',res);         
        
      }
    });
  }

  ngOnInit() {
  }

  openRegister(){
    this.modalCtrl.create({
      component: RegisterPage
    }).then(modal=>modal.present());
    //this.router.navigate(['/register']);
  }

  tryLogin(){

      this.service.get(this.username).subscribe(res=>{
        if (this.password == res['password']){ 
          this.storage.set('sClient',res);         
          //this.navCtrl.navigateForward(['home',{
          //  data : JSON.stringify(computer)
          //}]);
          this.router.navigate(['/home']);
        }
      });
    
  }

  
}