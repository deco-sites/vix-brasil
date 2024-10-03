import { AppContext } from "../../apps/site.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useComponent } from "../Component.tsx";
import { type SectionProps } from "@deco/deco";
interface NoticeProps {
  title?: string;
  description?: string;
}
export interface Props {
  empty?: NoticeProps;
  success?: NoticeProps;
  failed?: NoticeProps;
  /** @description Signup label */
  label?: string;
  /** @hide true */
  status?: "success" | "failed";
}
export async function action(props: Props, req: Request, ctx: AppContext) {
  const platform = usePlatform();
  const form = await req.formData();
  const name = `${form.get("name") ?? ""}`;
  const email = `${form.get("email") ?? ""}`;
  if (platform === "vtex") {
    // deno-lint-ignore no-explicit-any
    await (ctx as any).invoke("vtex/actions/newsletter/subscribe.ts", {
      email,
      name,
    });
    return { ...props, status: "success" };
  }
  return { ...props, status: "failed" };
}
export function loader(props: Props) {
  return { ...props, status: undefined };
}
function Newsletter({
  label = "INSCREVA-SE",
  status,
}: SectionProps<typeof loader, typeof action>) {
  // if (status === "success" || status === "failed") {
  //   return (
  //     <div class="p-14 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
  //       <Icon
  //         size={80}
  //         class={clx(status === "success" ? "text-success" : "text-error")}
  //         id={status === "success" ? "check-circle" : "error"}
  //       />
  //       <Notice {...status === "success" ? success : failed} />
  //     </div>
  //   );
  // }
  return (
    <section class="max-w-[350px]">
      <div class="place-items-center">
        <p class="font-source-sans text-lg text-[#030304] mb-3 leading-[1]">
          <b>10%</b> OFF na primeira compra em coleção <br />
          <span class="text-sm">
            Assine nossa newsletter
          </span>
        </p>

        {status === "success"
          ? (
            <p class="font-source-sans text-sm text-center text-[#bea669] tracking-[0.07em] mb-4">
              Obrigado!
            </p>
          )
          : (
            <form
              hx-target="closest section"
              hx-swap="outerHTML"
              hx-post={useComponent(import.meta.url)}
              class="flex flex-col gap-2 w-full"
            >
              <input
                name="name"
                class="border border-[#c6c6c6] font-source-sans text-base text-[#3f3f40] placeholder:font-source-sans placeholder:text-base placeholder:text-[#c6c6c6] px-4 py-2"
                type="text"
                placeholder="nome"
              />
              <input
                name="email"
                class="border border-[#c6c6c6] font-source-sans text-base text-[#3f3f40] placeholder:font-source-sans placeholder:text-base placeholder:text-[#c6c6c6] px-4 py-2"
                type="text"
                placeholder="e-mail"
              />

              <button
                class="h-[34px] bg-[#bea669] w-full font-source-sans font-medium text-xs text-white hover:opacity-80 duration-200"
                type="submit"
              >
                <span class="[.htmx-request_&]:hidden inline">
                  {label}
                </span>
                <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
              </button>
            </form>
          )}

        <p class="font-source-sans text-xs text-black my-3">
          Rua Figueira de Melo, 307 - São Cristóvão, Rio de Janeiro - RJ. CEP:
          20.941-001<br />
          CNPJ: 40.832.444/0010-07 | Razão Social: Vix Varejo LTDA. 2020 Vix
          Paula Hermanny todos os direitos reservados.
        </p>
      </div>
    </section>
  );
}
export default Newsletter;
