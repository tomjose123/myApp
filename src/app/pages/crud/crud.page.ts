import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController,AlertController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  your_name: string = "";
  gender: string = "";
  date_birth: string = "";
  email_address: string = "";
  password: string = "";
  confirm_pass: string = "";
  disabledButton;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.disabledButton=false;
  }

  async tryRegister(){
    if(this.your_name=="")
    { this.presentToast('name is required')}
    else if(this.gender=="")
    {this.presentToast('gender is required')}
    else if(this.date_birth=="")
    { this.presentToast('date_birth is required')}
    else if(this.email_address=="")
    { this.presentToast('email_address is required')}
    else if(this.password=="")
    { this.presentToast('password is required')}
    else if(this.confirm_pass!=this.password)
    { this.presentToast('password missmatch')}
    else
    {
      this.disabledButton=true; 
      const loader = await this.loadingCtrl.create({
        message:'please wait....',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'proses_register',
          your_name:this.your_name,
          gender:this.gender,
          date_birth:this.date_birth,
          email_address:this.email_address,
          password:this.password
        }
        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{   
          if(res.success==true)
          { 
            loader.dismiss();
            this.disabledButton=false;
            this.presentToast(res.msg); 
            this.router.navigate(['/login']);
          }
          else
          {
            loader.dismiss();
            this.disabledButton=false;
            this.presentToast(res.msg); 
          
          }
           
        },(err)=>{
          loader.dismiss();
          this.disabledButton=false;
          this.presentAlert('time out'); 

        });
      });
    }
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration:1500,
      position:'top'
    });
    toast.present();
  }

  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      
      header: a,
      backdropDismiss:false,
      buttons: [
        {
          text: 'close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            //action
          }
        }, {
          text: 'Try Again',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });

    await alert.present();
  }

}
