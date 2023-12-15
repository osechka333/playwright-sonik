import { defineConfig, devices } from '@playwright/test'
import {config as testConfig} from "./config/config.js";

const config =  defineConfig({
  // testDir: './tests',
  testMatch: 'tests/**/*.spec.js',
  globalSetup: './globalSetup',
  timeout: 360_000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  reporter: [
    ['html', {open: process.env.CI ? 'never' : 'on-failure'}],
    ['list']
  ],
  use: {
    headless: true,
    httpCredentials: testConfig.httpCredentials,
    baseURL: testConfig.baseURL,
    viewport: {
      width: 1200,
      height: 840
    },
    trace: 'retain-on-failure',
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    launchOptions:{
    }
  },
  projects: [
    {
      name: 'setup',
      testMatch: '**/setup/**/*.setup.js',
    },
    {
      name: 'main',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup']
    },
    {
      name: 'api',
      use: { ...devices['Desktop Chrome']},
      dependencies: [],
      testMatch: 'tests/api/*.spec.js',
    },
    {
      name: 'ui-example',
      use: { ...devices['Desktop Chrome']},
      dependencies: [],
      testMatch: 'tests/*.spec.js',
    }
  ],
});

export default config
