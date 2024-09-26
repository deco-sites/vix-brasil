import { useDevice } from "@deco/deco/hooks";
/** @titleBy alt */
export interface VideoProps {
  /** @readOnly true */
  type: "video";
  src: string;
  mobileSrc: string;
  url: string;
  alt: string;
  target: "_blank" | "_self";
}
export const Video = (
  { src, mobileSrc, url, alt, target = "_self" }: VideoProps,
) => {
  const device = useDevice();
  return (
    <div style={{ height: "52vw" }}>
      <a
        href={url}
        target={target}
        class=" relative before:w-full before:h-full before:absolute before:top-0 before:left-0 z-[1]"
      >
        <iframe
          src={device === "desktop" ? src : mobileSrc}
          width="426"
          height="218"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          title={alt}
          data-ready="true"
          style="width: 100%; height: 100%;"
        />
      </a>
    </div>
  );
};
