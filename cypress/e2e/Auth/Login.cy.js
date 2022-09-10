describe("Auth / Login", () => {
  // Set dynamic auth info
  const timestamp = Math.floor(+ new Date() / 1000);
  const randomEmail = `auto_ui_tester-no.${timestamp}@nwitter.com`;
  const password = "Cypress*P@SSWORD";

  beforeEach(() => {
    cy.removeAllCaches();
  });

  it(`Step1. Register & Logout - ${randomEmail}`, () => {
    cy.submitAuthForm(randomEmail, password);
    cy.contains(`${randomEmail.split("@")[0]}'s Profile`);

    cy.logout();
  });

  it("Step2. Register error when same email", () => {
    cy.submitAuthForm(randomEmail, `wrong-${password}`);
    cy.contains("이미 사용 중인 이메일입니다.");
  });

  it("Step3. Login error when wrong info", () => {
    // Toggle: Regist -> Login
    cy.swithAuthMode();
    // No exist user
    cy.submitAuthForm(`wrong-${randomEmail}`, `wrong-${password}`);
    cy.contains("이메일 또는 비밀번호를 다시 한번 확인해주세요.");

    // Exist user wiht wrong password
    cy.submitAuthForm(randomEmail, `wrong-${password}`);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
      .get("span").then($span => {
        const resultMessage = $span.text();
        switch (resultMessage) {
        case "이메일 또는 비밀번호를 다시 한번 확인해주세요.":
          cy.log("[PASS] Retry needs with right auth-info.");
          break;
        case "로그인 시도 횟수가 초과 되었습니다. 잠시 후 재시도 해주세요.":
          cy.log("[WARN] Retry count has been over.");
          break;
        default:
          throw new Error(`[ERROR] No covered cases: ${resultMessage}`);
        }
      });
  });

  it(`Step4. Withdrawal after login- ${randomEmail}`, () => {
    // Toggle: Regist -> Login
    cy.swithAuthMode();
    // Exist user with right password
    cy.submitAuthForm(randomEmail, password);
    cy.contains(`${randomEmail.split("@")[0]}'s Profile`);

    cy.withdrawal();

    // Toggle: Regist -> Login
    cy.swithAuthMode();
    // No exist user
    cy.submitAuthForm(randomEmail, password);
    cy.contains("이메일 또는 비밀번호를 다시 한번 확인해주세요.");
  });
});
