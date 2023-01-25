import { useFetch } from "./useFetch";
import { APIRoutes } from "../../types";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const flushPromises = () => new Promise(setImmediate);

describe("useFetch", () => {
  const mockFetch = jest.fn().mockResolvedValue({});

  const TestComponent = () => {
    const res = useFetch(APIRoutes.Accounts);
    return <button onClick={() => res.refresh()}>retry</button>;
  };

  beforeAll(() => {
    window.fetch = mockFetch;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetch", async () => {
    await act(async () => await render(<TestComponent />));
    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith("/api/accounts")
    );
    await act(async () => await mockFetch);
  });

  it("should recall fetch when the retry callback is called", async () => {
    const { getByText } = await act(
      async () => await render(<TestComponent />)
    );

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith("/api/accounts")
    );
    await act(async () => await fireEvent.click(getByText("retry")));
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
  });
});
