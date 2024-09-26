import { Head } from "$fresh/runtime.ts";

/** @titleBy alt */
export interface ImageProps {
  src: string;
  alt?: string;
  width: string | number;
  height: string | number;
  /** @hide true */
  classes?: string;
  aspect?: string;
  preload: boolean;
  loading: "lazy" | "eager";
}

export const ImageZoom = (
  {
    src,
    alt,
    width,
    height,
    aspect,
    preload = false,
    loading = "lazy",
    classes = "",
  }: ImageProps,
) => {
  return (
    <>
      {preload && (
        <Head>
          <link as="image" rel="preload" href={src} />
        </Head>
      )}

      <div
        class={`imageZoom--wrapper max-w-[${width}px] w-full max-h-[${height}px] h-full overflow-hidden`}
      >
        <img
          type="image"
          width={width}
          height={height}
          loading={loading}
          style={aspect && { aspectRatio: aspect }}
          src={src}
          alt={alt}
          class={`imageZoom--image ${classes} object-cover cursor-crosshair`}
        />
      </div>
    </>
  );
};
