import { getTranslations } from "next-intl/server";
import RegisterForm from "@/components/auth/register-form";

export default async function RegisterPage() {
  const t = await getTranslations("auth");
  const tVal = await getTranslations("validation");

  return (
    <section className="px-5 py-[50px] lg:py-[100px]">
      <div className="mx-auto w-full max-w-[680px]">
        <h2 className="mb-[30px] text-turquoise text-center text-2xl font-semibold uppercase lg:mb-[50px] lg:text-[54px]">
          {t("registerTitle")}
        </h2>
        <RegisterForm
          labels={{
            loginLabel: t("loginLabel"),
            loginPlaceholder: t("loginPlaceholder"),
            passwordLabel: t("passwordLabel"),
            passwordPlaceholder: t("passwordPlaceholder"),
            confirmPasswordLabel: t("confirmPasswordLabel"),
            confirmPasswordPlaceholder: t("confirmPasswordPlaceholder"),
            nameLabel: t("nameLabel"),
            namePlaceholder: t("namePlaceholder"),
            emailLabel: t("emailLabel"),
            emailPlaceholder: t("emailPlaceholder"),
            submit: t("registration"),
          }}
          messages={{
            networkError: tVal("networkError"),
            loginTaken: tVal("loginTaken"),
            passwordMismatch: tVal("passwordMismatch"),
            required: tVal("required"),
            invalidEmail: tVal("invalidEmail"),
          }}
          links={{
            hasAccount: t("hasAccount"),
            signIn: t("signIn"),
          }}
        />
      </div>
    </section>
  );
}
