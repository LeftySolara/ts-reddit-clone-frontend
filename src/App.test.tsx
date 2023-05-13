import { render, screen } from "@testing-library/react";
import App from "./App";

describe("The main app page", () => {
  it("should display the text 'Hello World!", () => {
    render(<App />);

    const heading = screen.getByText("Hello World!");
    expect(heading).toBeInTheDocument();
  });
});
