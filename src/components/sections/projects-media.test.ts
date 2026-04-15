import {describe, expect, it} from "vitest";

import {buildProjectMediaItems, getProjectMediaIndex} from "./projects-media";

describe("buildProjectMediaItems", () => {
  it("prepends the hero image and removes duplicates from the gallery", () => {
    const items = buildProjectMediaItems({
      title: "Pump Package",
      image: "assets/images/pump-package-hero.webp",
      gallery: [
        "assets/images/pump-package-hero.webp",
        "assets/images/pump-package-01.webp",
        "assets/images/pump-package-02.webp",
      ],
    });

    expect(items.map((item) => item.src)).toEqual([
      "assets/images/pump-package-hero.webp",
      "assets/images/pump-package-01.webp",
      "assets/images/pump-package-02.webp",
    ]);
    expect(items[0]).toMatchObject({
      src: "assets/images/pump-package-hero.webp",
      kind: "hero",
      label: "Primary view",
    });
  });

  it("creates stable sequence labels for gallery images", () => {
    const items = buildProjectMediaItems({
      title: "Torque Wrench",
      image: "assets/images/torque-wrench-hero.webp",
      gallery: [
        "assets/images/torque-wrench-01.webp",
        "assets/images/torque-wrench-02.webp",
      ],
    });

    expect(items.map((item) => item.sequence)).toEqual(["01", "02", "03"]);
    expect(items[1]).toMatchObject({
      kind: "gallery",
      label: "Detail view 01",
    });
    expect(items[2]).toMatchObject({
      kind: "gallery",
      label: "Detail view 02",
    });
  });

  it("includes consistent copy metadata for the image block views", () => {
    const items = buildProjectMediaItems({
      title: "PumpTracker",
      image: "assets/images/pumptracker-hero.webp",
      gallery: ["assets/images/pumptracker-01.webp"],
    });

    expect(items[0]).toMatchObject({
      kind: "hero",
      overlayLabel: "Primary review frame",
      thumbnailLabel: "Anchor image",
    });
    expect(items[1]).toMatchObject({
      kind: "gallery",
      overlayLabel: "Supporting detail",
      thumbnailLabel: "Gallery detail",
    });
  });
});

describe("getProjectMediaIndex", () => {
  it("returns zero when no project-specific selection exists", () => {
    expect(getProjectMediaIndex(undefined, 4)).toBe(0);
  });

  it("clamps the requested frame to the available media range", () => {
    expect(getProjectMediaIndex(8, 3)).toBe(2);
    expect(getProjectMediaIndex(-2, 3)).toBe(0);
  });

  it("falls back safely when a project has no media items", () => {
    expect(getProjectMediaIndex(2, 0)).toBe(0);
  });
});
