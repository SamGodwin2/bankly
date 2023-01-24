import { AccountItem } from "./item";
import "./index.css";
import { Account } from "../../../types";

type Props = {
  accounts: Account[];
};

export const Accounts = ({ accounts }: Props) => {
  return (
    <div className="accounts">
      {accounts.map((account) => (
        <AccountItem account={account} key={account.account_id} />
      ))}
    </div>
  );
};
