import React, { FC } from "react";
import { Currency, TicketCardProp } from "./model";
import turkishAirlines from "../assets/kisspng-airbus-a330-boeing-777-turkish-airlines-logo-airline-5abee4df6e97b0.345863301522459871453.png";
import airline from "../assets/icons8-airplane-24.png";

const TicketsCard: FC<TicketCardProp> = ({ data, currency }) => {
  function formatDate(dateString: string): string {
    const months = [
      "янв",
      "февр",
      "марта",
      "апр",
      "мая",
      "июня",
      "июля",
      "авг",
      "сент",
      "окт",
      "нояб",
      "дек",
    ];
    const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

    const parts = dateString.split(".");
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]) + 2000;

    const date = new Date(year, month - 1, day);
    const monthName = months[month - 1];
    const dayOfWeek = daysOfWeek[date.getDay()];

    const formattedDate = `${day} ${monthName} ${year}, ${dayOfWeek}`;

    return formattedDate;
  }

  const convertCurrency = (price: number, toCurrency: Currency): number => {
    const exchangeRates: Record<Currency, Record<Currency, number>> = {
      RUB: {
        USD: 1 / 93,
        EUR: 1 / 93 / 1.1,
        RUB: 1,
      },
      USD: {
        RUB: 93,
        EUR: 1.1,
        USD: 1,
      },
      EUR: {
        USD: 1.1,
        RUB: 93 * 1,
        EUR: 1,
      },
    };

    if (!("RUB" in exchangeRates) || !(toCurrency in exchangeRates["RUB"])) {
      throw new Error("Невозможно конвертировать между указанными валютами");
    }

    const conversionRate = exchangeRates["RUB"][toCurrency];
    return Math.round(price * conversionRate);
  };

  return (
    <div className="tickets_card">
      <div className="left">
        <img src={turkishAirlines} alt="" width={200} />
        <button>
          Купить за {convertCurrency(data.price, currency as Currency)}{" "}
          {currency}
        </button>
      </div>
      <hr className="left_hr" />
      <div className="departure">
        <h4>{data.departure_time}</h4>
        <p>
          {data.origin}, {data.origin_name}
        </p>
        <span>{formatDate(data.departure_date)}</span>
      </div>
      <div className="center">
        <p>
          {data.stops} {data.stops !== 1 ? "Пересадки" : "Пересадка"}
        </p>
        <div>
          <hr />
          <img src={airline} alt="" />
        </div>
      </div>
      <div className="arrival">
        <h4>{data.arrival_time}</h4>
        <p>
          {data.destination}, {data.destination_name}
        </p>
        <span>{formatDate(data.arrival_date)}</span>
      </div>
    </div>
  );
};

export default TicketsCard;
