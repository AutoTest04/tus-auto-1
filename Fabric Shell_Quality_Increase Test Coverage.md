# Fabric Shell Manual Test Plan

## 1. Problem Statement

During the Quality and Debt discussion for Fabric Shell in Fall 2024, the topic of increasing manual test coverage was raised for further exploration and execution.

## 2. Goals

The primary goal of increasing test coverage is to improve the quality and reliability of components owned by the Shell team by ensuring that as many parts of the code, functionality, or user scenarios as possible are tested. This minimizes the risk of undetected bugs and reduces potential issues in production.

## 3. Designing Typical User Scenario Test Cases

With manual regression testing, we hope to provide an effective safeguard for critical scenarios and user experience by more flexibly and realistically simulating user behavior. It serves as an important complement to automated testing, not only helping teams identify issues promptly but also enhancing overall product quality through a deeper understanding of user scenarios.

---

### TEST CASE 0

**Objective:**  
Set up a workspace for role-based scenario tests and prepare the test data.

**Test Steps:**  
- Go to Microsoft Fabric  
- From the left menu, select **Workspaces**, then create a new workspace named `Typical user scenario test`.  
- Set the License mode to **Pro**.

---

### TEST CASE 1

**Objective:**  
Follow the Fabric tutorial to start the data engineering experience in Microsoft Fabric: create a Lakehouse, set up pipelines, and use notebooks to process and store data. The scenario focuses on ingesting sample sales data, performing data transformations, and ensuring successful execution of key tasks.

**Features to Verify:**  

| Category     | Features                                                  |
|--------------|-----------------------------------------------------------|
| Workspace    | create workspace, create artifact, new item               |
| Left nav     | click item, multitasking, workspace flyout, navigation   |
| Trial        | upgrade workspace                                         |
| Task flow    | add task, assign items, drag and drop connector          |
| Subfolder    | create, rename, move subfolder                            |

**Test Steps:**

1. **Create a Lakehouse**
   - In the workspace (License: Pro)
   - Upgrade the workspace to Trial

2. **Create a Pipeline**
   - Create a pipeline in the Lakehouse

3. **Check Workspace**
   - Confirm Lakehouse and Pipeline are created
   - Verify License upgraded to Trial

4. **Upload and Run Notebook**
   - Import notebook via toolbar
   - Attach existing Lakehouse
   - Run all cells

5. **Upload and Run Pipeline**
   - Import Sales Data via HTTP connection:  
     `https://raw.githubusercontent.com/MicrosoftLearning/dp-data/main/sales.csv`
   - Connect to Lakehouse
   - Use template, Save and Run

6. **Verify Left Nav**
   - Check Pipeline name updated to `Ingest Sales Data`
   - Confirm in Workspace view

7. **Link Cards via On Completion**
   - Save and run the linked pipeline

8. **Create Task Flow**
   - Add and link cards:
     - `Ingest Sales Data` → Get data
     - `Lakehouse` → Store
     - `Notebook` → Prepare

9. **Create and Organize Folder**
   - Create folder `DE`
   - Move artifacts to folder

10. **Verify Task Flow and Folder**
   - Ensure proper display and categorization in Task Flow and Item List

---

### TEST CASE 2

**Objective:**  
Follow the Fabric tutorial for Data Science experience to train sample data using Regression and Classification models, and store them as experiments and usable models.

**Features to Verify:**  

| Category         | Features                                                    |
|------------------|-------------------------------------------------------------|
| Homepage         | Recommendation impression, open link, workspace list, favorites |
| Monitoring Hub   | Refresh, clear filters, open filter, click name             |
| Notification     | Open panel, remove card                                     |
| Global Header    | Open flyout, rename, more details                           |
| Multi-task       | Click item, right-click nav item                            |
| Browse           | Use filter, open recent, open favorites                     |

**Test Steps:**

1. Open the `Typical user scenario test` workspace

2. Import notebook: `Data science scenario.ipynb`

3. Prepare Data:
   - Run cells under `Get the data` and `Prepare the data`

4. Train ML Models:
   - Run cells under `Train a regression model`
   - Open notifications to verify
   - Run cells under `Train a classification model`

5. Navigate back to workspace:
   - Verify experiments: `diabetes-regression`, `diabetes-classification`

6. View Results in Monitoring Hub:
   - Filter by "Submitted by"

7. Explore Experiments:
   - Set items as favorites
   - View them in `Browse > Favorites`

8. Save Model:
   - Save trained model as `model-diabetes` and link to experiment

9. Open Notebook:
   - Access from left nav

10. Rename and Save Notebook:
   - Name it `Train and compare models`

---

### TEST CASE 3

**Objective:**  
(Continuation of Test Case 2)

**Test Steps:**

1. Open the `Typical user scenario test` workspace

2. Open the previously imported notebook

3. Prepare Data:
   - Run cells under `Get the data` and `Prepare the data`

4. Train ML Models:
   - Run cells for regression and classification
   - View notifications for results

5. Return to Workspace:
   - Confirm experiments were created

---

### TEST CASE 4

**Objective:**  
Follow the tutorial to implement deployment pipelines, automate transitions across environments, and validate propagation of changes.

**Test Steps:**

1. **Create Workspaces**
   - `Development 01`, `Test 01`, `Production 01`

2. **Create Deployment Pipeline**
   - Name: `Lab pipeline`

3. **Assign Workspaces to Pipeline Stages**
   - Match workspace names to pipeline stages

4. **Verify Navigation**
   - Check left nav updates with stage switching

5. **Create Content**
   - In `Development 01`, create a Lakehouse named `LabLakehouse` with sample data

6. **Deploy Between Stages**
   - Deploy from Development → Test → Production

7. **Delete Content in Test Stage**
   - Confirm item removed from workspace view

8. **Delete Pipeline**
   - Verify notifications in top-right corner

---

## 4. Definition of Success

| No | Outcome | Measure | Target |
|----|---------|---------|--------|
| 1  | New test coverage | Number of features or requirements validated by tests | -- |
| 2  | Defect detection | Number of bugs detected by new tests | -- |

---

## Appendix: Fabric Personal Description

- **Data Engineers**: Ingest, transform, and load large data into OneLake using pipelines and architecture patterns like medallion.
- **Data Analysts**: Use DirectLake mode and upstream transformations via Data Factory.
- **Data Scientists**: Train models natively and report insights via Power BI.
- **Analytics Engineers**: Ensure data quality and enable self-service analytics.
- **Citizen Developers**: Discover and analyze curated data without engineering dependency.
