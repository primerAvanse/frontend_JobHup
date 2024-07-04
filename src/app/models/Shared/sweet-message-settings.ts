export class SweetAlertUserSpecifiedProps {
    customClass?: any;
    position?: string;
    imageUrl?: string;
    timer?: number;
    title?: string;
    text?: string;
    html?: string;
    showCloseButton?: boolean;
  }
  
  export class SweetAlertSpecificProps {
    customClass: any;
    imageUrl: string;
    willClose?: Function;
  }
  
  export class SweetAlertErrorSpecificProps {
    customClass: any;
    imageUrl: string;
    willClose?: Function;
    title: string;
  }
  
  export class SweetConfirmUserSpecifiedProps {
    title?: string;
    text?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    showCloseButton?: boolean;
  }
  
  export const ALERT_SUCCESS_MESSAGES = {
    CREATE: 'El registro ha sido guardado correctamente.',
    EDIT: 'El registro ha sido editado correctamente.',
    DELETE: 'El registro ha sido eliminado correctamente.',
  };
  
  export const ALERT_ERROR_MESSAGES = {
    ERROR: 'Algo salió mal, vuelve a intentarlo',
  };