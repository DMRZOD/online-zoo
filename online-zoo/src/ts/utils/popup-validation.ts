const NUMERIC_ONLY = /^\d+$/;
const NAME_LETTERS_SPACES = /^[a-zA-Z\s]+$/;
const BILLING_NAME_MIN_LENGTH = 3;

export const OTHER_AMOUNT_NON_DIGIT_MESSAGE = "Only numeric values are allowed";
const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CARD_16_DIGITS = /^\d{16}$/;
const CVV_3_DIGITS = /^\d{3}$/;
const EXPIRY_MM_YY = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

export function validateOtherAmount(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Enter amount";
  if (/[eE.-]/.test(trimmed)) return "Scientific notation is not allowed";
  if (!NUMERIC_ONLY.test(trimmed)) return OTHER_AMOUNT_NON_DIGIT_MESSAGE;
  const num = parseInt(trimmed, 10);
  if (Number.isNaN(num) || num <= 0) return "Amount must be greater than 0";
  return null;
}

export function validateBillingName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Name is required";
  if (trimmed.length < BILLING_NAME_MIN_LENGTH) {
    return `Name must be at least ${BILLING_NAME_MIN_LENGTH} characters`;
  }
  if (!NAME_LETTERS_SPACES.test(trimmed)) {
    return "Only letters and spaces are allowed";
  }
  return null;
}

export function validateBillingEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required";
  if (!EMAIL_FORMAT.test(trimmed)) return "Enter a valid email address";
  return null;
}

export function validateCardNumber(value: string): string | null {
  const digits = value.replace(/\s/g, "");
  if (!CARD_16_DIGITS.test(digits)) {
    return "Card number must be exactly 16 digits";
  }
  return null;
}

export function validateCvv(value: string): string | null {
  if (!CVV_3_DIGITS.test(value)) return "CVV must be exactly 3 digits";
  return null;
}

export function validateExpiry(value: string): string | null {
  const trimmed = value.trim();
  if (!EXPIRY_MM_YY.test(trimmed)) {
    return "Use format MM/YY (e.g. 12/25)";
  }
  const [, month, year] = trimmed.match(EXPIRY_MM_YY)!;
  const m = parseInt(month!, 10);
  const y = parseInt(year!, 10);
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  if (y < currentYear || (y === currentYear && m < currentMonth)) {
    return "Expiration date must be in the future";
  }
  return null;
}
