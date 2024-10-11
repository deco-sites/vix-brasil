// const removeAccents = (str: string) => {
//   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
// };

// export default function KitShelfInfo() {
//   return (
//     <div class="flex items-center justify-center w-full">
//     <div class="relative">
//       <div class="flex items-center justify-center gap-1 py-[10px] group-hover/image-shelf:opacity-0">
//         {icon && (
//           <img
//             src={`https://vixbrasil.vtexassets.com/arquivos/${
//               removeAccents(
//                 icon.value ?? "",
//               )
//             }.png`}
//             alt="Product category icon"
//             class="w-[30px] h-[30px]"
//           />
//         )}
//         <p>
//           {listPrice !== price && (
//             <span class="block line-through font-source-sans tracking-[0.07em] text-[#979797] text-xs">
//               {formatPrice(listPrice, offers?.priceCurrency)}
//             </span>
//           )}
//           <span class="block font-source-sans tracking-[0.07em] text-sm text-black">
//             {formatPrice(price, offers?.priceCurrency)}
//           </span>
//         </p>
//       </div>

//       <div class="h-auto border border-[#e8e8e8] mx-auto cursor-pointer w-[120px] mb-[10px] absolute top-3 bg-white opacity-0 duration-200 group-hover/image-shelf:opacity-100">
//         <button
//           class="flex w-full items-center justify-between pr-3 gap-1 list-none font-source-sans text-sm tracking-[0.07em] text-black list"
//           onClick={() => {
//             setDropdown("h[100%]");
//           }}
//         >
//           {icon && (
//             <img
//               src={`https://vixbrasil.vtexassets.com/arquivos/${
//                 removeAccents(
//                   icon.value ?? "",
//                 )
//               }.png`}
//               alt="Product category icon"
//               class="w-[30px] h-[30px]"
//             />
//           )} {selectProduct.value} <Icon id="down-sm-arrow" size={12} />
//         </button>
//         <ul
//           class={`${dropdown} overflow-hidden duration-200`}
//           onMouseLeave={() => {
//             setDropdown("h-[0px]");
//           }}
//         >
//           {isVariantOf?.hasVariant.map((item) => {
//             const value = item?.additionalProperty?.find((i) =>
//               i?.name === "Tamanho"
//             )?.value;

//             if (value === "KIT") {
//               return null;
//             }
//             return (
//               <li
//                 class={`block cursor-pointer w-full bg-white hover:bg-[#bea669] duration-200 p-2`}
//                 onClick={() => {
//                   setSelectProduct({
//                     id: item.sku,
//                     seller: "1",
//                     value: value ?? "",
//                     name: item.name ?? "",
//                   });
//                 }}
//               >
//                 {value}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   </div>
//   )
// }
