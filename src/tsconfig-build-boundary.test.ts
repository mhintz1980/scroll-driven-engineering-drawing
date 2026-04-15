import {readFileSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

import ts from "typescript";
import {describe, expect, it} from "vitest";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const tsconfigAppPath = path.resolve(currentDir, "../tsconfig.app.json");

describe("tsconfig.app.json", () => {
	it("keeps test files out of the production build graph", () => {
		const raw = readFileSync(tsconfigAppPath, "utf8");
		const config = ts.parseConfigFileTextToJson(tsconfigAppPath, raw).config as {
			exclude?: string[];
		};

		expect(config.exclude).toEqual(
			expect.arrayContaining([
				"src/**/*.test.ts",
				"src/**/*.test.tsx",
				"src/**/*.spec.ts",
				"src/**/*.spec.tsx",
			]),
		);
	});
});
