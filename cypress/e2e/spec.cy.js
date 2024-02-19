describe("LRNR APP", () => {
  it("LRNR app loads", () => {
    cy.visit("http://localhost:3000/");
  });
});

// describe("Categories_Main Component Success", () => {
//   it(`navigates to categories page`, () => {
//     cy.visit("http://localhost:3000/categories");

//     it(`displays loading message while generating quiz`, () => {
//       cy.get("#topic").select("golang", { force: true });
//       cy.get("#expertise").select("novice", { force: true });
//       cy.get("#numquestions").select("5", { force: true });
//       cy.get("#questionstyle").select("normal", { force: true });
//       cy.get("button").contains("Generate Quiz").click();

//       cy.contains("Loading...").should("exist");
//     });
//   });
// });

// describe("Categories_Main Component Error", () => {
//   it("allows user to select preferences and generate quiz", () => {
//     cy.visit("http://localhost:3000/categories");

//     cy.get("#topic").select("golang", { force: true });
//     cy.get("#expertise").select("novice", { force: true });
//     cy.get("#numquestions").select("5", { force: true });
//     cy.get("#questionstyle").select("normal", { force: true });
//     cy.get("button").contains("Generate Quiz").click();

//     cy.url().should("include", "/quiz");
//   });
// });

// Same as above, but bundled into one test
describe("Categories_Main Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/categories");
  });
  it(`displays loading message while generating quiz`, () => {
    cy.get("#topic").select("golang", { force: true });
    cy.get("#expertise").select("novice", { force: true });
    cy.get("#numquestions").select("5", { force: true });
    cy.get("#questionstyle").select("normal", { force: true });
    cy.get("button").contains("Generate Quiz").click();

    cy.contains("Loading...").should("exist");
  });
  it("allows user to select preferences and generate quiz", () => {
    cy.visit("http://localhost:3000/categories");

    cy.get("#topic").select("golang", { force: true });
    cy.get("#expertise").select("novice", { force: true });
    cy.get("#numquestions").select("5", { force: true });
    cy.get("#questionstyle").select("normal", { force: true });
    cy.get("button").contains("Generate Quiz").click();

    cy.url().should("include", "/quiz");
  });
});

describe("results Component", () => {
  it(`navigates to results page on clicking "Finish Test" button`, () => {
    cy.visit("http://localhost:3000/quiz");

    it(`navigates to results page on clicking "Finish Test" button`, () => {
      cy.intercept("GET", "http://localhost:4000/evaluation", {
        statusCode: 200,
        body: {
          evaluation: "correct",
          explanation: "Your answer is correct.",
        },
      }).as("evaluateAnswer");

      // Simulate answering all questions
      cy.get('input[type="text"]')
        .type("Sample Answer")
        .should("have.value", "Sample Answer");
      cy.contains("Submit Answer").click();
      cy.wait("@evaluateAnswer");
      cy.contains("Next Question").click();
      cy.contains("Finish Test").click();

      cy.url().should("include", "/results");
    });
  });
});

describe("Account_Main Component", () => {
  it("Account page loads", () => {
    cy.visit("http://localhost:3000/account");
  });
});
