import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../../sdk/clx.ts";
import { formatPrice } from "../../../sdk/format.ts";
import { relative } from "../../../sdk/url.ts";
import { useOffer } from "../../../sdk/useOffer.ts";
import { useSendEvent } from "../../../sdk/useSendEvent.ts";
import { useVariantPossibilities } from "../../../sdk/useVariantPossiblities.ts";
import WishlistButton from "../../wishlist/WishlistButton.tsx";
import AddToCartButton from "../AddToCartButton.tsx";
import { Ring } from "../ProductVariantSelector.tsx";
import { useId } from "../../../sdk/useId.ts";
import Icon from "../../ui/Icon.tsx";
import Slider from "../../ui/Slider.tsx";

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
  const id = useId();

  const { url, image: images, offers, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const title = isVariantOf?.name ?? product.name;

  const { listPrice, price, seller = "1", availability } = useOffer(offers);
  const inStock = availability === "https://schema.org/InStock";
  const possibilities = useVariantPossibilities(hasVariant, product);
  const firstSkuVariations = Object.entries(possibilities)?.[0];
  const variants = Object.entries(firstSkuVariations?.[1] ?? {});
  const relativeUrl = relative(url);

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

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

  //Added it to check the variant name in the SKU Selector later, so it doesn't render the SKU to "shoes size" in the Product Card
  const firstVariantName = firstSkuVariations?.[0]?.toLowerCase();
  const shoeSizeVariant = "shoe size";

  return (
    <div>
      <div
        id={`image-shelf--${id}`}
        {...event}
        class={clx(
          "group/image-shelf card card-compact group text-sm relative",
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

          <div class="col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center p-2 absolute left-0 bottom-[60%] opacity-0 group-hover/image-shelf:opacity-100 duration-200">
            <Slider.PrevButton
              class="hidden sm:flex disabled:invisible"
              disabled={false}
              id={`image-shelf--${id}`}
            >
              <Icon id="arrow-shelf" class="rotate-180" />
            </Slider.PrevButton>
          </div>

          <div class="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center p-2 absolute right-0 bottom-[60%] opacity-0 group-hover/image-shelf:opacity-100 duration-200">
            <Slider.NextButton
              class="hidden sm:flex disabled:invisible"
              disabled={false}
              id={`image-shelf--${id}`}
            >
              <Icon id="arrow-shelf" />
            </Slider.NextButton>
          </div>
        </div>

        <div class="absolute top-0 right-0">
          <WishlistButton item={item} variant="icon" />
        </div>
        <a href={relativeUrl} class="pt-5">
          <span class="font-medium">
            {title}
          </span>

          <div class="flex gap-2 pt-2">
            {listPrice && (
              <span class="line-through font-normal text-gray-400">
                {formatPrice(listPrice, offers?.priceCurrency)}
              </span>
            )}
            <span class="font-medium text-base-400">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </div>
        </a>

        {/* SKU Selector */}
        {variants.length > 1 && firstVariantName !== shoeSizeVariant && (
          <ul class="flex items-center justify-start gap-2 pt-4 pb-1 pl-1 overflow-x-auto">
            {variants.map(([value, link]) => [value, relative(link)] as const)
              .map(([value, link]) => (
                <li>
                  <a href={link} class="cursor-pointer">
                    <input
                      class="hidden peer"
                      type="radio"
                      name={`${id}-${firstSkuVariations?.[0]}`}
                      checked={link === relativeUrl}
                    />
                    <Ring value={value} checked={link === relativeUrl} />
                  </a>
                </li>
              ))}
          </ul>
        )}

        <div class="flex-grow" />

        <div>
          {inStock
            ? (
              <AddToCartButton
                product={product}
                seller={seller}
                item={item}
                class={clx(
                  "btn",
                  "btn-outline justify-start border-none !text-sm !font-medium px-0 no-animation w-full",
                  "hover:!bg-transparent",
                  "disabled:!bg-transparent disabled:!opacity-50",
                  "btn-primary hover:!text-primary disabled:!text-primary",
                )}
              />
            )
            : (
              <a
                href={relativeUrl}
                class={clx(
                  "btn",
                  "btn-outline justify-start border-none !text-sm !font-medium px-0 no-animation w-full",
                  "hover:!bg-transparent",
                  "disabled:!bg-transparent disabled:!opacity-75",
                  "btn-error hover:!text-error disabled:!text-error",
                )}
              >
                Sold out
              </a>
            )}
        </div>
      </div>

      <Slider.JS rootId={`image-shelf--${id}`} infinite={true} />
    </div>
  );
}

export default ProductCard;
