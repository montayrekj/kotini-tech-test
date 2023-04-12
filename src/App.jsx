import { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import "./App.css";
import Input from "./components/Input";

const CALCULATE_LOAN_TO_VALUE_RATIO = gql`
  query LoanToValueCalc($depositValue: Int!, $purchasePrice: Int!) {
    loanToValueCalc(
      depositValue: $depositValue
      purchasePrice: $purchasePrice
    ) {
      result
    }
  }
`;

function App() {
  const [depositValue, setDepositValue] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [calculateLoanToValue, { loading, error, data }] = useLazyQuery(
    CALCULATE_LOAN_TO_VALUE_RATIO
  );
  const [result, setResult] = useState("0%");

  useEffect(() => {
    let res = "0%";
    if (data?.loanToValueCalc?.result) {
      res = data?.loanToValueCalc?.result;
    }
    setResult(res);
  }, [data, error]);

  return (
    <div className="mt-10 w-3/4 app">
      <h1 className="text-4xl text-center">Loan to Value Calculator</h1>
      <div className="flex mt-14 flex-wrap gap-5">
        <div className="flex flex-col flex-1 px-10 items-start">
          <p className="text-2xl green">1. Details</p>
          <Input
            label="Purchase Price"
            value={purchasePrice}
            handleChange={(e) => setPurchasePrice(e)}
            type="number"
          />
          <Input
            label="Deposit Value"
            value={depositValue}
            handleChange={(e) => setDepositValue(e)}
            type="number"
          />
          {error && (
            <span className="text-sm text-red-500 pt-4 pb-2">
              {error?.message}
            </span>
          )}
          <button
            className="text-white px-4 py-2 rounded-md mt-4 calculate-btn"
            disabled={!purchasePrice || !depositValue || loading}
            onClick={() =>
              calculateLoanToValue({
                variables: {
                  // Remove commas from the input values before sending to the server
                  depositValue: depositValue.replace(",", ""),
                  purchasePrice: purchasePrice.replace(",", ""),
                },
              })
            }
          >
            Calculate
          </button>
        </div>
        <div className="flex flex-col flex-1 px-10 items-start">
          <p className="text-2xl green">2. Results</p>
          <span className="mt-4 text-sm">Loan to Valuation Ratio (LVR)</span>
          <span className="text-lg font-semibold mt-2 green">{result}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
