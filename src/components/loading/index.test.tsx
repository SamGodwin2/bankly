import { render } from "@testing-library/react";
import { Loading } from ".";

test("should render as expected", () => {
  const { asFragment } = render(<Loading />);

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class="loading-container"
  >
    Loading...
    <img
      alt="loading icon"
      class="loader"
      src="/loading.svg"
    />
  </div>
</DocumentFragment>
`);
});
