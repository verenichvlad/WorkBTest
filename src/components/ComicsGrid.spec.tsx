import "@testing-library/jest-dom";
import ComicsGrid from "./ComicsGrid";
import { QueryClient, QueryClientProvider } from "react-query";
import renderWithClient, { comicksMocks } from "../testUtils";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const baseMockedRes = {
  isLoading: false,
  error: false,
  data: comicksMocks.firstPage4Items,
};

let mockedRes = baseMockedRes;

vi.mock("../api/useGetComics", () => ({
  default: () => mockedRes,
}));

describe("Comics Grid", () => {
  it("displays progressbar when loading", () => {
    mockedRes = { ...mockedRes, isLoading: true };

    const render = renderWithClient(queryClient, <ComicsGrid />);

    expect(render).toMatchSnapshot();
  });

  it("displays an error message when api returns an error", () => {
    mockedRes = { ...baseMockedRes, error: true };

    const render = renderWithClient(queryClient, <ComicsGrid />);

    expect(
      render.getByText("Error occured while trying to fetch data")
    ).toBeInTheDocument();

    expect(render).toMatchSnapshot();
  });

  it("displays message when no comics were found", () => {
    mockedRes = { ...baseMockedRes, data: comicksMocks.noData };

    const render = renderWithClient(queryClient, <ComicsGrid />);

    expect(
      render.getByText("No comics were found for current character")
    ).toBeInTheDocument();

    expect(render).toMatchSnapshot();
  });

  it("displays 4 comics on the page", () => {
    mockedRes = { ...baseMockedRes };

    const render = renderWithClient(queryClient, <ComicsGrid />);

    expect(render.getByText("Title 1")).toBeInTheDocument();
    expect(render.getByText("Title 2")).toBeInTheDocument();
    expect(render.getByText("Title 3")).toBeInTheDocument();
    expect(render.getByText("Title 4")).toBeInTheDocument();

    expect(render).toMatchSnapshot();
  });

  it("displays disabled prev button for the first page", () => {
    mockedRes = { ...baseMockedRes };

    const render = renderWithClient(queryClient, <ComicsGrid />);

    expect(render.getByTestId("prevBtn")).toBeInTheDocument();
    expect(render.getByTestId("prevBtn")).toBeDisabled();
  });

  it("displays disabled next button when there are no next comics", () => {
    mockedRes = { ...baseMockedRes };

    const render = renderWithClient(queryClient, <ComicsGrid />);

    expect(render.getByTestId("nextBtn")).toBeInTheDocument();
    expect(render.getByTestId("nextBtn")).toBeDisabled();
  });
});
