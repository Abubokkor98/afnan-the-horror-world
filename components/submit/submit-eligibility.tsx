import { EligibilityItem } from "@/components/submit/eligibility-item"

export function SubmitEligibility() {
  return (
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
  )
}
