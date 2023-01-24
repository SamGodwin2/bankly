import * as Tabs from "@radix-ui/react-tabs";
import { Transaction as TransactionType } from "../../../types";
import "./index.css";
import { Transaction } from "./item";

type Props = { transactions: TransactionType[] };

const isExpense = (transaction: TransactionType) =>
  transaction.amount.value < 0;
const isIncome = (transaction: TransactionType) => transaction.amount.value > 0;

const Expenses = ({ transactions }: Props) => {
  return (
    <table aria-label="Expenses">
      <thead>
        <tr className="table-header">
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.filter(isExpense).map((transaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </tbody>
    </table>
  );
};

const Income = ({ transactions }: Props) => {
  return (
    <table aria-label="Income">
      <thead>
        <tr className="table-header">
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.filter(isIncome).map((transaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </tbody>
    </table>
  );
};

export const TransactionHistory = ({ transactions }: Props) => {
  return (
    <>
      <h1 className="align-left">Transaction History</h1>
      <Tabs.Root defaultValue="expenses" className="flow">
        <Tabs.List className="tabs__list" aria-label="Filter your transactions">
          <Tabs.Trigger value="expenses" className="tabsButton">
            Expenses
          </Tabs.Trigger>
          <Tabs.Trigger value="income" className="tabsButton">
            Income
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content className="TabsContent" value="expenses">
          <Expenses transactions={transactions} />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="income">
          <Income transactions={transactions} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};
