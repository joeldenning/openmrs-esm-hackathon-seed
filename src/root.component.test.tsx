import React from "react";
import Root from "./root.component";
import { render } from "@testing-library/react";

describe(`<Root />`, () => {
  beforeEach(() => {
    window.fetch = jest.fn(() => new Promise(resolve => resolve()));
  });

  it(`renders Root without dying`, () => {
    render(<Root patientUuid={"test"} />);
  });
});
