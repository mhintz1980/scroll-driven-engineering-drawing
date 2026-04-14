import {describe, expect, it} from "vitest";

import {ShowreelRemixSchema, defaultShowreelRemixProps} from "../remotion/src/remixSchema";

describe("identity image sequence", () => {
	it("exposes a Studio-editable full-bleed image sequence for the Remix identity scene", () => {
		const parsed = ShowreelRemixSchema.parse(defaultShowreelRemixProps);
		const imageSequence = parsed.identityScene.imageSequence;

		expect(imageSequence).toHaveLength(5);
		expect(imageSequence.map((image) => image.src)).toEqual([
			"assets/images/rendering-02.webp",
			"assets/images/rendering-07.webp",
			"assets/images/pump-package-01.webp",
			"assets/images/rendering-09.webp",
			"assets/images/pumptracker_light_mode_composite_1775435494270.png",
		]);
		expect(imageSequence[0]).toMatchObject({
			startFrame: 0,
			scaleFrom: 1,
		});
		expect(imageSequence.at(-1)).toMatchObject({
			endFrame: 300,
		});
		expect(imageSequence.every((image) => image.scaleTo > image.scaleFrom)).toBe(true);
	});
});
