import { randomUUID } from "node:crypto";
import { env } from "../config/env.js";
import type { AuditInput } from "../types/audit.js";
import { getSupabaseClient } from "../lib/supabase.js";
import { ApiError } from "../utils/ApiError.js";

type StoredReport = {
  id: string;
  title: string;
  publicUrl: string;
  auditResult: Record<string, unknown>;
  anonymizedSpendData?: unknown;
  createdAt: string;
};

const inMemoryReports = new Map<string, StoredReport>();

export async function createShareableReport(input: {
  auditInput?: AuditInput;
  auditResult: Record<string, unknown>;
  title: string;
}) {
  const id = randomUUID();
  const report: StoredReport = {
    id,
    title: input.title,
    publicUrl: `${env.CLIENT_BASE_URL.replace(/\/$/, "")}/report/${id}`,
    auditResult: input.auditResult,
    anonymizedSpendData: anonymizeAuditInput(input.auditInput),
    createdAt: new Date().toISOString(),
  };

  const supabase = getSupabaseClient();
  if (!supabase) {
    console.log(
      "[createShareableReport] Supabase client is null, falling back to inMemoryReports.",
    );
    inMemoryReports.set(id, report);
    return report;
  }

  console.log(
    `[createShareableReport] Attempting to insert report ID ${id} into Supabase...`,
  );
  const { error } = await supabase.from("reports").insert({
    id,
    title: report.title,
    public_url: report.publicUrl,
    audit_result: report.auditResult,
    anonymized_spend_data: report.anonymizedSpendData,
  });

  if (error) {
    console.error(
      `[createShareableReport] Supabase insertion error for report ID ${id}:`,
      error,
    );
    throw new ApiError(500, "Could not create report", error.message);
  }

  console.log(
    `[createShareableReport] Successfully inserted report ID ${id} into Supabase.`,
  );
  return report;
}

export async function getShareableReport(id: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return inMemoryReports.get(id) ?? null;
  }

  const { data, error } = await supabase
    .from("reports")
    .select("id,title,public_url,audit_result,anonymized_spend_data,created_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new ApiError(500, "Could not fetch report", error.message);
  }

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    publicUrl: data.public_url,
    auditResult: data.audit_result,
    anonymizedSpendData: data.anonymized_spend_data,
    createdAt: data.created_at,
  };
}

function anonymizeAuditInput(auditInput?: AuditInput) {
  if (!auditInput) {
    return undefined;
  }

  return {
    teamSize: auditInput.teamSize,
    useCase: auditInput.useCase,
    monthlyAiBudget: auditInput.monthlyAiBudget,
    tools: auditInput.tools.map((tool) => ({
      tool: tool.tool,
      plan: tool.plan,
      seats: tool.seats,
      monthlySpend: tool.monthlySpend,
      usageType: tool.usageType,
    })),
  };
}
