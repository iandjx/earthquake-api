import type { Config } from 'jest'

const config: Config = {
  verbose: true,

  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/mocks/setupTests.ts'],
}

export default config
