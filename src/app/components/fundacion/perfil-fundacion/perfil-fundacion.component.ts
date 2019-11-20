import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Mascota} from '../../../models/mascota';
import {Foto} from '../../../models/foto';
import {UsuarioVoluntario} from '../../../models/usuarioVoluntario';
import {PortadaFundacion} from '../../../models/portadaFundacion';
import {MascotaService} from '../../../services/mascota.service';
import {GLOBAL} from '../../../services/global';
import {UsuarioService} from '../../../services/usuario.service';
import {UploadService} from '../../../services/upload.service';
import { UsuarioFundacion } from '../../../models/usuarioFundacion';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
declare var $:any;
declare var Swiper:any
@Component({
  selector: 'app-perfil-fundacion',
  templateUrl: './perfil-fundacion.component.html',
  styleUrls: ['./perfil-fundacion.component.css'],
  providers:[MascotaService,UsuarioService, UploadService]
})
export class PerfilFundacionComponent implements OnInit {
  public identity;
  public token;
  public url;
  public tipo
  public valid;
  public p;
  public fundacion:UsuarioFundacion;
  


  //variables para advertencias al subir nueva portada
  public statusNewPor;
  public advertenciaNewPor;
  public mensajeNewPor;
  public nNewPor;

  //variables para guardar las portaas
  public portadasFundacion:UsuarioFundacion[];
  public portada:PortadaFundacion;
  
 

  //variables para mostrar imagen de portada al subir una nueva
  public imgUN3:any;
  public imL3 = false;

  //variables para recoger lo que venga por la URL
  public idFun;
  public titu;


  public imgUN:any;
  public imL = false;


  public items:any;
  public hh = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.portadasFundacion, event.previousIndex, event.currentIndex);

    console.log(this.portadasFundacion)
  }
  constructor(private _route:ActivatedRoute,
    private _router:Router, private _mascotaService:MascotaService,private _usuarioService:UsuarioService,private _uploadService:UploadService ) {
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.url = GLOBAL.url;
      this.p = 1;
      
      this.advertenciaNewPor = false;
     
     
     
      
      this.portada = new PortadaFundacion("","","","","");
      this.items  = ['as','ass','eee']
   
     }

  ngOnInit() {
    
    this.loadPage();
   
  }

  deslizarESPortada(i){
    $('.carousel').carousel(i)
  }
  obtFundacion(id){

    this._usuarioService.obtUsuario(id).subscribe(
      response=>{
       
        this.fundacion = response.usuario;
      },
      error=>{
        console.log(<any>error);
      }
    )
    

  }

   registrarPortada(form){

    if(this.filesToUpload3 != undefined){
      this.advertenciaNewPor = true;
      this.statusNewPor = 'procesando';
      this._usuarioService.registerPortada(this.portada, this.idFun, this.token).subscribe(
        response =>{
          if(response.portada && response.portada._id && response.n == '1'){
              this._uploadService.makeGileRequest(this.url+'subir-portada-fundacion/'+this.idFun+'/'+response.portada._id,[],this.filesToUpload3,this.token,'foto')
              .then((result:any)=>{
                //alert('si')

                if(result.n == '6' || result.n == '5' || result.n == '4' || result.n == '2'  || result.n == '1'){
                  this.statusNewPor='error';
                  this.mensajeNewPor = result.message;
                  this.imL3 = false;
                  this.filesToUpload3 = undefined;
                  form.reset();
                  
                  setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
                  this._usuarioService.borrarPortada(response.portada._id).subscribe(
                    response=>{
                      
                    },
                    error=>{

                })
                }else if(result.n == '3'){
                  this.statusNewPor='success';
                  //this.mensajeNewPor = response.message;
                  this.loadPage()
                  form.reset();
                  this.filesToUpload3 = undefined;
                  this.imL3 = false;
                  setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
                  this.portada.foto = result.foto;
                 
                }
                console.log(result)
                //this.status = 'success';
               // $('#modalFundacion').modal('show');
              
              });

             /* this.statusNewPor='success';
              this.mensajeNewPor = response.message;
              
              form.reset();
              this.filesToUpload3 = undefined;
              this.imL3 = false;
              setTimeout(()=>{ this.advertenciaNewPor = false;}, 3000);*/
          }else if(response.n == '5'){
            this.statusNewPor='error';
              this.mensajeNewPor = response.message;
              this.filesToUpload3 = undefined;
              form.reset();
              setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
          }else{
            this.statusNewPor='error';
              this.mensajeNewPor = 'Algo salió mal.';
              this.filesToUpload3 = undefined;
              form.reset();
              setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
          }
        },
        error =>{
          console.log(<any>error);
          if(error.error.n == '4' || error.error.n == '3' || error.error.n == '2'){
            this.statusNewPor='error';
            this.mensajeNewPor = error.error.message;
            this.filesToUpload3 = undefined;
            form.reset();
            setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
        }else{
          this.statusNewPor='error';
          this.mensajeNewPor ='ERROR';
          this.filesToUpload3 = undefined;
          form.reset();
          setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
        }
        }
      );
    }else{
      this.statusNewPor= 'error';
      this.mensajeNewPor = 'Por favor, debes subir una foto para tu portada';
     
      setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
    }
    
   }

      //para registro de portada
      public filesToUpload3: Array<File>;
      urls3 = new Array<string>();
      fileChangeEvent3(fileInput:any){
        this.filesToUpload3 = <Array<File>>fileInput.target.files;
        
         let files = <Array<File>>fileInput.target.files;
        this.urls3 = [];
         if (files) {
          for (let file of files) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
              this.urls3.push(e.target.result);
              this.imgUN3 = e.target.result;
              this.imL3 = true;
            }
            reader.readAsDataURL(file);
          }
        }
         if(this.filesToUpload3 != undefined){
          this.imL3 = false;
        }
      }
   obtPortadasFundacion(id){
    this._usuarioService.obtPortadasFundacion(id).subscribe(
      response =>{
        if(response.portadasFundacion){
         
          this.portadasFundacion= response.portadasFundacion;
          console.log(this.portadasFundacion)
         // this.hh = []
        if(this.p == 1){
          for(var i=0; i < this.portadasFundacion.length; i++){

            this.hh.push({
              "numero":i
            })
            this.p++;


          }
        }
         
      
          
        }else{
          //this.status = 'error';
         console.log("mal")

        }
      },
      error=>{
        
        console.log(<any>error);
        //this._router.navigate(['/mascotas']);
      }
    );
  }
  loadPage(){
    this._route.params.subscribe(params =>{
      let id = params['id'];
      let tipo = params['tipo'];
      this.obtFundacion(id);
      this.idFun = id;
      this.tipo = tipo;
      
      if(this.identity){
        if(id == this.identity._id && this.identity.rol == '4'){
          this.valid = true;
        }else if(this.identity.rol == '1'){
          this._router.navigate(['admin','panel-usuarios','fundaciones']);

        }
        
        else{
          this._router.navigate(['fundacion',this.identity._id,'nosotros','all']);
        }
      }
     
      this.obtPortadasFundacion(id);
      
    })
  }
  eliminarPortada(id,file){
    console.log(file)
    this._usuarioService.eliminarLogo(id,file,'FP').subscribe(
      response=>{
       
       this.loadPage();
      }
    ),
    error=>{
      console.log(<any>error)
    }
  }
 


}

