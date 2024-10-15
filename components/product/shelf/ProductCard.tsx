import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../../sdk/clx.ts";
import { relative } from "../../../sdk/url.ts";
import { useOffer } from "../../../sdk/useOffer.ts";
import { useSendEvent } from "../../../sdk/useSendEvent.ts";

import WishlistButton from "../../wishlist/WishlistButton.tsx";

import { useId } from "../../../sdk/useId.ts";
import Icon from "../../ui/Icon.tsx";
import Slider from "../../ui/Slider.tsx";
import AddToCartShelf from "../../../islands/AddToCartShelf/index.tsx";
import { useDevice } from "@deco/deco/hooks";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
}

const WIDTH = 300;
const HEIGHT = 453;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
  class: _class,
}: Props) {
  const device = useDevice();
  const id = useId();
  const { url, image: images, offers, isVariantOf, additionalProperty } =
    product;
  const title = isVariantOf?.name ?? product.name;

  const { listPrice, price, availability } = useOffer(offers);
  const inStock = availability === "https://schema.org/InStock";
  const relativeUrl = relative(url);

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });
  const flag = additionalProperty?.find((item) => item.propertyID === "384");

  {/* Add click event to dataLayer */}
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  return (
    <div>
      <div
        id={`image-shelf--${id}`}
        {...event}
        class={clx(
          "group/image-shelf group text-sm relative",
          _class,
        )}
      >
        <div>
          <div class="col-start-1 col-span-3 row-start-1 row-span-1">
            <Slider class="carousel carousel-center sm:carousel-end gap-5 sm:gap-10 w-full">
              {images?.map((image, index) => {
                if (image.name === "IMAGEM1") {
                  return null;
                }
                return (
                  <Slider.Item
                    index={index}
                    class={clx(
                      "carousel-item",
                    )}
                  >
                    <figure
                      class={clx(
                        "relative min-h-[453px] max-h-[453px]",
                      )}
                      style={{ aspectRatio: ASPECT_RATIO }}
                    >
                      {/* Product Images */}
                      <a
                        href={relativeUrl}
                        aria-label="view product"
                        class={clx(
                          "w-full",
                          !inStock && "opacity-70",
                        )}
                      >
                        <Image
                          src={image.url!}
                          alt={image.alternateName}
                          width={WIDTH}
                          height={HEIGHT}
                          style={{ aspectRatio: ASPECT_RATIO }}
                          class={clx(
                            "object-contain",
                            "w-full",
                          )}
                          sizes="(max-width: 640px) 50vw, 20vw"
                          preload={preload}
                          loading={preload ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </a>

                      {/* Wishlist button */}
                    </figure>
                  </Slider.Item>
                );
              })}
            </Slider>
          </div>

          <div class="hidden sm:flex col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center p-2 absolute left-0 bottom-[60%] opacity-0 group-hover/image-shelf:opacity-100 duration-200">
            <Slider.PrevButton
              class="disabled:invisible"
              disabled={false}
              id={`image-shelf--${id}`}
            >
              <Icon id="arrow-shelf" class="rotate-180" />
            </Slider.PrevButton>
          </div>

          <div class="hidden sm:flex col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center p-2 absolute right-0 bottom-[60%] opacity-0 group-hover/image-shelf:opacity-100 duration-200">
            <Slider.NextButton
              class="disabled:invisible"
              disabled={false}
              id={`image-shelf--${id}`}
            >
              <Icon id="arrow-shelf" />
            </Slider.NextButton>
          </div>
        </div>
        {flag && (
          <div class="absolute top-3 left-3">
            <p class="font-medium tracking-[0.07em] uppercase text-[#9a8445] font-source-sans text-lg">
              NEW IN
            </p>
          </div>
        )}
        <div class="absolute top-3 right-3">
          <WishlistButton item={item} variant="icon" />
        </div>
        <a href={relativeUrl} class="block pt-[16px] px-[10px]">
          <span class="block w-full font-normal text-base text-center tracking-[0.07em] text-black uppercase font-source-sans text-ellipsis whitespace-nowrap overflow-hidden">
            {title}
          </span>
        </a>
        {device === "desktop"
          ? <AddToCartShelf product={product} />
          : (
            <a href={product?.url}>
              <AddToCartShelf product={product} />
            </a>
          )}
      </div>

      <Slider.JS rootId={`image-shelf--${id}`} infinite={true} />
    </div>
  );
}

export default ProductCard;
