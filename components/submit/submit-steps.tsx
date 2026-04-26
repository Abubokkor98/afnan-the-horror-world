import {
  RiEditLine,
  RiMailLine,
  RiTimeLine,
  RiPhoneLine,
} from "@remixicon/react"
import { StepCard } from "@/components/submit/step-card"

export function SubmitSteps() {
  return (
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
  )
}
