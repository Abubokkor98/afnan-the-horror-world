const TEMPLATE_FIELDS = [
  { label: "আপনার নাম", hint: '(অথবা "বেনামী" লিখুন যদি নাম প্রকাশ করতে না চান)' },
  { label: "আপনার ঠিকানা", hint: "(জেলা, দেশ)" },
  { label: "ঘটনা কখন ঘটেছিল?", hint: "(আনুমানিক তারিখ বা সাল)" },
  { label: "ঘটনার বিস্তারিত বিবরণ", hint: "(যতটুকু সম্ভব বিস্তারিত লিখুন)" },
  { label: "কোনো সাক্ষী ছিল কি?", hint: "(নাম বা সম্পর্ক)" },
  { label: "ভিডিওতে আপনার নাম উল্লেখ করা যাবে?", hint: "(হ্যাঁ / না)" },
] as const

export function SubmitTemplate() {
  return (
    <section lang="bn" className="space-y-6">
      <h2 className="text-2xl font-semibold">ঘটনায় যা যা উল্লেখ করবেন</h2>
      <div className="rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-6">
        <p className="mb-4 text-sm text-(--color-text-muted)">
          নিচের তথ্যগুলো অনুসরণ করে আপনার ঘটনা লিখুন অথবা রেকর্ড করুন:
        </p>
        <div className="space-y-3 rounded-lg bg-(--color-bg-page) p-4 font-mono text-sm">
          {TEMPLATE_FIELDS.map((field) => (
            <div key={field.label}>
              <span className=" text-(--color-crimson)">{field.label}:</span>{" "}
              <span className="text-(--color-text-subtle)">{field.hint}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
