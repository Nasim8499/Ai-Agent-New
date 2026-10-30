import { chromium, Browser, BrowserContext, Page } from "playwright";

export class BrowserWorker {
  private browser?: Browser;
  private context?: BrowserContext;
  private page?: Page;

  async start(storageState?: any) {
    this.browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox"]
    });

    this.context = await this.browser.newContext({
      storageState,
      viewport: { width: 1440, height: 900 },
      locale: "en-US"
    });

    this.page = await this.context.newPage();
    return this.page;
  }

  async navigate(url: string) {
    const page = this.requirePage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    return { url: page.url(), title: await page.title() };
  }

  async fill(fields: Record<string, string>) {
    const page = this.requirePage();
    for (const [selector, value] of Object.entries(fields)) {
      await page.locator(selector).fill(value);
    }
    return { filled: Object.keys(fields).length };
  }

  async click(selector: string) {
    const page = this.requirePage();
    await page.locator(selector).click();
    await page.waitForLoadState("networkidle");
    return { clicked: selector, url: page.url() };
  }

  async upload(selector: string, filePath: string) {
    const page = this.requirePage();
    await page.setInputFiles(selector, filePath);
    return { uploaded: filePath };
  }

  async screenshot() {
    const page = this.requirePage();
    const png = await page.screenshot({ type: "png" });
    return { base64: png.toString("base64") };
  }

  async extract(selector: string) {
    const page = this.requirePage();
    return page.locator(selector).innerText();
  }

  async close() {
    await this.context?.close();
    await this.browser?.close();
  }

  private requirePage(): Page {
    if (!this.page) throw new Error("Browser session not started");
    return this.page;
  }
}
