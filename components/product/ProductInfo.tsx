import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import ShippingSimulationForm from "../shipping/Form.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import OutOfStock from "./OutOfStock.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import ShareButton from "../shareButton/index.tsx";

interface Props {
  page: ProductDetailsPage | null;
}

function ProductInfo({ page }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, isVariantOf } = product;
  const description = product.description || isVariantOf?.description;
  const title = isVariantOf?.name ?? product.name;
  const refId =
    product.additionalProperty?.find((item) => item.name === "RefId") ??
      isVariantOf?.additionalProperty.find((item) => item.name === "RefId");

  const {
    price = 0,
    listPrice,
    seller = "1",
    availability,
    installments,
  } = useOffer(offers);

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const viewItemEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item",
      params: {
        item_list_id: "product",
        item_list_name: "Product",
        items: [item],
      },
    },
  });

  //Checks if the variant name is "title"/"default title" and if so, the SKU Selector div doesn't render
  const hasValidVariants = isVariantOf?.hasVariant?.some(
    (variant) =>
      variant?.name?.toLowerCase() !== "title" &&
      variant?.name?.toLowerCase() !== "default title",
  ) ?? false;

  return (
    <div {...viewItemEvent} class="flex flex-col" id={id}>
      {/* Product Name */}
      <div class="flex items-start pb-[10px] mb-5 border-b border-[#bea669]">
        <p
          class={clx(
            "text-2xl font-source-sans leading-[34px] tracking-[0.07em] text-black uppercase  relative w-full",
          )}
        >
          {title}
          <br />
          <span
            class={clx(
              "text-[10px] leading-[14px] text-black tracking-normal capitalize",
            )}
          >
            Referência: {refId?.value}
          </span>
        </p>
        <div>
          <WishlistButton item={item} />
          <ShareButton />
        </div>
      </div>

      {/* Prices */}
      <div class="flex gap-3 pt-1">
        <p class="font-source-sans tracking-[0.07em] text-black leading-6 text-base font-semibold">
          <span class="line-through text-xs text-gray-400 text-[#979797] font-normal">
            {formatPrice(listPrice, offers?.priceCurrency)}
          </span>
          <br />
          {formatPrice(price, offers?.priceCurrency)}{" "}
          <span class="text-xs text-gray-400 text-[#979797] font-normal ml-2">
            {installments}
          </span>
        </p>
      </div>

      {/* Sku Selector */}
      {hasValidVariants && (
        <div className="mt-4 sm:mt-8">
          <ProductSelector product={product} />
        </div>
      )}

      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              <AddToCartButton
                item={item}
                seller={seller}
                product={product}
                class="btn btn-primary no-animation"
                disabled={false}
              />
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>

      {/* Shipping Simulation */}
      <div class="mt-8">
        <ShippingSimulationForm
          items={[{ id: Number(product.sku), quantity: 1, seller: seller }]}
        />
      </div>

      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <details>
              <summary class="cursor-pointer">Description</summary>
              <div
                class="ml-2 mt-2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </details>
          )}
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;
