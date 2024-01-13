* Project configuration:
1. VS Code: download here https://code.visualstudio.com/download
2. Playwright (install Node.js first here https://nodejs.org/en/download/): run cmd: npm init playwright@latest
    - Select Typescript/ Javascript: for config file
    - Set name for folder that have testscripts
3. Git: download here https://git-scm.com/downloads

#yaml: npm install yaml
#gmail-tester: npm install --save-dev gmail-tester

4. npm i @cucumber/cucumber

* Command line:
1. Run all tests: 
  npx playwright test
2. Run a single test file:
  npx playwright test tests/todo-page.spec.ts

Further information: https://playwright.dev/docs/test-cli

======================
pre-condition: have already source code
1. npm i
2. npm run test           run script test
3. npm run test:failed    run failed test that is logged in rerun.txt