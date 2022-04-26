import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/src"],
  testEnvironment: "js-dom",
  clearMocks: true,
  verbose: true,
  coverageProvider: "v8",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testTimeout: 10000
};

export default config;
