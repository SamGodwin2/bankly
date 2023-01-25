import { render, screen, fireEvent } from "@testing-library/react";
import { TransactionHistory } from ".";
import { transactions } from "../../api/data/transactions";

describe("transaction history", () => {
  test("the expenses tab should be shown by default", () => {
    render(<TransactionHistory transactions={transactions} />);

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

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

  test("changing between the expenses and income tabs should show different transactions", async () => {
    render(<TransactionHistory transactions={transactions} />);

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });
    const incomeTabTrigger = screen.getByRole("tab", {
      name: "Income",
    });
    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });
    const incomeTable = screen.queryByRole("table", {
      name: "Income",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(incomeTable).not.toBeInTheDocument();

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

    fireEvent.mouseDown(incomeTabTrigger);

    expect(incomeTabTrigger).toHaveAttribute("data-state", "active");
    expect(expensesTabTrigger).toHaveAttribute("data-state", "inactive");
    expect(
      screen.getByText(
        `${transactions
          .filter((trx) => trx.category === "income")[0]
          .amount.value.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
          })}`
      )
    ).toBeInTheDocument();
  });
});
