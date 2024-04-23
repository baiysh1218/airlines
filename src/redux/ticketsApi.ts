import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TicketType } from "../components/model";

interface GetTicketsParams {
  stops: string;
}

export const ticketsApi = createApi({
  reducerPath: "ticketsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    getTickets: builder.query<TicketType[], GetTicketsParams>({
      query: ({ stops }: GetTicketsParams) => `/tickets?${stops}`,
    }),
  }),
});

export const { useGetTicketsQuery } = ticketsApi;
