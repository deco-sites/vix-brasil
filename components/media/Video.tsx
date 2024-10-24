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
  /** @hide true */
  classesContainer?: string;
  classes?: string;
}
export const Video = (
  { src, mobileSrc, url, alt, target = "_self", classes = "" }: VideoProps,
) => {
  const device = useDevice();

  return (
    <div style={{ height: `${device === "desktop" ? "52vw" : "148.5vw"}` }}>
      <a
        href={url}
        target={target}
        class=" relative before:w-full before:h-full before:absolute before:top-0 before:left-0 z-[1]"
      >
        <iframe
          src={`https://player.vimeo.com/video/${
            device === "desktop" ? src : mobileSrc
          }?title=0&byline=0&portrait=0&muted=1&autoplay=1&autopause=0&controls=0&loop=1&app_id=122963`}
          width={`${device === "desktop" ? "426" : "240"}`}
          height={`${device === "desktop" ? "218" : "0"}`}
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          title={alt}
          data-ready="true"
          class={`${classes}`}
          style="width: 100%; height: 100%;"
        />
      </a>
    </div>
  );
};
