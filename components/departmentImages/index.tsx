import { useScript } from "deco/hooks/useScript.ts";
import { Image, ImageProps } from "../media/Image.tsx";
import { DepartmentImageFunctions } from "./functions.js";

export type DepartmentImagesProps = {
  /** @title Imagens de Departamento */
  items: ImageProps[];
};

export const DepartmentImages = ({ items }: DepartmentImagesProps) => {
  return (
    <div class="lg:mx-0 mx-[15px]">
      <div class="department-images__slider flex items-center justify-between w-full max-w-[1660px] mx-auto object-contain">
        {items?.map((item) => {
          return (
            <div class="max-h-[580px] w-full overflow-hidden lg:px-4">
              <Image
                type="image"
                src={item.src}
                mobileSrc={item.mobileSrc}
                alt={item.alt}
                url={item.url}
                target={item.target}
                classes="hover:scale-[1.05] duration-200 lg:mx-0 mx-1.5 !object-contain"
              />
            </div>
          );
        })}
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(DepartmentImageFunctions),
        }}
      />
    </div>
  );
};
