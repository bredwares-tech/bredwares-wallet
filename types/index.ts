export interface Order {
  orderId: string;
  title: string;
  status: string;
  createdDate: string;
  total: {
    value: string;
    currency: string;
  };
  image?: string; // Optional property for the order image URL
}
