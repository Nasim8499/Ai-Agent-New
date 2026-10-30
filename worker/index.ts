import { BrowserWorker } from "./browser-worker";
import { OcrWorker } from "./ocr-worker";

export type AgentEvent = {
  seq: number;
  type:
    | "run_started"
    | "thought"
    | "tool_call"
    | "tool_result"
    | "screenshot"
    | "checkpoint"
    | "awaiting_user"
    | "run_completed"
    | "error";
  payload: unknown;
};

type AgentTool = {
  name: string;
  description: string;
  execute: (input: any, ctx: any) => Promise<unknown>;
};

export class AgentRunner {
  private seq = 0;
  private _runId?: string;

  constructor(private readonly tools: AgentTool[] = []) {}

  async run(input: { runId: string; applicationId: string; plan: string[] }) {
    this._runId = input.runId;
    const browser = new BrowserWorker();
    const ocr = new OcrWorker();

    const ctx = {
      runId: input.runId,
      applicationId: input.applicationId,
      browser,
      ocr,
      emit: this.emit.bind(this)
    };

    try {
      await this.emit({ type: "run_started", payload: { plan: input.plan } });

      for (const stepName of input.plan) {
        const tool = this.tools.find((t) => t.name === stepName);
        if (!tool) throw new Error(`Unknown agent step: ${stepName}`);

        await this.emit({ type: "tool_call", payload: { tool: tool.name, description: tool.description } });
        const result = await tool.execute({}, ctx);
        await this.emit({ type: "tool_result", payload: { tool: tool.name, result } });
        await this.emit({ type: "checkpoint", payload: { step: tool.name, status: "completed" } });
      }

      await this.emit({ type: "run_completed", payload: { status: "completed" } });
    } catch (error: any) {
      await this.emit({ type: "error", payload: { message: error.message } });
    } finally {
      await browser.close();
    }
  }

  private async emit(event: Omit<AgentEvent, "seq">) {
    const seq = ++this.seq;
    const runtimeStore = globalThis as typeof globalThis & { __visaEvents?: Record<string, any[]> };
    if (!runtimeStore.__visaEvents) runtimeStore.__visaEvents = {};
    const runId = this.currentRunId;
    const existing = runtimeStore.__visaEvents[runId] ?? [];
    runtimeStore.__visaEvents[runId] = [...existing, { seq, ...event }];
  }

  private get currentRunId() {
    if (!this._runId) throw new Error("Run ID not set");
    return this._runId;
  }
}
