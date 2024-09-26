import { useDevice } from "@deco/deco/hooks";
/** @titleBy alt */
export interface ImageProps {
  /** @readOnly true */
  type: "image";
  src: string;
  mobileSrc: string;
  url: string;
  alt: string;
  target: "_blank" | "_self";
  /** @hide true */
  classes?: string;
}
export const Image = (
  { src, mobileSrc, url, alt, target = "_self", classes = "" }: ImageProps,
) => {
  const device = useDevice();
  return (
    <a href={url} target={target}>
      <img
        src={device === "desktop" ? src : mobileSrc}
        alt={alt}
        class={`w-full object-cover ${classes}`}
      />
    </a>
  );
};
