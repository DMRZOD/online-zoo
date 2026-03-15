const LOGIN_MIN_LENGTH = 3;
const PASSWORD_MIN_LENGTH = 6;
const NAME_MIN_LENGTH = 3;
const ENGLISH_LETTERS = /^[a-zA-Z]+$/;
const LOGIN_FIRST_LETTER = /^[a-zA-Z]/;
const SPECIAL_CHAR = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export const validateLogin = (value: string): string | null => {
  const v = value.trim();
  if (v.length < LOGIN_MIN_LENGTH)
    return `Login must be at least ${LOGIN_MIN_LENGTH} characters`;
  if (!LOGIN_FIRST_LETTER.test(v)) return "Login must start with a letter";
  if (!ENGLISH_LETTERS.test(v)) return "Only English letters are allowed";
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (value.length < PASSWORD_MIN_LENGTH)
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  if (!SPECIAL_CHAR.test(value))
    return "Password must contain at least 1 special character";
  return null;
};

export const validateName = (value: string): string | null => {
  const v = value.trim();
  if (v.length < NAME_MIN_LENGTH)
    return `Name must be at least ${NAME_MIN_LENGTH} characters`;
  if (!ENGLISH_LETTERS.test(v)) return "Only English letters are allowed";
  return null;
};

export const validateEmail = (value: string): string | null => {
  const v = value.trim();
  if (!v) return "Email is required";
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(v)) return "Enter a valid email address";
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirm: string,
): string | null => {
  if (password !== confirm) return "Passwords do not match";
  return null;
};
