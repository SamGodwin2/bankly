import { render, screen } from "@testing-library/react";
import { Home } from ".";
import { transactions } from "../../api/data/transactions";
import { accounts } from "../../api/data/accounts";

import * as fetchUtil from "../../hooks/useFetch";

jest.mock("../../hooks/useFetch");

describe("transaction history", () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
  it("should render the screen with data correctly", () => {
    jest
      .spyOn(fetchUtil, "useFetch")
      .mockImplementationOnce(() => ({
        data: accounts,
        loading: false,
        error: null,
        refresh: () => {},
      }))
      .mockImplementationOnce(() => ({
        data: transactions,
        loading: false,
        error: null,
        refresh: () => {},
      }));
    render(<Home />);

    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(
      screen.getByText(
        `${transactions
          .filter((trx) => trx.category !== "income")[0]
          .amount.value.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
          })}`
      )
    ).toBeInTheDocument();
  });

  it("should render loading states when loading", () => {
    jest
      .spyOn(fetchUtil, "useFetch")
      .mockImplementationOnce(() => ({
        data: {},
        loading: true,
        error: null,
        refresh: () => {},
      }))
      .mockImplementationOnce(() => ({
        data: {},
        loading: true,
        error: null,
        refresh: () => {},
      }));
    render(<Home />);
    expect(screen.getByText("Your accounts"));
    expect(screen.getByText("Transaction History"));
    expect(screen.getAllByText("Loading...")).toHaveLength(2);
  });

  it("should render error states when errored", () => {
    jest
      .spyOn(fetchUtil, "useFetch")
      .mockImplementationOnce(() => ({
        data: {},
        loading: false,
        error: "oh no!",
        refresh: () => {},
      }))
      .mockImplementationOnce(() => ({
        data: {},
        loading: false,
        error: "Oh no!",
        refresh: () => {},
      }));
    render(<Home />);
    expect(screen.getByText("Your accounts"));
    expect(screen.getByText("Transaction History"));
    expect(
      screen.getAllByText("Uh oh looks like something's gone wrong...")
    ).toHaveLength(2);
  });
});
