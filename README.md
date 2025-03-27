

### 获取Develop库的权限 

- `vsts-npm-auth -c .npmrc -f`  
- `vsts-npm-auth -c .npmrc`  
---  
### 安装依赖  
- `npm install -g yarn`  
- `yarn install`  
--- 
 
### 凭证权限及配置信息    
*申请PBI-Test-UserAcc-Access权限 (约2个小时权限生效，请留意邮件通知！)*
 

- [下载账号证书](https://eng.ms/docs/cloud-ai-platform/azure-data/azure-data-intelligence-platform/microsoft-fabric-platform/fabric-platform-shared-services/power-bi-troubleshooting-guides/troubleshooting/adhoc_account_user_details?tabs=MSIT)

 
 
将下载的.pfx证书存放到e2e根目录下
在playwright.config.ts文件中修改(readFileSync('../bami-tenant-users-testuser1-fabricmsit11112024-20250306.pfx')

--- 
 
### 运行测试用例
yarn playwright test (请注意该命令仅运行./src/tests文件的所有Test case)
