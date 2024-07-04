export class CanceledOrdersSales {
  CanceledOrdersSales: [CanceledOrdersSalesDetail];
}

export class CanceledOrdersSalesDetail {
  Amount: string;
  Date: string;
  WaiterName: string;
  CustomerName: string;
  Type: string;
}

export class SalesByMonth {
  SalesByMonth: [SalesByMonthDetail];
}


export class SalesByMonthDetail {
  Amount: string;
  Month: string;
  Quantity: string;
    }

export class SalesByWaiter {
  SalesByWaiter: [SalesByWaiterDetail];
}

export class SalesByWaiterDetail {
  Amount: string;
  Month: string;
  Quantity: string;
  WaiterName: string;
    }
