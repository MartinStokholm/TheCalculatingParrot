import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "http://localhost:7070/swagger.json",
  apiFile: "./src/redux/api/apiSlice.ts",
  apiImport: "calculatingParrotApi",
  outputFile: "./src/redux/api/endpoints/calculatingParrotApi.ts",
  exportName: "calculatingParrotApi",
  hooks: true,
};

export default config;
