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
  /** @hide true */
  classesLink?: string;
}
export const Image = (
  {
    src,
    mobileSrc,
    url,
    alt,
    target = "_self",
    classes = "",
    classesLink = "",
  }: ImageProps,
) => {
  const device = useDevice();
  return (
    <a href={url} target={target} class={`${classesLink}`}>
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
