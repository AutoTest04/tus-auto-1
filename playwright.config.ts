import { defineConfig } from './node_modules/@trident/e2e-common/src/config.js';
import path from 'path';
import fs from 'fs';
import { devices } from '@playwright/test';
import { CustomCredentialProvider, UserCredential } from '@trident/e2e-common';

/**
 * 定义 Daily 环境的 KeyVault 凭据
 */


const legacyTridentTestCredential: CustomCredentialProvider = {
  type: 'custom',

  // 获取用户凭据
  getUserCredentials: async () => {
      const credentials: UserCredential[] = [
          {
              username: 'AdminUser01@fabricmsit11112024.onmicrosoft.com',
              certificate: {
                  pfx: fs.readFileSync('./certificate/bami-tenant-users-testuser1-fabricdxt11112024-20250325.pfx')
              }
          }
      ];

      return credentials;
  }
};



/**
 * Playwright 配置
 */
export default defineConfig({
    testDir: path.join(__dirname, './src/tests'), // 测试目录
    use: {
        environment: 'https://dxt.powerbi.com', 
        credential: [
          legacyTridentTestCredential,
        ],
        ...devices['Desktop Chrome'],
    },
    projects: [
        {
            name: 'daily-chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
});
