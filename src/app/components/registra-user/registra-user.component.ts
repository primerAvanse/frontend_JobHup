import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierMessageService } from 'src/app/models/Shared/NotifierMessageService';
import { SaveUsuario } from 'src/app/models/Usuario/usuario';
import { SweetMessageService } from 'src/app/services/shared/sweet-message.service';
import { UserioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-registra-user',
  templateUrl: './registra-user.component.html',
  styleUrls: ['./registra-user.component.scss']
})
export class RegistraUserComponent implements OnInit {

  form: FormGroup;

  constructor(private userioServiceService: UserioServiceService,
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
      txtNombre: ['', Validators.required],
      txtApePaterno: ['', Validators.required],
      txtApeMaterno: ['', Validators.required],
      txtDni: ['', Validators.required],
      txtFechaNacimineto: ['', Validators.required],
      txtSexo: ['', Validators.required],
      txtTelefono: ['', Validators.required],
      txtCorreo: ['', Validators.required],
      txtDireccion: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required]
    });

  }


  private formatRegistrarUsuarioToSave(): SaveUsuario {
    let datausua: SaveUsuario;
    if (this.form.invalid) {
      return null;
    }

    const val = this.form.value;

    if (val != undefined) {

      datausua = { Nombre : val.txtNombre,
      ApellidoPaterno : val.txtApePaterno,
      ApellidoMaterno : val.txtApeMaterno,
      Dni : val.txtDni,
      FechaNacimiento : val.txtFechaNacimineto,
      Sexo : val.txtSexo,
      Telefono : val.txtTelefono,
      Correo : val.txtCorreo,
      Direccion :val.txtDireccion,
      NombreUsua : val.user,
      ClaveUsua : val.password,
      }
      return datausua;

    } else {
      return null;
    }
  }

  onRegistrarUsuario() {

    this.messageService
      .confirm({
        title: '¿Desea guardar los cambios efectuados?',
        text: 'Se guardarán los datos especificados del usuario',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.value) {
          console.log("inicio save....");
          const usersave = this.formatRegistrarUsuarioToSave();
          console.log(" save: "  + JSON.stringify(usersave));
          if (usersave != null) {
            this.userioServiceService.registrarUsua(usersave)
              .subscribe((response) => {
                if (response) {
                  this.notifier.success('¡Usuario registrado con exito!',
                    () => {
                      this.navigate();
                    }
                  );
                } else {
                  this.notifier.error('¡Fallo el registro del usuario!',
                    () => {

                    }
                  );
                }
              });
          }
        }
      });
  }

  navigate() {
    this.router.navigateByUrl('/buscarempleo');
  }
  navigateRegister() {
    this.router.navigateByUrl('/registeruser');
  }

}
