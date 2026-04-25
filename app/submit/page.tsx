import type { Metadata } from "next"
import {
  RiMailSendLine,
  RiEditLine,
  RiMailLine,
  RiTimeLine,
  RiPhoneLine,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { SubmitTemplate } from "@/components/submit/submit-template"
import { EligibilityItem } from "@/components/submit/eligibility-item"
import { StepCard } from "@/components/submit/step-card"

const SUBMISSION_EMAIL = "afnanthehorrorworldbd@gmail.com"
const MAILTO_SUBJECT = encodeURIComponent("ভয়ের ঘটনা — Afnan The Horror World")

export const metadata: Metadata = {
  title: "আপনার ঘটনা পাঠান | Afnan The Horror World",
  description:
    "আপনার সাথে ঘটে যাওয়া সত্য ভয়ের ঘটনা লিখে অথবা রেকর্ড করে আমাদের পাঠান।",
}

export default function SubmitPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-16 px-4 py-16">
      {/* Hero */}
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold lg:text-5xl">
          আপনার সত্য ভয়ের ঘটনা শেয়ার করুন
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-(--color-text-body)">
          আপনার সাথে বা আপনার পরিচিত কারো সাথে ঘটে যাওয়া সত্য ভয়ের ঘটনা লিখে
          অথবা ভয়েস রেকর্ড করে আমাদের পাঠান। আপনার ঘটনাটি লক্ষ লক্ষ শ্রোতার
          কাছে পৌঁছে যেতে পারে আফনান ভাইয়ের কণ্ঠে।
        </p>
      </section>

      {/* Eligibility */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          আপনার ঘটনা কি মনোনীত হতে পারে?
        </h2>
        <div className="grid gap-3">
          <EligibilityItem
            accepted
            text="ঘটনাটি অবশ্যই সত্য এবং বাস্তব হতে হবে"
          />
          <EligibilityItem
            accepted
            text="আপনি নিজে বা আপনার পরিচিত কেউ সরাসরি ঘটনাটি অনুভব করেছেন"
          />
          <EligibilityItem accepted text="যেকোনো দেশের ঘটনা গ্রহণযোগ্য" />
          <EligibilityItem
            accepted
            text="লিখে অথবা ভয়েস রেকর্ড করে পাঠাতে পারবেন"
          />
          <EligibilityItem
            accepted={false}
            text="কাল্পনিক বা সিনেমা থেকে নেওয়া ঘটনা গ্রহণযোগ্য নয়"
          />
        </div>
      </section>

      {/* How to Submit */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">কিভাবে ঘটনা পাঠাবেন?</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StepCard
            step={1}
            icon={RiEditLine}
            title="প্রস্তুত করুন"
            description="আপনার ঘটনা বিস্তারিতভাবে লিখুন অথবা ভয়েস রেকর্ড করুন"
          />
          <StepCard
            step={2}
            icon={RiMailLine}
            title="ইমেইল করুন"
            description="নিচের বাটনে ক্লিক করে আমাদের ইমেইল করুন"
          />
          <StepCard
            step={3}
            icon={RiTimeLine}
            title="যাচাই-বাছাই"
            description="আফনান ভাই প্রতিটি ঘটনা পড়েন এবং যাচাই করেন (৭-১৪ দিন)"
          />
          <StepCard
            step={4}
            icon={RiPhoneLine}
            title="মনোনীত"
            description="মনোনীত হলে আফনান ভাই আপনার সাথে যোগাযোগ করবেন"
          />
        </div>
      </section>

      {/* What to Include */}
      <SubmitTemplate />

      {/* Email CTA */}
      <section className="space-y-4 rounded-2xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-8 text-center">
        <h2 className="text-2xl font-semibold">প্রস্তুত তো?</h2>
        <p className="text-(--color-text-body)">
          আপনার ঘটনা ইমেইলে পাঠান — আমরা প্রতিটি ঘটনা মনোযোগ দিয়ে পড়ি।
        </p>
        <Button
          asChild
          size="lg"
          className="bg-(--color-crimson) text-white hover:bg-(--color-crimson-hover)"
        >
          <a href={`mailto:${SUBMISSION_EMAIL}?subject=${MAILTO_SUBJECT}`}>
            <RiMailSendLine className="mr-2 h-5 w-5" />
            ইমেইলে ঘটনা পাঠান
          </a>
        </Button>
        <p className="text-sm text-(--color-text-subtle)">{SUBMISSION_EMAIL}</p>
      </section>
    </main>
  )
}
