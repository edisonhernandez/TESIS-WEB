import { Component, OnInit ,DoCheck} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Emergencia} from '../../../models/emergencia';
import {Notificacion} from '../../../models/notificacion';
import {UsuarioService} from '../../../services/usuario.service';
import {UploadService} from '../../../services/upload.service';
import {EmergenciaService} from '../../../services/emergencia.service';
import {AyudaService} from '../../../services/ayuda.service';
import {NotificacionService} from '../../../services/notificacion.service';
import {UsuarioVoluntario} from '../../../models/usuarioVoluntario';
import {GLOBAL} from '../../../services/global';

declare var $:any;
@Component({
  selector: 'app-misemergencias',
  templateUrl: './misemergencias.component.html',
  styleUrls: ['./misemergencias.component.css'],
  providers:[UsuarioService,UploadService, AyudaService,NotificacionService]
})
export class MisemergenciasComponent implements OnInit,DoCheck {
  public tipoE = ["Todos","Mal estado de salud","Accidente","Preñada","Con cachorros","Maltrato","Abandono"];
  public nivelE = ["Todos","Atención inmediata","Muy urgente","Urgente","Normal","No urgente"];
  public select;
  public filtroBSQ = [];

  public pruebaID:any;
  public identity;
  public token;
  public emergencia:Emergencia;
  public newMas;
  public nuevoReg;
  public url:string;
  public imgUN2:any;
  public imL2 = false;
  public imgUN:any;
  public imL = false;
  public statusFs;
  public statusEmer;
  public sure;
  public pagesSelec=[]
  public mensaje;
  public n;
  public advertencia;
  public status;
  public emergencias:Emergencia[];
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public next_page;
  public prev_page;
  public newEmer;
  public visEmer;
  public type;
  
  public statusVolun;
  public advertenciaVolun;
  public mensajeVolun;
  public nVolun;
  
  public totalVolun;
 
  public voluntarios:UsuarioVoluntario[];
  //public ayuda:Ayuda;
  public emergenciaA:Emergencia;
  public notificacion:Notificacion;

  public statusAyuda;
  public advertenciaAyuda;
  public mensajeAyuda;
  public nAyuda;
  public urlName;
  public carga;
  public fil;
  public fl;
  public tipoF;
  public nivelF;
  public bus;
  public itemsEmer;
  public filtroBTN;
  public idFun
  public valid;
  public imgCom;
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _emergenciaService:EmergenciaService, private _usuarioService:UsuarioService,private _uploadService:UploadService,
    private _ayudaService:AyudaService,private _notificacionService:NotificacionService) {
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.filtroBSQ = this._emergenciaService.obtFiltro();
      this.nuevoReg = false;
      this.newMas = true;
      this.url = GLOBAL.url;
      this.emergencia = new Emergencia("","","","","","","","","","","","","","","","","","");
      this.notificacion= new Notificacion("","","","","","","","");
      this.page = 1;
      this.sure = 'no';
      this.bus = false;
      this.itemsEmer = 0;
      this.advertenciaAyuda = false;
      this.advertencia = false;
      this.carga = true;
     }

     ngOnInit() {
   
      this.page = 1;
     
      this.actualPage();
      //this.obtVoluntarios()
      $(document).ready(()=>{
        $("#tipoDrop").change(()=>{
  
          this.select = $("#tipoDrop").val();
          this.filtroBSQD(this.select)
      });
      $("#nivelDrop").change(()=>{
  
        this.select = $("#nivelDrop").val();
        this.filtroBSQD(this.select)
    });
  
    }); 
    }
    ngDoCheck(){
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();
      this.filtroBSQ = this._emergenciaService.obtFiltro();
      
    }
    nuevoRegiistro(){
      this.nuevoReg = true;
      this.newMas = false;
    }
  
    cancelarReg(){
      this.newMas = true;
      this.nuevoReg = false;
    }
    cancelarBus(){
     
      this.bus = false;
      localStorage.removeItem('busquedaEmergencias2');
      this._router.navigate(['fundacion',this.idFun,'emergencias','all']);
    }
    verFoto(foto){
      $('#modalComprobante').modal('show')
      this.imgCom = foto;
      console.log(this.imgCom)
  
    }
  
    abrirModal(){
      $('#modalEmergencia').modal('show');
    }
  
    registrarEmergencia(form){
      this.sure = 'si';
      
      if(!this.identity){
       //$('#modalIniR').modal('show');
      }else{
  
  
        if(this.filesToUpload2 != undefined && this.filesToUpload != undefined){
          this._emergenciaService.registerEmergencia(this.emergencia,this.token).subscribe(
            response =>{
              this._uploadService.makeGileRequest(this.url+'subir-foto-direccion-emergencia/'+this.identity._id+'/'+response.emergencia._id,[],this.filesToUpload2,this.token,'direccionFoto')
              .then((result:any)=>{
                //alert('si')
                this.emergencia.direccionFoto = result.direccionFoto;
                this.statusFs = 'success'
              });
  
              this._uploadService.makeGileRequest(this.url+'subir-foto-mascota-emergencia/'+this.identity._id+'/'+response.emergencia._id,[],this.filesToUpload,this.token,'fotoMascota')
              .then((result:any)=>{
                //alert('si')
                this.emergencia.fotoMascota = result.fotoMascota;
                
              });
            
              if(response.emergencia && response.emergencia._id){
                
                this.notificacion.emergencia = response.emergencia._id;
                this.notificacion.idde = this.identity._id;
                
                this._notificacionService.registerNotificacion(this.notificacion,'e').subscribe(
                  response=>{
                    console.log(response)
                    this.sure = 'success'
               this.imL2 = false;
               this.imL = false;
               this.imgUN2 = undefined;
               this.imgUN = undefined;
               form.reset();
                  },
                  error=>{
                    console.log(<any>error)
                  }
                )
               
              }
            },
            error =>{
              this.sure='error';
              this.imL2 = false;
               this.imL = false;
               this.imgUN2 = undefined;
               this.imgUN = undefined;
              console.log(<any>error);
              form.reset();
            }
          );
        }else{
          this.sure = 'error';
        }
  
      
      }
      
     }
  
  
     public filesToUpload2: Array<File>;
     urls2 = new Array<string>();
     fileChangeEvent2(fileInput:any){
       this.filesToUpload2 = <Array<File>>fileInput.target.files;
       
        let files = <Array<File>>fileInput.target.files;
       this.urls2 = [];
        if (files) {
         for (let file of files) {
           let reader = new FileReader();
           reader.onload = (e: any) => {
             this.urls2.push(e.target.result);
             this.imgUN2 = e.target.result;
             this.imL2 = true;
           }
           reader.readAsDataURL(file);
         }
       }
        if(this.filesToUpload2 != undefined){
         this.imL2 = false;
       }
     }
  
  
  
     public filesToUpload: Array<File>;
     urls = new Array<string>();
     fileChangeEvent(fileInput:any){
       this.filesToUpload = <Array<File>>fileInput.target.files;
       
        let files = <Array<File>>fileInput.target.files;
       this.urls = [];
        if (files) {
         for (let file of files) {
           let reader = new FileReader();
           reader.onload = (e: any) => {
             this.urls.push(e.target.result);
             this.imgUN = e.target.result;
             this.imL = true;
           }
           reader.readAsDataURL(file);
         }
       }
        if(this.filesToUpload != undefined){
         this.imL = false;
       }
     }
  
     actualPage(){
       this.type = ''
        this.pagesSelec = []
       //this.statusAyuda = null;
      // $('#modalAyudarEmergencia').modal('hide')
      this._route.params.subscribe(params =>{
        let tipo = params['tipo'];
        let option = params['option'];
        this.type = option;
        let page = +params['page'];
        this.page = page;
        let id = params['id'];
        this.idFun = id;
        if(this.identity != null){
          if(this.identity.rol == '4' && this.identity._id == this.idFun){
           this.valid == true;
           if(!params['page']){
            page = 1;
            this.page = 1;
          }
          
          if(!page){
            page = 1;
          }else{
            this.next_page = page+1;
            this.prev_page = page-1;
    
            if(this.prev_page <= 0){
              this.prev_page = 1;
            }
          }
    
          if(this.type == 'busqueda'){
            this.filtroBTN = true;
            this.filtroBSQ.forEach(elem => {
              $(document).ready(()=>{
              if(elem.tipo == 'tipoE'){
                $("#tipoDrop").val(elem.option)
              }
              if(elem.tipo == 'nivelE'){
                $("#nivelDrop").val(elem.option)
              }
              
            })
            });
            this.buscarEmergencias(page)
          }else{
            $(document).ready(()=>{
            $("#tipoDrop").val('Todos')
            $("#nivelDrop").val('Todos')
            })
            this.filtroBTN = false;
            //devolver listado de emergencias
            this.obtEmergencias(page);
          }
    
          }else if(this.identity.rol == '1'){
            this._router.navigate(['admin','pane;l-usuarios','fundaciones']);

          }else{
           this._router.navigate(['mascotas','todos']);
      
          }
      
        }else{
         this._router.navigate(['mascotas','todos']);
        }
       /* let newF = params['new'];
        if(newF == 'new'){
          this.newEmer = true;
        }*/
       
       
        
      });
    }
    efectCards(){
  
      $(document).ready(()=>{
        var wScroll = $(window).scrollTop();
      
        $('.logo').css({
          'transform' : 'translate(0px, '+ wScroll /4 +'%)'
        });
      
        
      
        
          if(wScroll >= $('.clothes-pics').offset().top - ($(window).height() / 1.2)) {
          
            $('.clothes-pics figure').each(function(i){
              
              setTimeout(function(){
                $('.clothes-pics figure').eq(i).addClass('is-showing');
              }, 150 * (i+1));
            });
        
          }else{
            $('.clothes-pics figure').removeClass('is-showing');
          }
  
  
      })
  
      $(window).scroll(function(){
  
        var wScroll = $(this).scrollTop();
      
        $('.logo').css({
          'transform' : 'translate(0px, '+ wScroll /4 +'%)'
        });
      
       
  
  
          if(wScroll >= $('.clothes-pics').offset().top - ($(window).height() / 1.2)) {
          
            $('.clothes-pics figure').each(function(i){
              
              setTimeout(function(){
                $('.clothes-pics figure').eq(i).addClass('is-showing');
              }, 150 * (i+1));
            });
        
          }else{
            $('.clothes-pics figure').removeClass('is-showing');
          }
  
  
      
      });
    }
    obtEmergencias(page){
      let rol = 4;
      this.pagesSelec = []
     
      this._emergenciaService.obtEmergencias(page).subscribe(
        response=>{
          this.carga = false;
          if(response.emergencias && response.n == '1'){
  
            $(".carga").fadeOut("slow");
            this.efectCards()
            this.total = response.total;
            this.pages = response.pages;
           
            this.itemsPerPage = response.itemsPerPage;
            this.emergencias = response.emergencias;
            for (let i = 1; i <= this.pages; i++) {
              this.pagesSelec.push(i)
              
            }
            this.itemsEmer = this.emergencias.length;
            this.status ='success';
            this.advertencia = false;
           // $('html, body').animate({scrollTop:0},500);
            if(page > this.pages){
              this._router.navigate(['fundacion',this.idFun,'emergencias','all'])
            }
            
  
          }else{
            console.log(response.n)
            this.status = 'error';
            this.mensaje = 'Algo salió mal.'
          }
        },
        error=>{
          $(".carga").fadeOut("slow");
          var errorMessage = <any>error;
          console.log(errorMessage)
          this.carga = false;
          this.advertencia = true;
          this.status = 'error';
          if((errorMessage != null && error.error.n == '2')){
            this.mensaje = 'Lo sentimos, no existe emergencias en este momento.';
          }else{
            this.mensaje = 'Algo salio mal, intentalo de nuevo.'
          }
        }
      )
    }
    obtVoluntarios(){
  
      if(this.token != undefined){
      let rol = 2;
      this.advertenciaVolun = true;
      this.statusVolun = 'procesando';
      
      this._usuarioService.obtVoluntariosNP( rol, this.token).subscribe(
        response=>{
          
          if(response.usuarios && response.n == '1'){
            this.nVolun = response.n;
            this.advertenciaVolun = false;
            this.totalVolun = response.total;
            
            
           
            this.voluntarios = response.usuarios;
            this.statusVolun ='success';
           // $('html, body').animate({scrollTop:0},500);
  
  
          }else{
            console.log(response.n+"k")
            this.statusVolun = 'error';
            this.mensajeVolun = 'Algo salió mal.'
          }
        },
        error=>{
          var errorMessage = <any>error;
          console.log(errorMessage)
          this.statusVolun = 'error';
          if(errorMessage != null && error.error.n == '2'){
            this.nVolun = error.error.n;
            this.statusVolun = 'error';  
            this.mensajeVolun = 'Lo sentimos, no existe fundaciones registradas.';
          }else if(errorMessage != null && error.error.n == '3'){
            this.nVolun = error.error.n;
            this.statusVolun = 'error';  
            this.mensajeVolun = error.error.message;
          }else{
            this.nVolun = 'n';
            this.statusVolun = 'error';
            this.mensajeVolun = 'Algo salio mal.'
          }
        }
      )
    }
    }
  
   registrarAyuda(form,idEmer){
     this.advertenciaAyuda = true;
     this.statusAyuda = 'procesando';
      var valoresCheck = [];
      var paraNoti = [];
      $("input[type=checkbox]:checked").each(function(){
        valoresCheck.push({
          
          'voluntarioId':this.value,
        'aprobado':'no'});
        paraNoti.push({
          
          'voluntarioId':this.value});
    });
  
    if(valoresCheck.length >= 1){
      this.emergencia.fundacion = this.identity._id;
      this.emergencia.voluntarios = valoresCheck;
    
      this._emergenciaService.nuevaAyuda(this.emergencia, idEmer, this.token).subscribe(
        response=>{
          if(response.emergencia && response.n == '1'){
            this.notificacion.emergencia = idEmer;
            this.notificacion.idde = this.identity._id;
            this.notificacion.para = paraNoti;
            
            this._notificacionService.registerNotificacion(this.notificacion,'a').subscribe(
              responsee=>{
                if(responsee.notificacion && responsee.n == '1'){
                  
                  this.statusAyuda = 'success';
                  this.mensajeAyuda = 'Ayuda guardada, se notificará a los voluntarios seleccionados para que acepten o rechazen el ayudar en la emergencia.'
                  this.advertenciaAyuda = false;
                  
                }else{
                  this.statusAyuda = 'error';
                  this.mensajeAyuda = 'Algo salió mal, intentalo mas tarde.'
                }
              },
              errore=>{
                if( (errore != null && errore.error.n == '3') || (errore != null && errore.error.n == '2') ){
                  this.statusAyuda ='error';
                  this.mensajeAyuda = errore.error.message;
                }else{
                  this.statusAyuda = 'error';
                  this.mensajeAyuda = 'Algo salió mal al notificar a los voluntarios.';
                }
                
              }
            )
    
          }else{
            this.statusAyuda = 'error';
            this.mensajeAyuda = 'Algo salió mal, intentalo mas tarde.'
          }
        },
        error=>{
          console.log(<any>error);
          if( (error != null && error.error.n == '6') ||  (error != null && error.error.n == '3') || (error != null && error.error.n == '2')){
            this.nAyuda = error.error.n;
            this.statusAyuda ='error';
            this.mensajeAyuda = error.error.message;
          }else{
            this.statusAyuda = 'error';
            this.mensajeAyuda = 'Algo salió mal al procesar al guardar la ayuda';
          }
          
        }
      )
    
    }else{
      this.statusAyuda = 'errorVoluntario';
      this.mensajeAyuda = 'Selecciona al menos 1 voluntario.'
    }
    
   
    }
    busqueda(){
      this.fl = true;
      var valoresTipo = [];
      var valoresNivel = [];
     
      var busqueda = []
      var tipo;
      var nivel;
     
      $("#pills-tipo input[type=checkbox]:checked").each(function(){
        valoresTipo.push({
          'tipo':this.value});
      });
      if(valoresTipo.length > 0){
        tipo = 'tipo'
      }else{
        tipo = 'tipoNull';
      }
      $("#pills-nivel input[type=checkbox]:checked").each(function(){
        valoresNivel.push({
          'nivel':this.value});
      });
      if(valoresNivel.length > 0){
        nivel = 'nivel'
      }else{
        nivel = 'nivelNull';
      }
  
  
      busqueda.push(valoresTipo, valoresNivel);
      console.log(busqueda)
      localStorage.setItem('busquedaEmergencias2', JSON.stringify(busqueda));
      
      this._router.navigate(['emergencias',tipo,nivel]);
      this.actualPage()
      
    }
    buscarEmergencias(page,adding=false){
      this.pagesSelec = []
      this._emergenciaService.filtroEmergencias(this.filtroBSQ,page).subscribe(
        response=>{
          this.carga = false;
          if(response.emergencias && response.n == '1'){
            
  
            this.efectCards()
            $(".carga").fadeOut("slow");
           
            this.advertencia = false;
            this.total = response.total;
            this.pages = response.pages;
            this.itemsPerPage = response.itemsPerPage;
            this.emergencias = response.emergencias;
            for (let i = 1; i <= this.pages; i++) {
              this.pagesSelec.push(i)
              
            }
            console.log(this.emergencias)
            this.itemsEmer = this.emergencias.length;
            this.status ='success';
  
            if(page > this.pages){
              this._router.navigate(['fundacion',this.idFun,'emergencias','all'])
              
            }
          }
        },
        error=>{
          this.carga = false;
          this.advertencia =true;
          this.status = 'error';  
          $(".carga").fadeOut("slow");
          var errorMessage = <any>error;
         
          
          if(errorMessage != null && error.error.n == '2'){
            this.mensaje = 'Lo sentimos, '+error.error.message;
            this.emergencias = null;
          }else if(errorMessage != null && error.error.n == '5'){
            this.mensaje = 'No se ha elegigo filtros';
            this.emergencias = null;
          }
          
          else{
    
            this.n = 'n';
            
            this.mensaje = 'Algo salio mal, intentalo mas tarde'
          }
        }
      )
    }
  
    
    filtroBSQD(option){
  
      
      var optionFinal = option;
      if(optionFinal == 'Mal estado de salud' || optionFinal == 'Accidente' || optionFinal == 'Preñada' || optionFinal == 'Con cachorros'|| optionFinal == 'Maltrato' || optionFinal == 'Abandono'){
        
        if(this.filtroBSQ == null){
         
          this.filtroBSQ = [];
          this.filtroBSQ.push({tipo:'tipoE',option:optionFinal})
          
        }else{
         var ok = false;
          this.filtroBSQ.forEach(fl => {
            if(fl.tipo == 'tipoE'){
              ok = true;
              fl.option = optionFinal;
            }
    
          });
  
          if(ok == false){
            this.filtroBSQ.push({tipo:'tipoE',option:optionFinal})
          }
        }
  
        localStorage.setItem('busquedaEmergencias2', JSON.stringify(this.filtroBSQ));
      }
  
      if(optionFinal == 'Atención inmediata' || optionFinal == 'Muy urgente' || optionFinal == 'Urgente' || optionFinal == 'Normal' || optionFinal == 'No urgente'){
        if(this.filtroBSQ == null){
         
          this.filtroBSQ = [];
          this.filtroBSQ.push({tipo:'nivelE',option:optionFinal})
        }else{
          var ok2= false;
          this.filtroBSQ.forEach(fl => {
            if(fl.tipo == 'nivelE'){
              ok2 = true;
              fl.option = optionFinal;
            }
  
    
          });
  
         
          if(ok2 == false){
            this.filtroBSQ.push({tipo:'nivelE',option:optionFinal})
          }
        }
  
        localStorage.setItem('busquedaEmergencias2', JSON.stringify(this.filtroBSQ));
      }
  
      if(this.type == 'busqueda'){
        this.buscarEmergencias(this.page)
      }
      this._router.navigate(['fundacion',this.idFun,'emergencias','busqueda']);
      
      
  
    }

    abrirEmergencia(emergencia){
      this.visEmer = true;
      this.pruebaID = emergencia._id;
      $("#modalVEmergencia").modal('show');
    }
}
