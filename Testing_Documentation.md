# Automated Complex Scenario Testing - Implementation Documentation

## 1. Background and Purpose
In the Fabric Shell project, to enhance test coverage of real-world user operation flows, the team developed a series of complex scenario test cases based on the official Fabric tutorials. These scenarios were designed to reflect authentic user behaviors and assess the stability and reliability of key functionalities. Given the complexity and inefficiency of manual testing, the Playwright automation framework was introduced to implement regression testing for these workflows.

## 2. Automated Coverage Scenarios
The following complex scenarios have been automated:

### 1. Data Engineering Scenario (Test Case 1)
- Create Lakehouse, Pipeline, and Notebooks
- Execute data processing
- Manage task flows and organize content via folder classification

### 2. Data Science Scenarios (Test Case 2 & 3)
- Import notebooks and prepare data
- Train regression and classification models
- Validate and save experiment results

### 3. Deployment Pipeline Scenario (Test Case 4)
- Set up Dev/Test/Prod workspaces
- Configure and deploy pipeline content
- Validate synchronization across environments

## 3. Implementation Details

### 3.1 Tech Stack
- **Automation Framework:** Playwright (TypeScript)
- **Test Structure:** One Playwright test per case, located under `src/tests/`
- **Runtime Environment:** Supports local runs


### 3.2 Automation Strategy
- Encapsulate page logic using the Page Object Model
- Enable data-driven testing via configuration injection
- Enhance stability using wait strategies and retry logic


### 3.3 Automation and Manual Testing Collaboration
While automation greatly enhances test efficiency and consistency, it is not intended to replace manual testing entirely—particularly in exploratory scenarios or when human judgment is essential (e.g., UI/UX validation).

The current implementation supports two modes:

- **Full Automation Mode:** Executes the entire workflow including setup, operations, and validations.
- **Preparation-Only Mode:** Prepares the environment and resources (Lakehouses, Pipelines, etc.) for manual validation within the Shell.

This hybrid approach allows:

- Accelerated test setup
- Human insight in critical Shell behaviors (navigation, UI interactions, task flows)
- Balanced test coverage with efficiency and adaptability

## 4. Benefits and Outcomes

| Advantage        | Description                                                                 |
|------------------|------------------------------------------------------------------------------|
| Efficiency       | Manual execution took 30+ minutes; automation reduces it to under 3 minutes. |
| Reliability      | Automated flows prevent human error and ensure repeatability.                |
| Broader Coverage | Validates cross-module operations (Notebook, Pipeline, Workspace, etc.).     |
| Reusability      | Test logic is modular and applicable across different projects or platforms. |


## 5. Future Improvements
- Integrate test report tools such as Allure
- Enable parallel execution to improve test throughput
- Expand coverage to include edge cases and i18n scenarios
- Extend testing to mobile platforms and multiple browsers

## 6. Usage Instructions

- **Test Script Location:** `src/tests/`

```bash
# Run Command
npx playwright test tests/scenarios/test-case-1.spec.ts

# Install Dependencies
npm install
npx playwright install