## Prerequisite

1. vsocde with [playwright-vsocde](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension installed
2. node 18.14+

## 1. Acquire Access to the Develop Feed

  

Use the following commands to authenticate and generate the `.npmrc` file with the appropriate credentials:

  

```bash

vsts-npm-auth -c .npmrc -f

vsts-npm-auth -c .npmrc

```

  

## 2. Install Project Dependencies

  

Install Yarn globally (if not already installed), then install project dependencies:

  

```bash

npm install -g yarn

yarn install

```

  

## 3. Credential Permissions and Configuration

  

- Apply for **`PBI-Test-UserAcc-Access`** permissions.  

- [Credential Permissions](https://eng.ms/docs/cloud-ai-platform/azure-data/azure-data-intelligence-platform/microsoft-fabric-platform/fabric-platform-shared-services/power-bi-troubleshooting-guides/troubleshooting/adhoc_account_user_details?tabs=MSIT)

> *Note: Access may take approximately 2 hours to be granted. Please monitor your email for confirmation.*

  

## 4. Download and Configure the Test Certificate

  

- Download the `.pfx` certificate associated with the test account.

- Place the certificate file in the root directory of the E2E project.

- Update the `playwright.config.ts` file with the correct certificate path:

  

```ts

readFileSync('../bami-tenant-users.pfx')

```

  

## 5. Run Test Cases

  

Execute all test cases under the `./src/tests` directory:

  

```bash

yarn playwright test

```

  

> *Note: This command only runs the tests located in the `./src/tests` folder.*