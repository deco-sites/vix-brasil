import { useState } from "preact/hooks";
import type { Product } from "apps/commerce/types.ts";
import { useOffer } from "../../../../sdk/useOffer.ts";
import { useUI } from "../../../../sdk/useUI.ts";
import { MINICART_DRAWER_ID } from "../../../../constants.ts";
import { useShelfContext } from "../../../../islands/AddToCartShelf/context/index.tsx";
import ShelfInfo from "./ShelfInfo.tsx";

export interface AddToCartShelfProps {
  product: Product;
}

export type ToCart = {
  id: string;
  seller: string;
  value: string;
  name: string;
};

export default function AddToCartShelf({ product }: AddToCartShelfProps) {
  const { state } = useShelfContext();
  const [buttonTitle, setButtonTitle] = useState("Adicionar à sacola");
  const { displayCart } = useUI();
  const { offers } = product;
  const { listPrice, price } = useOffer(offers);

  const handleAddToCart = () => {
    if (state.singleItem?.id !== "") {
      window.STOREFRONT.CART.addToCart({
        image: product?.image?.[0].url ?? "",
        item_brand: product?.brand?.name ?? "",
        item_group_id: product?.productID,
        item_id: state.singleItem?.id,
        item_name: product.alternateName ?? "",
        item_url: product?.url,
        item_variant: state.singleItem?.name,
        listPrice: listPrice ?? 0,
        price: price ?? 0,
        quantity: 1,
      }, {
        allowedOutdatedData: ["paymentData"],
        orderItems: [{
          id: state.singleItem?.id,
          seller: state.singleItem?.seller || "",
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

  console.log({ product });

  return (
    <>
      <ShelfInfo product={product} />
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
