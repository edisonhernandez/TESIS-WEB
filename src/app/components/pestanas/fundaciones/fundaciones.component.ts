import { Component, OnInit,DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsuarioFundacion} from '../../../models/usuarioFundacion';
import {GLOBAL} from '../../../services/global';
import {UsuarioService} from '../../../services/usuario.service';
import {NotificacionService} from '../../../services/notificacion.service';
import {Notificacion} from '../../../models/notificacion';
import {UploadService} from '../../../services/upload.service';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';

declare var $:any;
@Component({
  selector: 'app-fundaciones',
  templateUrl: './fundaciones.component.html',
  styleUrls: ['./fundaciones.component.css'],
  providers:[UsuarioService,UploadService, NotificacionService]
})
export class FundacionesComponent implements OnInit,DoCheck {
  public sectores = ["Todos","Norte","Centro","Sur"];
  public pagesSelec=[]
  public identity;
  public token;
  public url;
  public statusM;

  public mensaje;
  public n;
  public advertencia;
  public status;

  public page;
  public total;
  public pages;
  public itemsPerPage;
  public fundacionesB:UsuarioFundacion[];

  public fundaciones:UsuarioFundacion[];
  public next_page;
  public prev_page;
  public newFund;

  public usuarioFundacion:UsuarioFundacion;
  public notificacion:Notificacion;
  public imgUN2:any;
  public imL2 = false;

  public carga;
  public busqueda;
  public itemsFund;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);
  public select;
  public filtroBTN;
  public filtroBSQ = [];
  public type;

  constructor(private _route:ActivatedRoute,
    private _router:Router, private _usuarioService:UsuarioService, private _notificacionService:NotificacionService,private _uploadService:UploadService) { 
      $(function (){
        $('[data-toggle="tooltip"]').tooltip()
      })
      this.type = ''
      this.identity = this._usuarioService.obtIdentity();
      this.token = this._usuarioService.obtToken();

      this.usuarioFundacion = new UsuarioFundacion(
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",

        "",
        "",

        "",
        "",

        ""
   
      )
      this.notificacion = new Notificacion(
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      )
      this.newFund = false;
      this.carga = true;
      this.busqueda = false;
      this.advertencia = false;
      this.filtroBSQ = this._usuarioService.obtFiltro();

    }

  ngOnInit() {
    if(this.identity){
      if(this.identity.rol == '4'){
        this._router.navigate(['fundacion',this.identity._id,'nosotros','all']);
      }
    }
    $(function (){
      $('[data-toggle="tooltip"]').tooltip()
    })
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    
    this.url = GLOBAL.url;
    this.page = 1;
    $(document).ready(()=>{
      $("#sectorDrop").change(()=>{

        this.select = $("#sectorDrop").val();
        this.filtroBSQD(this.select)
    });

  }); 
    this.actualPage();
    this.prob();
  }
  ngDoCheck(){
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    this.filtroBSQ = this._usuarioService.obtFiltro();

  }
  prob(){

    $("#bsFunNombre").keyup(()=>{
      this.obtnerFundacionesByNombre();
      this.busqueda = true;
  
  }); 
  }

  obtnerFundacionesByNombre(){
   
    const nombre = $("#bsFunNombre").val();
   
    const resultado = document.querySelector('#busquedaUsers');

    if(nombre != ''){
      this._usuarioService.obtFundacionesByNombre(nombre).subscribe(
        response=>{
         
          if(response.usuarios && response.n == '1'){

            
            
            this.fundaciones = response.usuarios;
            this.itemsFund = this.fundaciones.length;
            this.total = this.fundaciones.length;
            if(this.fundaciones.length > 3 ){
              $('#bsFN').addClass('cloBus')
            }else{
              $('#bsFN').removeClass('cloBus')
            }
            $('.clothes-pics figure').each(function(i){
          
              setTimeout(function(){
                $('.clothes-pics figure').eq(i).addClass('is-showing');
              }, 150 * (i+1));
            });
            

          }
        },
        error=>{
          this.carga = false;
          $(".carga").fadeOut("slow");
          var errorMessage = <any>error;
          console.log(errorMessage);
          this.advertencia = true;
          this.status = 'error';
          if(errorMessage != null && error.error.n == '2'){
            this.status = 'error';  
            this.mensaje = 'Lo sentimos, no se encontro fundaciones';
          }else if(errorMessage != null && error.error.n == '3'){
            this.status = 'error';  
            this.mensaje = error.error.message;
          }else{
            this.n = 'n';
            this.status = 'error';
            this.mensaje = 'Algo salio mal, intentalo de nuevo.'
          }
        }
      )
    }else{
      
     this.actualPage();
    }

  }
  cancelarBusqueda(){
    this.filtroBTN = false;
    localStorage.removeItem('busquedaFundacionesSC');
    this._router.navigate(['fundaciones','todos']);
    this.busqueda = false;
    
  }
  efectCards(){

    $(document).ready(()=>{
      var wScroll = $(window).scrollTop();
    
      $('.logo').css({
        'transform' : 'translate(0px, '+ wScroll /4 +'%)'
      });
    
      $('.back-bird').css({
        'transform' : 'translate(0px, '+ wScroll /4 +'%)'
      });
    
      $('.fore-bird').css({
        'transform' : 'translate(0px, -'+ wScroll /20 +'%)'
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
    
      $('.back-bird').css({
        'transform' : 'translate(0px, '+ wScroll /4 +'%)'
      });
    
      $('.fore-bird').css({
        'transform' : 'translate(0px, -'+ wScroll /20 +'%)'
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
  actualPage(){
    this.type = ''
    this._route.params.subscribe(params =>{
      let page = +params['page'];
      this.page = page;
      let tipo = params['tipo'];
      this.type = tipo;
      console.log(this.type)
     
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
        console.log("actypeBUS")
        this.filtroBTN = true;
       
        this.buscarFundaciones(page)
        this.filtroBSQ.forEach(elem => {
          if(elem.tipo == 'sec'){
          
            $(document).ready(()=>{
              $("#sectorDrop").val(elem.option)
            });
          
          }
          
        });
        
       
       
      }else{
        console.log("actypeOBT")
        $(document).ready(()=>{
          $("#sectorDrop").val('Todos')
        });
       
        this.filtroBTN = false;
        //devolver listado de usuarios
        this.obtFundacionesActivas(page);
      }
      //devolver listado de usuarios
    });
  }

  obtFundacionesActivas(page){
    console.log("ENTROOOOOO")
    this.pagesSelec=[]
    let rol = 4;
   
    this.status = 'procesando';
    
    this._usuarioService.obtUsuariosRol(page, rol).subscribe(
      response=>{
        this.efectCards()

        if(response.usuarios && response.n == '1'){
          this.carga = false;

          $(".carga").fadeOut("slow");
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          this.fundaciones = response.usuarios;
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          this.itemsFund = this.fundaciones.length * page;
          this.advertencia = false;
          this.status ='success';
         
          if(page > this.pages){
            this._router.navigate(['/fundaciones/todos/1'])
          }
          

        }else{
          console.log(response.n)
          this.status = 'error';
          this.mensaje = 'Algo salió mal.'
        }
      },
      error=>{
        this.carga = false;
        $(".carga").fadeOut("slow");
        var errorMessage = <any>error;
        console.log(errorMessage);
        this.advertencia = true;
        this.status = 'error';
        if(errorMessage != null && error.error.n == '2'){
          this.status = 'error';  
          this.mensaje = 'Lo sentimos, no existe fundaciones registradas.';
        }else if(errorMessage != null && error.error.n == '3'){
          this.status = 'error';  
          this.mensaje = error.error.message;
        }else{
          this.n = 'n';
          this.status = 'error';
          this.mensaje = 'Algo salio mal, intentalo de nuevo.'
        }
      }
    )
  }
  filtroBSQD(option){

    
    var optionFinal = option;
    if(optionFinal == 'Norte' || optionFinal == 'Centro' || optionFinal == 'Sur'){
      
      if(this.filtroBSQ == null){
       
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'sec',option:optionFinal})
        
      }else{
       var ok = false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'sec'){
            ok = true;
            fl.option = optionFinal;
          }
  
        });

        if(ok == false){
          this.filtroBSQ.push({tipo:'sec',option:optionFinal})
        }
      }

      localStorage.setItem('busquedaFundacionesSC', JSON.stringify(this.filtroBSQ));
    }

    
    if(this.type == 'busqueda'){
      this.buscarFundaciones(this.page)
    }
      
    this._router.navigate(['fundaciones','busqueda']);
    
    

  }
  buscarFundaciones(page,adding=false){
    console.log("ENTROBUSQUEDA")
    this.pagesSelec = []
 
        this._usuarioService.filtroFundaciones(this.filtroBSQ,page).subscribe(
          response=>{
           
            this.carga = false;
            $(".carga").fadeOut("slow");
            this.efectCards()
            if(response.fundaciones && response.n == '1'){
             
              this.total = response.total;
              this.pages = response.pages;
              this.itemsPerPage = response.itemsPerPage;
              this.fundaciones = response.fundaciones;
              for (let i = 1; i <= this.pages; i++) {
                this.pagesSelec.push(i)
                
              }
              this.itemsFund = this.fundaciones.length * page;
              this.advertencia = false;
              this.status ='success';
              //this.obtFotos(response.mascotas._id, page);
              if(page > this.pages){
                this._router.navigate[('/fundaciones/todos/1')]
              }
            }
          },
          error=>{
            this.carga = false;
            this.total = 0;
            this.advertencia =true;
            this.status = 'error';  
            $(".carga").fadeOut("slow");
            var errorMessage = <any>error;
           
            
            if(errorMessage != null && error.error.n == '2'){
              this.mensaje = 'Lo sentimos, '+error.error.message;
            }else if(errorMessage != null && error.error.n == '5'){
              this.mensaje = 'No se ha elegigo filtros';
            }
            
            else{
      
              this.n = 'n';
              
              this.mensaje = 'Algo salio mal, intentalo mas tarde'
            }
          }
        )
      }

  newFundacion(){
    this.newFund =true;
  }

 /* registrarNotificacion(idde){
    this.notificacion.idde = idde;
    this.notificacion.mensaje = 'Tienes una nueva fundación por aprobar';
    this._notificacionService.registerNotificacion(this.notificacion).subscribe(
      response =>{
        if(response.notificacion && response.notificacion._id){
         
          console.log(response.notificacion);
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  
  }*/

  registrarFundacion(form){
    $('#modalFundacion').modal('show');

   if(this.filesToUpload2 != undefined){
    this.advertencia = true;
    this.status = 'procesando';
    
    this._usuarioService.registerFundacion(this.usuarioFundacion,'fund').subscribe(
      response =>{
       //this.usuarioFundacion2 = response.usuario;
        if(response.usuario && response.usuario._id && response.n == '1'){ 
          //this.registrarNotificacion(response.usuario._id);
            this._uploadService.makeGileRequest2(this.url+'subir-foto-fundacion/'+response.usuario._id,[],this.filesToUpload2,'logo')
            .then((result:any)=>{
              //alert('si')
              
              
              if(result.n == '5' || result.n == '4' || result.n == '2'  || result.n == '1'){
                this.status='error';
                this.mensaje = result.message;
                /*this.imL3 = false;
                this.filesToUpload3 = undefined;
                form.reset();
                setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);*/
                this._usuarioService.borrarUsuario(response.usuario._id).subscribe(
                  response=>{
                    
                  },
                  error=>{

              })
              }else if(result.n == '3'){
               /* this.statusNewPor='success';
                //this.mensajeNewPor = response.message;
                
                form.reset();
                this.filesToUpload3 = undefined;
                this.imL3 = false;
                setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);*/
               
                this.usuarioFundacion.logo = result.logo;
                form.reset();
                this.mensaje = response.message;
                this.status = 'success';
               
            
              
               
              }else{
                this.status = 'error';
                this.mensaje = 'Algo salio mal al subir la foto.'
              }



            });
           
           /*form.reset();
           this.status='success';
           this.proRegistro = null;*/
           
         
        
        }else if(response.n == '4'|| response.n == '6'){
          
          this.status='error';
          this.mensaje= response.message;
          

        }else {
          this.status='error';
          this.mensaje ='Algo salió mal al procesar el registro, inténtalo mas tarde.';
          console.log(response.n + response.message);
         

        }
      },
      error =>{
        console.log(<any>error);
        if((error != null && error.error.n == '5') || (error != null && error.error.n == '3') || (error != null && error.error.n == '2')){
          this.status ='error';
          this.mensaje = error.error.message;
        }else{
          this.status = 'error';
          this.mensaje = 'Algo salió mal al procesar el registro.';
        }
        
      }
    );
   }else{
     this.status = 'error';
     this.mensaje = 'Por favor, debes subir una imagen';
   }
   
  }

    //para fundaciones
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
  
}
