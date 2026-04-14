import {describe, expect, it} from "vitest";

import {buildResumeTextBlocks, resumeXmlPhrases} from "../remotion/src/remix/resumeText";

describe("buildResumeTextBlocks", () => {
	it("builds motion blocks from resume xml phrases with stable ordering", () => {
		const blocks = buildResumeTextBlocks(resumeXmlPhrases);

		expect(blocks).toHaveLength(12);
		expect(blocks[0]).toMatchObject({
			text: "15+ YEARS",
			emphasis: "hero",
			movement: "drift",
		});
		expect(blocks[1]).toMatchObject({
			text: "DESIGN-TO-ORDER",
			emphasis: "accent",
			movement: "drift",
		});
		expect(blocks.some((block) => block.text === "SHOP-TRUSTED")).toBe(true);
		expect(blocks.some((block) => block.text === "MANUFACTURABILITY")).toBe(true);
		expect(blocks.some((block) => block.text === "BUILDABLE")).toBe(true);
	});

	it("creates layered motion with macro scale, vertical travel, and dense overlap", () => {
		const blocks = buildResumeTextBlocks(resumeXmlPhrases);
		const activeAtFrame = (frame: number) =>
			blocks.filter((block) => block.startFrame <= frame && block.endFrame >= frame);

		expect(Math.max(...blocks.map((block) => block.fontSize))).toBeGreaterThanOrEqual(96);
		expect(
			blocks.some((block) => Math.abs(block.driftY) > Math.abs(block.driftX) && Math.abs(block.driftY) >= 120),
		).toBe(true);
		expect(activeAtFrame(72).length).toBeGreaterThanOrEqual(3);
		expect(activeAtFrame(120).length).toBeGreaterThanOrEqual(3);
		expect(activeAtFrame(180).length).toBeGreaterThanOrEqual(3);
		expect(blocks.some((block) => block.opacityTo <= 0.45)).toBe(true);
	});
});
