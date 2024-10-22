import { ShopNowShelfItems } from "../../islands/ShelfProducts/index.tsx";
import ShelfProducts from "../../islands/ShelfProducts/index.tsx";
import { ShopNowShelfFunctions } from "./functions.js";
import { useScript } from "@deco/deco/hooks";
export interface ShopNowShelfProps {
  /** @title Shop Now */
  items: ShopNowShelfItems[];
}

export const ShopNowShelfComponent = ({ items }: ShopNowShelfProps) => {
  return (
    <div class="lg:px-28 px-[15px]">
      <div class="shop-now-shelf__slider w-full">
        {items.map((item) => {
          return (
            <div>
              <ShelfProducts
                src={item.src}
                alt={item.alt}
                products={item.products}
              />
            </div>
          );
        })}
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(ShopNowShelfFunctions) }}
      />
    </div>
  );
};
