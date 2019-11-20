import { Component, OnInit } from '@angular/core';
import { CompiladorService } from '../../services/compilador.service.service';
import { ArchivoService } from '../../services/archivo.service'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  public text:string = "";
  constructor( private compilador_service:CompiladorService,
               private archivo_service:ArchivoService ) {
   }

  ngOnInit() {
    this.text = this.archivo_service.archivo['texto'];
  }


  compilar(){
    if(this.text != ""){
      this.compilador_service.verificarCompilacion(this.text).subscribe(resultado =>{
        if(resultado){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sin Errores!!',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Se encontro error en el codigo, verifica!'
          })
        }
      }); 
    }
  }

  guardar(){
    if(this.archivo_service.archivo['nombreArchivo'] == ""){
      Swal.fire({
        title: 'Nombre del archivo',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.value) {
          this.archivo_service.crearArchivo(this.text,result.value).subscribe(data => {
              console.log("ok")
          });
        }
      });
    }else{
      this.archivo_service.actualizarArchivo(this.text).subscribe(data => {
        console.log("guardado")
      })
    }
    
  }

  nuevoArchivo(){
    this.archivo_service.archivo = {
      'id':0,
      'id_user':0,
      'nombreArchivo':"",
      'texto':"",
    };
    this.text="";
  }

}
