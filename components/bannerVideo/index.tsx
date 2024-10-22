import { Image, ImageProps } from "../media/Image.tsx";
import { BannerVideoFunctions } from "./functions.js";
import { Video, VideoProps } from "../media/Video.tsx";
import { useScript } from "@deco/deco/hooks";
export interface BannerVideoProps {
  /** @title Banner de Vídeo ou Imagem */
  bannerVideo: ImageOrVideo[];
}
/** @titleBy alt */
type ImageOrVideo = ImageProps | VideoProps;
export default function BannerVideoComponent(
  { bannerVideo }: BannerVideoProps,
) {
  return (
    <div>
      <div class="banner-video__slider">
        {bannerVideo?.map((item: ImageOrVideo) => {
          if (item.type === "image") {
            return (
              <Image
                type="image"
                src={item.src}
                mobileSrc={item.mobileSrc}
                alt={item.alt}
                url={item.url}
                target={item.target}
                classes="lg:h-full h-[148.5vw] min-w-[195px] lg:min-w-0"
              />
            );
          }
          return (
            <Video
              type="video"
              src={item.src}
              mobileSrc={item.mobileSrc}
              alt={item.alt}
              url={item.url}
              target={item.target}
              // classes="lg:w-full !w-[300%] translate-x-[-33%] lg:translate-x-0"
            />
          );
        })}
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(BannerVideoFunctions) }}
      />
    </div>
  );
}
