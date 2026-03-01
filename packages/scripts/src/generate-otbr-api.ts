import { writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import openapiTS, { astToString, type OpenAPI3 } from "openapi-typescript";
import { parse } from "yaml";

const gitHash = process.argv[2];
const URL = `https://raw.githubusercontent.com/openthread/ot-br-posix/${gitHash}/src/rest/openapi.yaml`;
console.log(`Generating otbr-posix-api library for git hash ${URL}`);

const openApiSpec = parse(
  await (
    await fetch(
      `https://raw.githubusercontent.com/openthread/ot-br-posix/${gitHash}/src/rest/openapi.yaml`,
    )
  ).text(),
) as OpenAPI3;
const ast = await openapiTS(openApiSpec, {
  immutable: true,
  dedupeEnums: true,
  arrayLength: true,
});

let contents = astToString(ast);

contents += `
// Generated from: '${URL}' in 'https://github.com/openthread/ot-br-posix' 
// prettier-ignore
export const openApiSpec: any = ${JSON.stringify(openApiSpec)};
`;

const fileDir = dirname(fileURLToPath(import.meta.url));
writeFileSync(`${fileDir}/../../otbr-posix-api/src/index.ts`, contents);
