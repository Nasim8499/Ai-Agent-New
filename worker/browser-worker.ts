export type PassportValidationResult = {
  passportNumber: string | null;
  mrzDetected: boolean;
  warnings: string[];
  confidence: number;
};

export function validatePassportText(text: string): PassportValidationResult {
  const normalized = text.replace(/\s+/g, " ").trim();
  const passportNumber = normalized.match(/\b[A-Z0-9]{6,9}\b/)?.[0] ?? null;
  const mrzDetected = /P<|[A-Z0-9<]{30,}/.test(normalized);

  return {
    passportNumber,
    mrzDetected,
    warnings: mrzDetected ? [] : ["Machine-readable zone not detected"],
    confidence: mrzDetected ? 0.92 : 0.72
  };
}
