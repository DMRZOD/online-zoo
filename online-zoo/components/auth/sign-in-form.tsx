"use client";

import { useState } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { login as loginApi } from "@/lib/api/endpoints";
import { useAuth } from "@/hooks/use-auth";

interface SignInFormProps {
  labels: {
    loginLabel: string;
    loginPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    submit: string;
  };
  messages: {
    networkError: string;
    invalidCredentials: string;
  };
  links: {
    noAccount: string;
    registration: string;
  };
}

const inputBase =
  "w-full rounded-[5px] border border-border bg-background px-5 py-[17px] text-lg text-foreground placeholder:text-muted-foreground transition-all duration-100 focus:border-turquoise focus:shadow-[0_4px_30px_0_rgba(0,160,146,0.3)] focus:outline-none";
const inputError = "border-[#cc0000] bg-[rgba(204,0,0,0.05)] dark:border-[#f56565] dark:bg-[rgba(245,101,101,0.08)]";

export default function SignInForm({ labels, messages, links }: SignInFormProps) {
  const router = useRouter();
  const { signIn } = useAuth();
  const [loginVal, setLoginVal] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ login?: string; password?: string }>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = loginVal.trim().length > 0 && password.trim().length > 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setFormError("");
    setLoading(true);

    try {
      const result = await loginApi({ login: loginVal.trim(), password });
      if (!result.ok) {
        setFormError(
          result.error.status === 401
            ? messages.invalidCredentials
            : messages.networkError
        );
        return;
      }
      const { user, token } = result.data.data;
      signIn(user, token);
      router.push("/");
    } catch {
      setFormError(messages.networkError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[30px]">
      {/* Login field */}
      <div className="flex flex-col gap-2.5">
        <label className="text-lg font-normal leading-[1.5]">
          <span className="text-turquoise">* </span>
          {labels.loginLabel}
        </label>
        <input
          type="text"
          name="login"
          autoComplete="username"
          placeholder={labels.loginPlaceholder}
          value={loginVal}
          onChange={(e) => setLoginVal(e.target.value)}
          className={`${inputBase} ${errors.login ? inputError : ""}`}
        />
        {errors.login && (
          <p className="text-sm text-[#cc0000] dark:text-[#f56565]" role="alert">{errors.login}</p>
        )}
      </div>

      {/* Password field */}
      <div className="flex flex-col gap-2.5">
        <label className="text-lg font-normal leading-[1.5]">
          <span className="text-turquoise">* </span>
          {labels.passwordLabel}
        </label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder={labels.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${inputBase} ${errors.password ? inputError : ""}`}
        />
        {errors.password && (
          <p className="text-sm text-[#cc0000] dark:text-[#f56565]" role="alert">{errors.password}</p>
        )}
      </div>

      {/* Form-level error */}
      {formError && (
        <p className="text-center text-sm text-[#cc0000] dark:text-[#f56565]" role="alert">{formError}</p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={!canSubmit || loading}
        className="mx-auto flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[5px] bg-orange px-7.5 py-[17px] text-lg font-semibold uppercase text-white transition-colors duration-300 hover:bg-orange-hover disabled:cursor-not-allowed disabled:opacity-50 sm:w-[300px]"
      >
        <span>{labels.submit}</span>
        <Image
          src="/icons/arrow-right.svg"
          alt=""
          width={25}
          height={22}
          className="brightness-0 invert"
        />
      </button>

      {/* Footer link */}
      <p className="text-center text-lg">
        {links.noAccount}{" "}
        <Link
          href="/register"
          className="font-semibold text-turquoise underline hover:text-turquoise-hover"
        >
          {links.registration}
        </Link>
      </p>
    </form>
  );
}
