interface ProductDescriptionsProps {
  info?: string;
  title: string;
}

export default function ProductDescriptions(
  { info, title }: ProductDescriptionsProps,
) {
  return (
    <div>
      <span class="text-sm">
        {info && (
          <details class="group/product-infos border-[#d8caa5] border-b">
            <summary class="cursor-pointer pl-2 flex items-center justify-between font-source-sans font-semibold text-sm tracking-[0.07em] after:content-['+'] after:p-3 after:font-semibold after:text-lg group-open/product-infos:after:content-['-'] group-open/product-infos:bg-[#f7f4ed] mt-4 duration-200">
              {title}
            </summary>
            <div
              class="ml-2 mt-2 font-source-sans font-semibold text-sm tracking-[0.07em] overflow-hidden px-2 py-4 group-open/product-infos:animation-dropdown duration-200"
              dangerouslySetInnerHTML={{ __html: info }}
            />
          </details>
        )}
      </span>
    </div>
  );
}
