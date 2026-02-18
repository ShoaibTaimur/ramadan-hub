const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function digitToBengali(d: string): string {
  const n = Number(d);
  if (Number.isNaN(n) || n < 0 || n > 9) return d;
  return BENGALI_DIGITS[n];
}

export function numberToBengali(
  value: number | string,
  options?: { padStart?: number },
): string {
  const str = typeof value === "number" ? String(value) : value;
  const padStart = options?.padStart;

  let result = str
    .split("")
    .map((char) => {
      if (char >= "0" && char <= "9") return digitToBengali(char);
      return char;
    })
    .join("");

  if (padStart != null) {
    const numericPart = result.startsWith("-") ? result.slice(1) : result;
    if (numericPart.length < padStart) {
      const padCount = padStart - numericPart.length;
      const leading = "০".repeat(padCount);
      result = result.startsWith("-")
        ? "-" + leading + numericPart
        : leading + numericPart;
    }
  }

  return result;
}
