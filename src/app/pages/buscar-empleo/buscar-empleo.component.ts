import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleoResponse } from 'src/app/models/Empleo/EmpleoDto';
import { NotifierMessageService } from 'src/app/models/Shared/NotifierMessageService';
import { EmpleoService } from 'src/app/services/empleo.service';
import { SweetMessageService } from 'src/app/services/shared/sweet-message.service';

@Component({
  selector: 'app-buscar-empleo',
  templateUrl: './buscar-empleo.component.html',
  styleUrls: ['./buscar-empleo.component.scss']
})
export class BuscarEmpleoComponent implements OnInit {
  form: FormGroup;
  listaEmpleos: EmpleoResponse[] = [];
  arrayEmpleos: any[] = [];
  empleoSelect: EmpleoResponse;

  constructor(private empleoService: EmpleoService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: SweetMessageService,
    private notifier: NotifierMessageService) {

  }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      lCategoria: [0, [Validators.required]],
      lCiudad: [0, [Validators.required]],
    });

  }

  private loadData(IdCategoria: Number, idCiudad: Number) {
    console.log("usuario sesion " + IdCategoria);
    this.empleoService.ListarEmpleos(IdCategoria, idCiudad)
      .subscribe((x: EmpleoResponse[]) => {
        this.listaEmpleos = x;
        console.log("lista obtenida " + JSON.stringify( this.listaEmpleos ));
        
      });
  }

  
  public filtrarEmpleos = function () {
    console.log("valores formulario: " + JSON.stringify(this.form.value));
    this.loadData(this.form.value.lCategoria,this.form.value.lCiudad);
  };

  receiveEvent(empleo: EmpleoResponse) {
    this.empleoSelect = empleo;
    console.log("EMPLEO SELECT " + this.empleoSelect);
  }

}
