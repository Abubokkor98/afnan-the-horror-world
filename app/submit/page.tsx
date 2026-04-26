import type { Metadata } from "next"
import { SubmitHero } from "@/components/submit/submit-hero"
import { SubmitEligibility } from "@/components/submit/submit-eligibility"
import { SubmitSteps } from "@/components/submit/submit-steps"
import { SubmitTemplate } from "@/components/submit/submit-template"
import { SubmitEmailCta } from "@/components/submit/submit-email-cta"

export const metadata: Metadata = {
  title: "আপনার ঘটনা পাঠান | Afnan The Horror World",
  description:
    "আপনার সাথে ঘটে যাওয়া সত্য ভয়ের ঘটনা লিখে অথবা রেকর্ড করে আমাদের পাঠান।",
}

export default function SubmitPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-16 px-4 py-16">
      <SubmitHero />
      <SubmitEligibility />
      <SubmitSteps />
      <SubmitTemplate />
      <SubmitEmailCta />
    </main>
  )
}
