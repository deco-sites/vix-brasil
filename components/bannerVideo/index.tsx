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
export default function BannerVideoComponent({ bannerVideo }: BannerVideoProps) {
    return (<div>
      <div class="banner-video__slider">
        {bannerVideo?.map((item: ImageOrVideo) => {
            if (item.type === "image") {
                return (<Image type="image" src={item.src} mobileSrc={item.mobileSrc} alt={item.alt} url={item.url} target={item.target}/>);
            }
            return (<Video type="video" src={item.src} mobileSrc={item.mobileSrc} alt={item.alt} url={item.url} target={item.target}/>);
        })}
      </div>

      <script type="module" dangerouslySetInnerHTML={{ __html: useScript(BannerVideoFunctions) }}/>
    </div>);
}
