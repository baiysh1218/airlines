import React, { useState, useEffect } from "react";
import { useGetTicketsQuery } from "../redux/ticketsApi";
import TicketsCard from "./TicketsCard";
import airlines from "../assets/icons8-airplane-65.png";
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { Currency, TicketType } from "./model";

interface TransplantOption {
  key: string;
  keyOrigin: string;
}

const currencyArray: Currency[] = ["RUB", "USD", "EUR"];

const transplantArray: TransplantOption[] = [
  { key: "", keyOrigin: "Все" },
  { key: "0", keyOrigin: "Без пересадок" },
  { key: "1", keyOrigin: "1 пересадка" },
  { key: "2", keyOrigin: "2 пересадки" },
  { key: "3", keyOrigin: "3 пересадки" },
];

const TicketsList: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>("RUB");
  const [selectedTransplants, setSelectedTransplants] = useState<string[]>([
    "",
  ]);
  const queryString = selectedTransplants
    .filter((stop) => stop !== "")
    .map((stop) => `stops=${stop}`)
    .join("&");
  const { data, isError, isLoading } = useGetTicketsQuery({
    stops: queryString,
  });

  useEffect(() => {
    if (selectedTransplants.length === transplantArray.length - 1) {
      setSelectedTransplants([""]);
    }
  }, [selectedTransplants]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const handleTransplantChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "") {
      setSelectedTransplants([""]);
    } else {
      if (selectedTransplants.includes("")) {
        setSelectedTransplants([value]);
      } else {
        setSelectedTransplants(
          selectedTransplants.includes(value)
            ? selectedTransplants.filter((item) => item !== value)
            : [...selectedTransplants, value]
        );
      }
    }
  };

  return (
    <>
      <img src={airlines} alt="" className="tickets_list_img" />
      <div className="ticket_list">
        <div className="menu">
          <div className="top">
            <h2>Валюта</h2>
            <ButtonGroup
              variant="outlined"
              size="large"
              aria-label="Basic button group"
            >
              {currencyArray.map((item) => (
                <Button
                  key={item}
                  variant={item === currency ? "contained" : "outlined"}
                  onClick={() => setCurrency(item)}
                >
                  {item}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div className="bottom">
            <h2>Количество пересадок</h2>
            <FormControl>
              {transplantArray.map((item) => (
                <FormControlLabel
                  key={item.key}
                  value={item.key}
                  control={
                    <Checkbox
                      checked={selectedTransplants.includes(item.key)}
                      onChange={handleTransplantChange}
                      sx={{
                        color: "#1976D2",
                        "&.Mui-checked": {
                          color: "#1976D2",
                        },
                      }}
                    />
                  }
                  label={item.keyOrigin}
                  labelPlacement="end"
                  disabled={
                    item.key === "" &&
                    selectedTransplants.length === transplantArray.length - 1
                  }
                />
              ))}
            </FormControl>
          </div>
        </div>
        <div className="list">
          {data?.map((ticket: TicketType, index: number) => (
            <TicketsCard currency={currency} key={index} data={ticket} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TicketsList;
