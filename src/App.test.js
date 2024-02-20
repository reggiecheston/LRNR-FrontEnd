import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import Quiz_Page from "./components/Quiz_Page";
import Quiz_Main from "./components/Quiz_Main";
import Home_Main from "./components/Home_Main";

describe("Home_Main", () => {
  test("renders Home_Main component", () => {
    render(<Home_Main />);

    // Check if certain elements are in the document
    expect(
      screen.getByText("Your guided path to programming enlightenment")
    ).toBeInTheDocument();
    expect(screen.getByText("Begin Journey")).toBeInTheDocument();
    expect(screen.getByText("Personalized Quizzes")).toBeInTheDocument();
    expect(screen.getByText("Rewarding")).toBeInTheDocument();
    expect(screen.getByText("Personal SME")).toBeInTheDocument();
  });
});

// Mock the fetch function globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        evaluation: "correct",
        explanation: "This is the correct answer.",
      }),
  })
);

describe("Quiz_Page", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders Quiz_Page component", async () => {
    const history = createMemoryHistory();
    const route = "/quiz";
    history.push(route, { questions: ["Question 1", "Question 2"] });

    render(
      <Router history={history}>
        <Quiz_Page />
      </Router>
    );

    // Check if certain elements are in the document
    expect(await screen.findByText("Quiz Page")).toBeInTheDocument();
    expect(await screen.findByText("Your Answer")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /Submit Answer/i })
    ).toBeInTheDocument();
  });

  test("Submit Answer button calls API and gets evaluation", async () => {
    const history = createMemoryHistory();
    const route = "/quiz";
    history.push(route, { questions: ["Question 1", "Question 2"] });

    render(
      <Router history={history}>
        <Quiz_Page />
      </Router>
    );

    // Simulate user typing an answer
    userEvent.type(await screen.findByRole("textbox"), "Test answer");

    // Simulate user clicking the Submit Answer button
    userEvent.click(
      await screen.findByRole("button", { name: /Submit Answer/i })
    );

    // Wait for the API call to complete and the evaluation result to appear
    await waitFor(() =>
      expect(screen.getByText("Your answer is correct.")).toBeInTheDocument()
    );
  });
});
