import { ShopNowShelfFunctions } from "./functions.js";
import { useScript } from "@deco/deco/hooks";
export interface ShopNowShelfProps {
    /** @title Shop Now */
    items: ShopNowShelfItems[];
}
/** @titleBy alt */
interface ShopNowShelfItems {
    link: string;
    src: string;
    alt: string;
    target: "_blank" | "_self";
}
export const ShopNowShelfComponent = ({ items }: ShopNowShelfProps) => {
    return (<div class="px-28">
      <div class="shop-now-shelf__slider">
        {items.map((item) => {
            return (<a href={item.link} target={item.target} class="p-4 after:duration-200 font-source-sans text-white font-bold relative after:content-['Shop_Now'] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:flex after:justify-center after:items-center after:opacity-0 hover:after:opacity-100 after:bg-bronze-opacity">
              <img src={item.src} alt={item.alt}/>
            </a>);
        })}
      </div>

      <script type="module" dangerouslySetInnerHTML={{ __html: useScript(ShopNowShelfFunctions) }}/>
    </div>);
};
