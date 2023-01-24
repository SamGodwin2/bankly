import "whatwg-fetch";
import { Accounts } from "../../components/accounts";
import { APIRoutes, Account, Transaction } from "../../../types";
import { TransactionHistory } from "../../components/transactions";
import useFetch from "../../hooks/useFetch";
import { Loading } from "../../components/loading";
import ErrorWrapper from "../../components/error";

export const Home = () => {
  const {
    data: accountData,
    loading: accountLoading,
    error: accountError,
    refresh: accountDataRefresh,
  } = useFetch<Account[]>(APIRoutes.Accounts);
  const {
    data: trxHistoryData,
    loading: trxHistoryLoading,
    error: trxHistoryError,
    refresh: transactionDataRefresh,
  } = useFetch<Transaction[]>(APIRoutes.Transactions);
  return (
    <>
      <h1 className="align-left">Your accounts</h1>
      <ErrorWrapper err={accountError} onClick={accountDataRefresh}>
        {accountLoading ? <Loading /> : <Accounts accounts={accountData} />}
      </ErrorWrapper>
      <h1 className="align-left">Transaction History</h1>
      <ErrorWrapper err={trxHistoryError} onClick={transactionDataRefresh}>
        {trxHistoryLoading ? (
          <Loading />
        ) : (
          <TransactionHistory transactions={trxHistoryData} />
        )}
      </ErrorWrapper>
    </>
  );
};
