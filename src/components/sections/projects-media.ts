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
  overlayLabel: string;
  thumbnailLabel: string;
};

const formatProjectMediaSequence = (value: number) => String(value).padStart(2, "0");

export const getProjectMediaIndex = (
  requestedIndex: number | undefined,
  mediaCount: number,
) => {
  if (mediaCount <= 0) {
    return 0;
  }

  if (typeof requestedIndex !== "number" || Number.isNaN(requestedIndex)) {
    return 0;
  }

  return Math.min(Math.max(Math.trunc(requestedIndex), 0), mediaCount - 1);
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
    label: index === 0 ? "Primary view" : `Detail view ${formatProjectMediaSequence(index)}`,
    sequence: formatProjectMediaSequence(index + 1),
    overlayLabel: index === 0 ? "Primary review frame" : "Supporting detail",
    thumbnailLabel: index === 0 ? "Anchor image" : "Gallery detail",
  }));
};
