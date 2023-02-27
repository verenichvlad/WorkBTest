import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

export const comicksMocks = {
  noData: {
    data: {
      results: [],
    },
  },
  firstPage4Items: {
    data: {
      results: [
        {
          id: 1,
          title: "Title 1",
          images: [],
          dates: [],
          creators: { items: [] },
        },
        {
          id: 2,
          title: "Title 2",
          images: [],
          dates: [],
          creators: { items: [] },
        },
        {
          id: 3,
          title: "Title 3",
          images: [],
          dates: [],
          creators: { items: [] },
        },
        {
          id: 4,
          title: "Title 4",
          images: [],
          dates: [],
          creators: { items: [] },
        },
      ],
    },
  },
};

export default function renderWithClient(
  client: QueryClient,
  ui: React.ReactElement
) {
  const { rerender, ...result } = render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={client}>{rerenderUi}</QueryClientProvider>
      ),
  };
}
