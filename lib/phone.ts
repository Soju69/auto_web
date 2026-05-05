export function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export function formatRussianPhoneInput(value: string) {
  const rawDigits = normalizePhone(value);
  const digitsWithoutPrefix = rawDigits.startsWith("8")
    ? rawDigits.slice(1)
    : rawDigits.startsWith("7")
      ? rawDigits.slice(1)
      : rawDigits;
  const digits = digitsWithoutPrefix.slice(0, 10);

  if (!digits) {
    return "";
  }

  const parts = ["+7"];
  const area = digits.slice(0, 3);
  const first = digits.slice(3, 6);
  const second = digits.slice(6, 8);
  const third = digits.slice(8, 10);

  if (area) {
    parts.push(` ${area}`);
  }

  if (first) {
    parts.push(` ${first}`);
  }

  if (second) {
    parts.push(`-${second}`);
  }

  if (third) {
    parts.push(`-${third}`);
  }

  return parts.join("");
}

export function isRussianPhoneComplete(value: string) {
  return normalizePhone(value).length === 11;
}
