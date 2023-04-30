export interface InputData {
  ISO_date: string;
  log_level: string;
  message: {
    transactionId: string;
    details: string;
    user: {
      id: number;
      orders: object[];
    };
    code: number;
    err: string;
  };
}
