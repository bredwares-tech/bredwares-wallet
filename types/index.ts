export interface Order {
  orderId: string;
  title: string;
  status: string;
  createdDate: string;
  total: {
    displayValue: string;
    value: string;
    currency: string;
    processingFee:string
  };
  image?: string; // Optional property for the order image URL
}
