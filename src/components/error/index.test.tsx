import { render, screen, fireEvent } from "@testing-library/react";
import ErrorWrapper from ".";
import { accounts } from "../../api/data/accounts";

describe("ErrorWrapper", () => {
  it("should render the child when no error", () => {
    const { getByText } = render(
      <ErrorWrapper err={null} onClick={() => {}}>
        <div>Hello moto</div>
      </ErrorWrapper>
    );
    expect(getByText("Hello moto"));
  });

  it("should render the retry button when errors and call onclick", () => {
    const errorCallback = jest.fn();

    const { getByText } = render(
      <ErrorWrapper err={"Oh no"} onClick={errorCallback}>
        <div>Hello moto</div>
      </ErrorWrapper>
    );
    expect(getByText("Uh oh looks like something's gone wrong..."));
    fireEvent.click(getByText("Try again"));
    expect(errorCallback).toHaveBeenCalled();
  });
});
