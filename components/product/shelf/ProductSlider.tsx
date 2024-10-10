import { Product } from "apps/commerce/types.ts";
import { clx } from "../../../sdk/clx.ts";
import Icon from "../../ui/Icon.tsx";
import Slider from "../../ui/Slider.tsx";
import ProductCard from "../shelf/ProductCard.tsx";
import { useId } from "../../../sdk/useId.ts";

export interface ProductSliderProps {
  products: Product[];
  itemListName?: string;
}

function ProductSlider({ products, itemListName }: ProductSliderProps) {
  const id = useId();

  return (
    <>
      <div
        id={`${id}--Shelf`}
        class="grid grid-rows-1 max-w-[1500px] mx-auto relative"
        style={{
          gridTemplateColumns: "min-content 1fr min-content",
        }}
      >

        <div class="col-start-1 col-span-3 row-start-1 row-span-1">
          <Slider
            class="carousel carousel-center sm:carousel-end gap-5 sm:gap-10 w-full"
            style={{ height: "calc(100% + 130px)" }}
          >
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  "first:pl-5 first:sm:pl-0",
                  "last:pr-5 last:sm:pr-0",
                )}
              >
                <ProductCard
                  index={index}
                  product={product}
                  itemListName={itemListName}
                  class="max-w-[300px] w-full"
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>

        <div class="col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center p-2 absolute left-[-40px] bottom-[60%]">
          <Slider.PrevButton
            class="hidden sm:flex disabled:invisible text-black"
            disabled={false}
            id={`${id}--Shelf`}
          >
            <Icon id="chevron-right" class="rotate-180" />
          </Slider.PrevButton>
        </div>

        <div class="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center p-2 absolute right-[-40px] bottom-[60%]">
          <Slider.NextButton
            class="hidden sm:flex disabled:invisible text-black"
            disabled={false}
            id={`${id}--Shelf`}
          >
            <Icon id="chevron-right" />
          </Slider.NextButton>
        </div>
      </div>
      <Slider.JS rootId={`${id}--Shelf`} infinite />
    </>
  );
}

export default ProductSlider;
