import { Image, ImageProps } from "../media/Image.tsx";

export type DepartmentImagesProps = {
  /** @title Imagens de Departamento */
  items: ImageProps[];
};

export const DepartmentImages = ({ items }: DepartmentImagesProps) => {
  return (
    <div class="flex items-center justify-between gap-9 w-full max-w-screen-2xl mx-auto">
      {items?.map((item) => {
        return (
          <div class="max-h-[580px] w-full overflow-hidden">
            <Image
              type="image"
              src={item.src}
              mobileSrc={item.mobileSrc}
              alt={item.alt}
              url={item.url}
              target={item.target}
              classes="hover:scale-[1.05] duration-200"
            />
          </div>
        );
      })}
    </div>
  );
};
