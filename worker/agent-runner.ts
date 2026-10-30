import Tesseract from "tesseract.js";

export class OcrWorker {
  async processPassport(filePath: string) {
    const { data } = await Tesseract.recognize(filePath, "eng");
    const text = data.text.replace(/\s+/g, " ").trim();

    const passportNumber = text.match(/\b[A-Z0-9]{6,9}\b/)?.[0] ?? null;
    const mrzLines = text
      .split("\n")
      .filter((line) => line.includes("P<") || /^[A-Z0-9<]{30,}$/.test(line));

    return {
      text,
      passportNumber,
      mrzDetected: mrzLines.length > 0,
      warnings: mrzLines.length === 0 ? ["Machine-readable zone not detected"] : []
    };
  }
}
