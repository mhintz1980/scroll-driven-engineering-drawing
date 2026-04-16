import {describe, expect, it} from "vitest";

import {
  buildProjectMediaItems,
  getProjectMediaAutoplayDelay,
  getNextProjectMediaIndex,
  getPreviousProjectMediaIndex,
  getProjectMediaIndex,
} from "./projects-media";

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

describe("getNextProjectMediaIndex", () => {
  it("advances to the next frame when another media item exists", () => {
    expect(getNextProjectMediaIndex(0, 4)).toBe(1);
  });

  it("wraps back to the first frame when it reaches the end", () => {
    expect(getNextProjectMediaIndex(3, 4)).toBe(0);
  });

  it("stays on the first frame when there is only one or zero items", () => {
    expect(getNextProjectMediaIndex(0, 1)).toBe(0);
    expect(getNextProjectMediaIndex(2, 0)).toBe(0);
  });
});

describe("getPreviousProjectMediaIndex", () => {
  it("moves back to the prior frame when one exists", () => {
    expect(getPreviousProjectMediaIndex(2, 4)).toBe(1);
  });

  it("wraps to the final frame when moving back from the first frame", () => {
    expect(getPreviousProjectMediaIndex(0, 4)).toBe(3);
  });

  it("stays on the first frame when there is only one or zero items", () => {
    expect(getPreviousProjectMediaIndex(0, 1)).toBe(0);
    expect(getPreviousProjectMediaIndex(2, 0)).toBe(0);
  });
});

describe("getProjectMediaAutoplayDelay", () => {
  it("returns the base delay for the first project card", () => {
    expect(getProjectMediaAutoplayDelay(0)).toBe(4200);
  });

  it("adds a small stagger per project so cards do not advance together", () => {
    expect(getProjectMediaAutoplayDelay(1)).toBe(4680);
    expect(getProjectMediaAutoplayDelay(2)).toBe(5160);
  });

  it("falls back to the base delay for invalid project indexes", () => {
    expect(getProjectMediaAutoplayDelay(-1)).toBe(4200);
  });
});
