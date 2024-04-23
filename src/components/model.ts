export type TicketType = {
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  carrier: string;
  stops: number;
  price: number;
};

export type TicketCardProp = {
  data: TicketType;
  currency: string;
};

export type Currency = "RUB" | "USD" | "EUR";
