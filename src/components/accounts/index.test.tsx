import { render, screen, fireEvent } from "@testing-library/react";
import { Accounts } from ".";
import { accounts } from "../../api/data/accounts";

describe("Accounts", () => {
  it("should render as expected without crashing", () => {
    const { asFragment } = render(<Accounts accounts={accounts} />);

    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class="accounts"
  >
    <div
      class="account"
    >
      <div
        class="total"
      >
        Total GBP
      </div>
      <strong>
        £200,000.00
      </strong>
    </div>
    <div
      class="account"
    >
      <div
        class="total"
      >
        Total EUR
      </div>
      <strong>
        €26,234.28
      </strong>
    </div>
    <div
      class="account"
    >
      <div
        class="total"
      >
        Total USD
      </div>
      <strong>
        $1,000.00
      </strong>
    </div>
  </div>
</DocumentFragment>
`);
  });
});
