"use client";

import { useState } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { motion } from "motion/react";
import { register as registerApi } from "@/lib/api/endpoints";
import { useAuth } from "@/hooks/use-auth";
import { FADE_UP } from "@/lib/motion";

interface RegisterFormProps {
  labels: {
    loginLabel: string;
    loginPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
  };
  messages: {
    networkError: string;
    loginTaken: string;
    passwordMismatch: string;
    required: string;
    invalidEmail: string;
  };
  links: {
    hasAccount: string;
    signIn: string;
  };
}

const inputBase =
  "w-full rounded-[5px] border border-border bg-background px-5 py-[17px] text-lg text-foreground placeholder:text-muted-foreground transition-all duration-100 focus:border-turquoise focus:shadow-[0_4px_30px_0_rgba(0,160,146,0.3)] focus:outline-none";
const inputError = "border-[#cc0000] bg-[rgba(204,0,0,0.05)] dark:border-[#f56565] dark:bg-[rgba(245,101,101,0.08)]";

export default function RegisterForm({ labels, messages, links }: RegisterFormProps) {
  const router = useRouter();
  const { signIn } = useAuth();
  const [form, setForm] = useState({
    login: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    const newErrors: Record<string, string> = {};
    if (!form.login.trim()) newErrors.login = messages.required;
    if (!form.password) newErrors.password = messages.required;
    if (!form.confirmPassword) {
      newErrors.confirmPassword = messages.required;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = messages.passwordMismatch;
    }
    if (!form.name.trim()) newErrors.name = messages.required;
    if (!form.email.trim()) {
      newErrors.email = messages.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = messages.invalidEmail;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    setLoading(true);
    try {
      const result = await registerApi({
        login: form.login.trim(),
        password: form.password,
        name: form.name.trim(),
        email: form.email.trim(),
      });

      if (!result.ok) {
        setFormError(
          result.error.status === 409
            ? messages.loginTaken
            : result.error.message || messages.networkError
        );
        return;
      }

      signIn(result.data.data.user, result.data.data.token);
      router.push("/");
    } catch {
      setFormError(messages.networkError);
    } finally {
      setLoading(false);
    }
  }

  function field(
    name: keyof typeof form,
    label: string,
    placeholder: string,
    type = "text",
    autoComplete?: string
  ) {
    return (
      <div className="flex flex-col gap-2.5">
        <label className="text-lg font-normal leading-[1.5]">
          <span className="text-turquoise">* </span>
          {label}
        </label>
        <input
          type={type}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={form[name]}
          onChange={handleChange}
          className={`${inputBase} ${errors[name] ? inputError : ""}`}
        />
        {errors[name] && (
          <p className="text-sm text-[#cc0000] dark:text-[#f56565]" role="alert">{errors[name]}</p>
        )}
      </div>
    );
  }

  return (
    <motion.form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[30px]" {...FADE_UP}>
      {field("login", labels.loginLabel, labels.loginPlaceholder, "text", "username")}
      {field("password", labels.passwordLabel, labels.passwordPlaceholder, "password", "new-password")}
      {field("confirmPassword", labels.confirmPasswordLabel, labels.confirmPasswordPlaceholder, "password", "new-password")}
      {field("name", labels.nameLabel, labels.namePlaceholder, "text", "name")}
      {field("email", labels.emailLabel, labels.emailPlaceholder, "email", "email")}

      {/* Form-level error */}
      {formError && (
        <ul className="flex flex-col gap-1 text-center text-sm text-[#cc0000] dark:text-[#f56565]" role="alert">
          {formError.split(", ").map((msg, i) => (
            <li key={i}>{msg.replace(/^\w+: /, "")}</li>
          ))}
        </ul>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
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
        {links.hasAccount}{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-turquoise underline hover:text-turquoise-hover"
        >
          {links.signIn}
        </Link>
      </p>
    </motion.form>
  );
}
