import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App, { CALCULATE_LOAN_TO_VALUE_RATIO } from "../App";

const mocks = [
  {
    request: {
      query: CALCULATE_LOAN_TO_VALUE_RATIO,
      variables: {
        purchasePrice: "1000",
        depositValue: "100",
      },
    },
    result: {
      data: {
        loanToValueCalc: {
          result: "90%",
        },
      },
    },
  },
];

describe("App Tests", () => {
  it("should calculate result correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // fill out the form
    fireEvent.change(screen.getByLabelText(/Purchase Price/i), {
      target: { value: 1000 },
    });
    fireEvent.change(screen.getByLabelText(/Deposit Value/i), {
      target: { value: 100 },
    });

    fireEvent.click(screen.getByText(/Calculate/i));

    expect(await screen.findByText("90%")).toBeInTheDocument();
  });
});
