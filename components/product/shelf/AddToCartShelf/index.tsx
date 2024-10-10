import { useState } from "preact/hooks";
import type { Product } from "apps/commerce/types.ts";
import { useOffer } from "../../../../sdk/useOffer.ts";
import { formatPrice } from "../../../../sdk/format.ts";
import Icon from "../../../ui/Icon.tsx";
import { useUI } from "../../../../sdk/useUI.ts";
import { MINICART_DRAWER_ID } from "../../../../constants.ts";

export interface AddToCartShelfProps {
  product: Product;
}

type ToCart = {
  id: string;
  seller: string;
  value: string;
  name: string;
};

export const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function AddToCartShelf({ product }: AddToCartShelfProps) {
  const [selectProduct, setSelectProduct] = useState<ToCart>({
    id: "",
    seller: "1",
    value: "Tamanho",
    name: "Tamanho",
  });
  const [buttonTitle, setButtonTitle] = useState("Adicionar à sacola");
  const { displayCart } = useUI();
  const { offers, isVariantOf } = product;
  const { listPrice, price } = useOffer(offers);
  const icon = isVariantOf?.additionalProperty.find((item) =>
    item.name === "icone_categoria"
  );

  const handleAddToCart = () => {
    if (selectProduct.id !== "") {
      window.STOREFRONT.CART.addToCart({
        image: product?.image?.[0].url ?? "",
        item_brand: product?.brand?.name ?? "",
        item_group_id: product?.productID,
        item_id: selectProduct.id,
        item_name: product.alternateName ?? "",
        item_url: product?.url,
        item_variant: selectProduct.name,
        listPrice: listPrice ?? 0,
        price: price ?? 0,
        quantity: 1,
      }, {
        allowedOutdatedData: ["paymentData"],
        orderItems: [{
          id: selectProduct.id,
          seller: selectProduct.seller || "",
          quantity: 1,
        }],
      });

      displayCart.value = true;
    } else {
      setButtonTitle("Selecione um tamanho!");
      setTimeout(() => {
        setButtonTitle("Adicionar à sacola");
      }, 2000);
    }
  };

  return (
    <>
      <div class="relative">
        <div class="flex items-center justify-center gap-1 py-[10px]">
          {icon && (
            <img
              src={`https://vixbrasil.vtexassets.com/arquivos/${
                removeAccents(
                  icon.value ?? "",
                )
              }.png`}
              alt="Product category icon"
              class="w-[30px] h-[30px]"
            />
          )}
          <p>
            {listPrice !== price && (
              <span class="block line-through font-source-sans tracking-[0.07em] text-[#979797] text-xs">
                {formatPrice(listPrice, offers?.priceCurrency)}
              </span>
            )}
            <span class="block font-source-sans tracking-[0.07em] text-sm text-black">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </p>
        </div>

        <details class="dropdown h-auto border border-[#e8e8e8] w-max mx-auto cursor-pointer pr-[10px] mb-[10px] absolute top-3 left-[30%] bg-white opacity-0 duration-200 group-hover/image-shelf:opacity-100">
          <summary class="flex items-center gap-1 list-none font-source-sans text-sm tracking-[0.07em] text-black list ">
            {icon && (
              <img
                src={`https://vixbrasil.vtexassets.com/arquivos/${
                  removeAccents(
                    icon.value ?? "",
                  )
                }.png`}
                alt="Product category icon"
                class="w-[30px] h-[30px]"
              />
            )} {selectProduct.value} <Icon id="down-sm-arrow" size={12} />
          </summary>
          <ul class="dropdown-content">
            {isVariantOf?.hasVariant.map((item) => {
              const value = item?.additionalProperty?.find((i) =>
                i?.name === "Tamanho"
              )?.value;

              if (value === "KIT") {
                return null;
              }
              return (
                <li
                  class={`block cursor-pointer w-[150px] bg-white hover:bg-[#bea669] duration-200 p-2`}
                  onClick={() => {
                    setSelectProduct({
                      id: item.sku,
                      seller: "1",
                      value: value ?? "",
                      name: item.name ?? "",
                    });
                  }}
                >
                  {value}
                </li>
              );
            })}
          </ul>
        </details>
      </div>

      <label
        class="flex justify-center"
        for={MINICART_DRAWER_ID}
        aria-label="open cart add product"
      >
        <button
          onClick={() => handleAddToCart()}
          class={`tracking-[0.07em] font-source-sans uppercase text-[#fff] font-normal w-full max-w-[240px] mx-auto text-base cursor-pointer pt-[0.5em] pb-[0.64em]  duration-200 bg-[#cbb887] hover:opacity-80`}
        >
          {buttonTitle}
        </button>
      </label>
    </>
  );
}
