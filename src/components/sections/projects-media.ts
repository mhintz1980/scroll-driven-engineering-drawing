export type ProjectMediaSource = {
  title: string;
  image: string;
  gallery?: string[];
};

export type ProjectMediaItem = {
  src: string;
  kind: "hero" | "gallery";
  label: string;
  sequence: string;
};

export const buildProjectMediaItems = ({
  image,
  gallery = [],
}: ProjectMediaSource): ProjectMediaItem[] => {
  const orderedSources = [image, ...gallery].filter(
    (src, index, items) => Boolean(src) && items.indexOf(src) === index,
  );

  return orderedSources.map((src, index) => ({
    src,
    kind: index === 0 ? "hero" : "gallery",
    label: index === 0 ? "Primary view" : `Detail view ${String(index).padStart(2, "0")}`,
    sequence: String(index + 1).padStart(2, "0"),
  }));
};
