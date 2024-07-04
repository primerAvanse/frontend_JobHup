import { Injectable } from '@angular/core';
import { SweetAlertSpecificProps, SweetAlertUserSpecifiedProps, SweetConfirmUserSpecifiedProps } from 'src/app/models/Shared/sweet-message-settings';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetMessageService {

  constructor() {}
  public static CancelReason = Swal.DismissReason.cancel;
  public static CloseReason = Swal.DismissReason.close;
  private confirmDefaultProps = {
    text: '¿Realmente desea confirmar la operación?',
    showCloseButton: true,
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    position: 'center',
    customClass: {
      header: 'custom-confirm-header',
      title: 'custom-confirm-title',
      image: 'custom-confirm-image',
      content: 'custom-confirm-content',
      actions: 'custom-confirm-actions',
      confirmButton: 'custom-confirm-accept',
      cancelButton: 'custom-confirm-cancel',
    },
  };

  private alertDefaultProps = {
    position: 'center',
    text: 'La operación se realizó con éxito',
    allowOutsideClick: false,
    showCloseButton: true,
    timer: 2000,
    // confirmButtonText: 'Continuar',
    showConfirmButton: false,
  };
  private alertDefaultPropsMasTiempo = {
    position: 'center',
    //text: 'La operación se realizó con éxito',
    allowOutsideClick: false,
    showCloseButton: true,
    timer: 8000,
    showConfirmButton: true,
  };

  confirm(
    userProps: SweetConfirmUserSpecifiedProps
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      ...this.confirmDefaultProps,
      ...userProps,
    } as SweetAlertOptions);
  }

  success(
    userProps: SweetAlertUserSpecifiedProps,
    onCloseFn: Function = () => {}
  ) {
    const specificProps: SweetAlertSpecificProps = {
      customClass: {
        image: 'custom-alert-image',
        content: 'custom-alert-content',
      },
      imageUrl: './assets/icons/success.svg',
      willClose: () => onCloseFn(),

    };
    this.createAlert(userProps, specificProps);
  }

  error(
    userProps: SweetAlertUserSpecifiedProps,
    onCloseFn: () => void = () => {}
  ) {
    const specificProps: SweetAlertSpecificProps = {
      customClass: {
        image: 'custom-alert-image',
        content: 'custom-alert-content',
      },
      imageUrl: './assets/icons/error.svg',
      willClose: () => onCloseFn(),
    };
    this.createAlert(userProps, specificProps);
  }

  warning(
    userProps: SweetAlertUserSpecifiedProps,
    onCloseFn: () => void = () => {}
  ) {
    const specificProps: SweetAlertSpecificProps = {
      customClass: 'swalMed-warning',
      imageUrl: './assets/icons/warning.svg',
      willClose: () => onCloseFn(),
    };
    this.createAlert(userProps, specificProps);
  }
  warningValidacion(
    userProps: SweetAlertUserSpecifiedProps,
    onCloseFn: () => void = () => {}
  ) {
    const specificProps: SweetAlertSpecificProps = {
      customClass: 'swalMed-warning',
      imageUrl: './assets/icons/warning.svg',
      willClose: () => onCloseFn(),
    };
    this.createAlertValidacion(userProps, specificProps);
  }
  private createAlert(
    userProps: SweetAlertUserSpecifiedProps,
    specificProps: SweetAlertSpecificProps
  ) {
    const alertFinalProps: any = {
      ...this.alertDefaultProps,
      ...userProps,
      ...specificProps,
    };
    Swal.fire({
      ...alertFinalProps,
    } as SweetAlertOptions);
  }

  private createAlertValidacion(
    userProps: SweetAlertUserSpecifiedProps,
    specificProps: SweetAlertSpecificProps
  ) {
    const alertFinalProps: any = {
      ...this.alertDefaultPropsMasTiempo,
      ...userProps,
      ...specificProps,
    };
    Swal.fire({
      ...alertFinalProps,
    } as SweetAlertOptions);
  }

}
