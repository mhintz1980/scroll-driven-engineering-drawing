import {describe, expect, it} from "vitest";

import {buildProjectMediaItems} from "./projects-media";

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
});
