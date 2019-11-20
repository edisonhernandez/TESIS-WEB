import { Component, OnInit,DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../../services/global';
import {AdopcionService} from '../../../services/adopcion.service';
import {UsuarioService} from '../../../services/usuario.service';
import { UsuarioFundacion } from '../../../models/usuarioFundacion';
declare var $:any;
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.component.html',
  styleUrls: ['./adopciones.component.css'],
  providers:[UsuarioService,AdopcionService,MatSnackBar]
})
export class AdopcionesComponent implements OnInit,DoCheck {
  public identity;
  public token;
  public imgCom;
  public opAd;
  public url;
  public fundacion:UsuarioFundacion;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;
  public itemsPerPage;
  public idFun;
  public titu;
  public adopciones:any;
  public carga;
  public advertencia;
  public mensaje
  public status;
  public valid;
  public filtroBSQ = [];
  public filtroBTN;
  public select;
  public type;
  public pagesSelec;
  public estados = ["Todos","pendiente","aprobado","negado"];

  constructor(private _route:ActivatedRoute,
    private _router:Router,private _usuarioService:UsuarioService,private _adopcionService:AdopcionService, private snackBar: MatSnackBar) {
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    this.filtroBSQ = this._adopcionService.obtFiltro();

    this.url = GLOBAL.url;
    this.page = 1;
    this.carga = true;

   }

  ngOnInit() {
    this.actualPage2();
    $(document).ready(()=>{
      $("#tamDrop").change(()=>{

        this.select = $("#tamDrop").val();
        this.filtroBSQD(this.select)
    });

  });
  }
  ngDoCheck(){
    this.identity = this._usuarioService.obtIdentity();
    this.token = this._usuarioService.obtToken();
    this.filtroBSQ = this._adopcionService.obtFiltro();

  }
  actualPage2(){

    this.type = '';
    this.pagesSelec = []
    this._route.params.subscribe(params =>{
      let tipo = params['tipo']
      let option = params['option'];
      this.type = option;
      let id = params['id'];
      if(this.identity != null){
      
        if(this.identity.rol == '4' && this.identity._id == id){
         this.valid == true;
         this.obtFundacion(id);
      if(tipo == 'adopciones' && id == this.identity._id){
        this.idFun = id;
        this.titu = tipo;
      let page = +params['page'];
     
      this.page = page;
      
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
        //devolver listado de usuarios
        console.log(this.filtroBSQ)
        this.buscarAdopciones(page)
        $(document).ready(()=>{
        this.filtroBSQ.forEach(elem => {
          if(elem.tipo == 'tam'){
            $("#tamDrop").val(elem.option)
          }
          if(elem.tipo == 'sexo'){
            $("#sexoDrop").val(elem.option)
          }
          if(elem.tipo == 'edad'){
            $("#edadDrop").val(elem.option)
          }
        });
      });
      }else{
        $(document).ready(()=>{
        $("#tamDrop").val('Todos')
        $("#sexoDrop").val('Todos')
        $("#edadDrop").val('Todos')
        })
        console.log("entroN")
        this.filtroBTN = false;
        //devolver listado de adopciones
        this.obtAdopciones(page);      }
      
    }
        }else if(this.identity.rol == '1'){
          this._router.navigate(['admin','panel-usuarios','fundaciones']);

        }else{
         this._router.navigate(['mascotas','todos']);
    
        }
    
      }else{
       this._router.navigate(['mascotas','todos']);
      }
      
    });
    
  }
  cancelarBus(){
   
    //this.bus = false;
    localStorage.removeItem('busquedaAdopciones');
    this._router.navigate(['fundacion/',this.idFun,'adopciones','all']);
  }
  verFoto(foto,op){
    
    this.imgCom = foto;
    this.opAd = op;
    $('#modalComprobante').modal('show')
    console.log(this.imgCom)

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
  obtAdopciones(page){
    this.pagesSelec = []
    this._adopcionService.obtAdopciones(page,this.identity._id,this.token).subscribe(
      response =>{
        this.advertencia = false;
        this.carga = false;
        this.adopciones = response.adopciones;
        console.log(this.adopciones)
         this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          if(page > this.pages){
            this._router.navigate(['fundacion', this.identity._id,'adopciones','all']);
          }
        
      },
      error=>{
        this.carga = false;
        this.advertencia = true;
        console.log(<any>error)
        var errorMessage = <any>error;
        console.log(errorMessage)
        this.carga = false;
        this.advertencia = true;
       this.status = "error"
        if(errorMessage != null && error.error.n == '2'){
        
          this.mensaje = 'Lo sentimos, no se encontro adopciones';
        }else if(errorMessage != null && error.error.n == '3'){
       
          this.mensaje = 'Algo salio mal, intentalo mas tarde';
        }else{
       
          this.mensaje = 'Algo salio mal, intentalo mas tarde'
        }
      }
    )
  }
  buscarAdopciones(page,adding=false){
   this.pagesSelec = []
    this._adopcionService.filtroAdopciones(this.idFun,this.filtroBSQ,page).subscribe(
      response=>{
        this.carga = false;
        if(response.adopciones && response.n == '1'){
          

          $(".carga").fadeOut("slow");
         
          this.advertencia = false;
         // this.fotos = response.fot;
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          this.adopciones = response.adopciones;
         // this.itemsMSC = this.mascotas.length;
          this.status ='success';
         
          for (let i = 1; i <= this.pages; i++) {
            this.pagesSelec.push(i)
            
          }
          //this.obtFotos(response.mascotas._id, page);
          if(page > this.pages){
            this._router.navigate[('/login')]
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
          this.adopciones = null;
          this.snackBar.open('No se encontro resultados','Cerrar', {
            duration: 2000,
          });
         
        }else if(errorMessage != null && error.error.n == '5'){
          this.mensaje = 'No se ha elegigo filtros';
          this.snackBar.open(this.mensaje,'Cerrar', {
            duration: 2000,
          });
          this.adopciones = null;
        }
        
        else{
  
          //this.n = 'n';
          
          this.mensaje = 'Algo salio mal, intentalo mas tarde'
          this.snackBar.open(this.mensaje,'Cerrar', {
            duration: 2000,
          });
          
        }
      }
    )
  }
  filtroBSQD(option){

    console.log("entrp")
    var optionFinal = option;
    if(optionFinal == 'pendiente' || optionFinal == 'aprobado' || optionFinal == 'negado'){
      
      if(this.filtroBSQ == null){
       
        this.filtroBSQ = [];
        this.filtroBSQ.push({tipo:'estado',option:optionFinal})
        
      }else{
       var ok = false;
        this.filtroBSQ.forEach(fl => {
          if(fl.tipo == 'estado'){
            ok = true;
            fl.option = optionFinal;
          }
  
        });

        if(ok == false){
          this.filtroBSQ.push({tipo:'estado',option:optionFinal})
        }
      }

      localStorage.setItem('busquedaAdopciones', JSON.stringify(this.filtroBSQ));
    }

    if(this.type == 'busqueda'){
      this.buscarAdopciones(this.page)
    }
    this._router.navigate(['fundacion',this.idFun,'adopciones','busqueda']);
    
    

  }
}
