import { render } from "@testing-library/react";
import store from "../src/redux/store";

const renderWithRedux = (component, { initialState, store = store } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("login page test", () => {
  test("should page loaded", () => {
    renderWithRedux(<LoginPage />);
  });
});
