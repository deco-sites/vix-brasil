import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import Section from "../../components/ui/Section.tsx";
import Newsletter from "../Newsletter/Newsletter.tsx";

/** @titleBy title */
interface Item {
  title: string;
  href: string;
}

/** @titleBy title */
interface Link extends Item {
  children: Item[];
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  image: ImageWidget;
}

interface Props {
  links?: Link[];
  social?: Social[];
  paymentMethods?: Social[];
  policies?: Item[];
  logo?: ImageWidget;
  trademark?: string;
}

function Footer({
  links = [],
  social = [],
  policies = [],
  paymentMethods = [],
  logo,
  trademark,
}: Props) {
  const newsProps = {
    empty: {
      title:
        "<b>10%</b> OFF na primeira compra em coleção Assine nossa newsletter",
      description: "",
    },

    label: "INSCREVA-SE",
    status: undefined,
  };
  return (
    <footer class="px-5 sm:px-0 mt-5 sm:mt-10">
      <div class="flex flex-col justify-between items-start sm:items-center">
        <div class="flex items-center justify-center w-full">
          <hr class="w-full text-[#030304]" />
          <p class="text-[#030304] font-bold mx-6 text-2xl w-max whitespace-nowrap">
            Perfis oficiais
          </p>
          <hr class="w-full text-[#030304]" />
        </div>

        <ul class="flex gap-4 justify-center my-8">
          {social.map(({ image, href, alt }) => (
            <li>
              <a href={href}>
                <Image
                  src={image}
                  alt={alt}
                  loading="lazy"
                  width={24}
                  height={24}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div class="flex flex-col gap-5 sm:gap-10 py-13 px-10">
        <ul class="flex items-start justify-between gap-6">
          {links.map(({ title, href, children }) => (
            <li class="flex flex-col gap-4">
              <a
                class="font-source-sans text-[#bea669] text-base font-normal uppercase tracking-[0.07em]"
                href={href}
              >
                {title}
              </a>
              <ul class="flex flex-col gap-4">
                {children.map(({ title, href }) => (
                  <li class="h-auto flex">
                    <a
                      class="font-source-sans text-[#030304] hover:text-[#bea669] text-xs font-normal tracking-[0.07em] duration-200"
                      href={href}
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li>
            <Newsletter {...newsProps} />
          </li>
        </ul>

        <hr class="w-full text-base-400" />

        <div class="grid grid-flow-row sm:grid-flow-col gap-8">
          <ul class="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
            {policies.map(({ title, href }) => (
              <li>
                <a class="text-xs font-medium" href={href}>
                  {title}
                </a>
              </li>
            ))}
          </ul>

          <ul class="flex flex-wrap gap-2">
            {paymentMethods.map(({ image, alt }) => (
              <li class="h-8 w-10 border border-base-100 rounded flex justify-center items-center">
                <Image
                  src={image}
                  alt={alt}
                  width={20}
                  height={20}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>

          <div class="flex flex-nowrap items-center justify-between sm:justify-center gap-4">
            <div>
              <img loading="lazy" src={logo} />
            </div>
            <span class="text-xs font-normal text-base-400">{trademark}</span>
          </div>

          <div class="flex flex-nowrap items-center justify-center gap-4">
            <span class="text-sm font-normal text-base-400">Powered by</span>
            <PoweredByDeco />
          </div>
        </div>
      </div>
    </footer>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="1145px" />;

export default Footer;
