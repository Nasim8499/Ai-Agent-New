import { AgentRunner } from "./agent-runner";

const runner = new AgentRunner([
  {
    name: "start_browser",
    description: "Open the secure government portal session",
    execute: async (_, ctx) => {
      await ctx.browser.start();
      return { ok: true };
    }
  },
  {
    name: "collect_profile",
    description: "Collect the applicant profile and prepare the form",
    execute: async (_, ctx) => {
      await ctx.emit({ type: "thought", payload: { note: "Preparing applicant profile" } });
      return { ok: true, profile: "ready" };
    }
  },
  {
    name: "validate_documents",
    description: "Validate uploaded documents and run OCR if present",
    execute: async (_, ctx) => {
      return { ok: true, result: "document validation queued" };
    }
  },
  {
    name: "submit_application",
    description: "Submit the approved and confirmed application",
    execute: async (_, ctx) => {
      await ctx.browser.navigate("https://portal.example.gov/visa");
      const screenshot = await ctx.browser.screenshot();
      await ctx.emit({ type: "screenshot", payload: { base64: screenshot.base64 } });
      return { ok: true, screenshot: screenshot.base64.slice(0, 32) };
    }
  }
]);

runner.run({
  runId: "demo-run-visa-demo",
  applicationId: "demo-app-visa-demo",
  plan: ["start_browser", "collect_profile", "validate_documents", "submit_application"]
});
