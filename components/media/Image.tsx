import { useDevice } from "@deco/deco/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";
/** @titleBy alt */
export interface ImageProps {
  /** @hide true */
  type: "image";
  src: ImageWidget;
  mobileSrc: ImageWidget;
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
        width={"auto"}
        height={"auto"}
        class={`w-full object-cover ${classes}`}
        loading="lazy"
      />
    </a>
  );
};
