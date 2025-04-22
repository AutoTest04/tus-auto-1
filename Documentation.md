# Automated Complex Scenario Testing - Implementation Documentation

---

## 1. Background and Purpose
In the Fabric Shell project, to enhance test coverage of real-world user operations, the team designed a series of complex scenario test cases based on official Fabric tutorials. These scenarios reflect typical user behaviors and help verify the stability and reliability of critical functionalities. Due to the complexity and inefficiency of manual testing, the Playwright automation framework was adopted to implement robust regression testing for these flows.

---

## 2. Automated Coverage Scenarios
The following complex user scenarios have been automated:

### 1. Data Engineering Scenario (Test Case 1)
- Creating Lakehouse, Pipeline, and Notebooks
- Executing data processing tasks
- Managing task flows and organizing content via folder classification

### 2. Data Science Scenarios (Test Case 2 & 3)
- Importing notebooks and preparing datasets
- Training regression and classification models
- Validating and saving experiment results

### 3. Deployment Pipeline Scenario (Test Case 4)
- Creating Dev/Test/Prod workspaces
- Configuring and deploying pipelines
- Verifying successful synchronization across environments

---

## 3. Implementation Details

### 3.1 Tech Stack
- **Automation Framework:** Playwright (TypeScript)
- **Test Structure:** One Playwright test per case under `tests/scenarios/`
- **Runtime Environment:** Compatible with both local execution and Azure DevOps CI/CD pipelines
- **Utilities and Techniques:** `expect.poll()`, auto-retry mechanisms, Page Object Model (POM)

### 3.2 Automation Strategy
- Encapsulate UI logic using the Page Object Model for better maintainability
- Drive tests through configuration for flexible data-driven testing
- Ensure stability with strategic use of wait conditions and retry logic

### 3.3 Special Handling
- Simulate notebook cell execution using `keyboard.press('Control+Enter')`
- Perform drag-and-drop actions using `mouse.move`, `mouse.down`, and `mouse.up`
- Handle file uploads via `setInputFiles()`

---

## 4. Benefits and Outcomes

| Advantage   | Description                                                               |
|------------|---------------------------------------------------------------------------|
| Efficiency | Reduced manual test time from 30+ minutes to under 3 minutes              |
| Reliability| Eliminates human error; ensures consistent, repeatable test results       |
| Coverage   | Validates multiple interconnected modules (Notebook, Pipeline, Workspace) |
| CI/CD Ready| Seamless integration with PR pipelines for automated regression testing   |
| Reusability| Modular test logic supports adaptation across various projects/platforms  |

---

## 5. Challenges and Solutions
- **Notebook result validation:** Solved using content checks in the notification panel.
- **Popup and async loading instability:** Addressed using adaptive timeouts and `waitFor` strategies.
- **Multitasking panel toggling issues:** Handled through conditional element visibility checks.

---

## 6. Future Improvements
- Integrate HTML report generators like Allure for richer test reporting
- Enable parallel execution to improve runtime efficiency
- Expand test coverage to include edge cases and i18n scenarios
- Investigate mobile and cross-browser support for broader compatibility

---

## 7. Usage Instructions

- **Test Script Location:** `tests/scenarios/`

```bash
# Run Test Command
npx playwright test tests/scenarios/test-case-1.spec.ts

# Install Dependencies
npm install
npx playwright install
```

---
