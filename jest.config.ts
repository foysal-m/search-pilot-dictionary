/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "ts-node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
