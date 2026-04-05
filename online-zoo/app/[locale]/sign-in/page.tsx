import { getTranslations } from "next-intl/server";
import SignInForm from "@/components/auth/sign-in-form";

export default async function SignInPage() {
  const t = await getTranslations("auth");
  const tVal = await getTranslations("validation");

  return (
    <section className="px-5 py-[50px] lg:py-[100px]">
      <div className="mx-auto w-full max-w-[680px]">
        <h2 className="mb-[30px] text-turquoise text-center text-2xl font-semibold uppercase lg:mb-[50px] lg:text-[54px]">
          {t("signInTitle")}
        </h2>
        <SignInForm
          labels={{
            loginLabel: t("loginLabel"),
            loginPlaceholder: t("loginPlaceholder"),
            passwordLabel: t("passwordLabel"),
            passwordPlaceholder: t("passwordPlaceholder"),
            submit: t("signIn"),
          }}
          messages={{
            networkError: tVal("networkError"),
            invalidCredentials: tVal("invalidCredentials"),
          }}
          links={{
            noAccount: t("noAccount"),
            registration: t("registration"),
          }}
        />
      </div>
    </section>
  );
}
