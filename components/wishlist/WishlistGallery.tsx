import SearchResult, {
  Props as SearchResultProps,
} from "../search/SearchResult.tsx";
import { type SectionProps } from "@deco/deco";
export type Props = SearchResultProps;
function WishlistGallery(props: SectionProps<typeof loader>) {
  const isEmpty = !props.page || props.page.products.length === 0;
  if (isEmpty) {
    return (
      <div class="container mx-4 sm:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl">Your wishlist is empty</span>
          <span>
            Log in and add items to your wishlist for later. They will show up
            here
          </span>
        </div>
      </div>
    );
  }
  return <SearchResult {...props} />;
}

const DEFAULT_PROPS = {
  seo: [
    {
      matcher: "/*",
      text: "Texto SEO menor",
      seoText: "Texto SEO footer",
    },
  ],
};
export const loader = (props: Props, req: Request) => {
  const { seo } = { ...DEFAULT_PROPS, ...props };
  const texts = seo.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );
  return {
    ...props,
    url: req.url,
    texts,
  };
};
export default WishlistGallery;
