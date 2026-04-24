import type { Metadata } from "next"
import { RiMailLine } from "@remixicon/react"
import { getChannelInfo } from "@/lib/youtube/channel/get-channel-info"
import { Separator } from "@/components/ui/separator"
import { AboutTeam } from "@/app/about/about-team"
import { AboutStats } from "@/app/about/about-stats"
import { ShowSchedule } from "@/app/about/show-schedule"

export const metadata: Metadata = {
  title: "About | Afnan's Horror World",
  description: "The story behind Afnan's Horror World — preserving real horror stories from Bangladesh and beyond.",
}

export default async function AboutPage() {
  const channel = await getChannelInfo()

  return (
    <main className="mx-auto max-w-4xl space-y-20 px-4 py-16">
      {/* Hero */}
      <section className="space-y-4 text-center">
        <p className="text-sm font-medium tracking-widest text-(--color-crimson) uppercase">আমাদের সম্পর্কে</p>
        <h1 className="hero-title text-4xl text-(--color-crimson) lg:text-5xl">
          Afnan&apos;s Horror World
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-(--color-text-body)">
          বাংলা ভাষাভাষী হরর বিনোদনপ্রেমীদের জন্য সত্য ভয়ের ঘটনার অন্যতম প্ল্যাটফর্ম
        </p>
      </section>

      {/* Origin Story */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">আমাদের গল্প</h2>
        <div className="space-y-4 text-sm leading-relaxed text-(--color-text-body)">
          <p>
            বাংলার পথে-প্রান্তরে ছড়িয়ে ছিটিয়ে আছে অসংখ্য ভৌতিক ঘটনা। কবিতা, ছড়া, ধাঁ-ধাঁ, এগুলোর
            মতো এই ভৌতিক ঘটনাগুলোও যেনো আমাদের লোক সংস্কৃতিরই অংশ।
          </p>
          <p>
            আগের দিনে কুপির আলোয় বসে মুরুব্বিদের মুখে তাদের সাথে ঘটে যাওয়া বা তাদের জানা বিভিন্ন
            ভয়ের ঘটনা শুনে আমরা অনেকেই শিহরিত হতাম। সেই দিন হারিয়ে যাবার সাথে সাথে সেই
            ঘটনাগুলোও যেনো হারিয়ে যেতে বসেছে।
          </p>
          <div className="rounded-xl border-l-4 border-(--color-crimson) bg-(--color-bg-card) p-5">
            <p className="font-medium text-(--color-text-primary)">
              বাংলা ভাষাভাষী হরর বিনোদনপ্রেমীদের জন্য আমাদের এই চ্যানেলের যাত্রা শুরু হয় ১০ জানুয়ারি, ২০২২
              সালে। হাঁটি হাঁটি পা পা করে খুবই অল্প সময়ের মধ্যে দেশ ও দেশের বাইরে বাংলা ভাষাভাষী মানুষের
              কাছে এই চ্যানেলটি হরর বিনোদনের অন্যতম একটি প্ল্যাটফর্ম হিসেবে গ্রহণযোগ্যতা পায়।
            </p>
          </div>
          <p>
            বর্তমানে বিশ্বের ১০০ টির উপরে দেশে থাকা বাংলা ভাষাভাষী মানুষ এই চ্যানেলের ঘটনাগুলো
            শুনে থাকেন। এই চ্যানেলের শ্রোতারাই মূলত ভয়ের ঘটনাগুলো ইমেইল করে পাঠিয়ে থাকেন।
            সেগুলো যাচাই-বাছাই করে প্রচারের জন্য মনোনীত হলে সেগুলো প্রচার করা হয়ে থাকে।
          </p>
        </div>
      </section>

      <Separator className="bg-(--color-border)" />

      {/* Show Schedule */}
      <ShowSchedule />

      <Separator className="bg-(--color-border)" />

      {/* Mission */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">আমাদের লক্ষ্য</h2>
        <div className="rounded-2xl border border-(--color-crimson)/20 bg-gradient-to-br from-(--color-crimson)/5 to-transparent p-8">
          <p className="text-center text-lg font-medium leading-relaxed text-(--color-text-primary)">
            ছড়িয়ে ছিটিয়ে থাকা সত্য ভয়ের ঘটনাগুলোকে আমাদের লোকসংস্কৃতির একটি অংশ হিসেবে
            তুলে ধরাই আমাদের চ্যানেলের অন্যতম লক্ষ্য।
          </p>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-(--color-text-body)">
          <p>
            এই চ্যানেলের মাধ্যমে লিসেনারদের কাছে সত্য ভয়ের ঘটনা তুলে ধরার আপ্রাণ চেষ্টা করি।
            যদিওবা প্রচারিত ঘটনাগুলোর সত্যতা সম্পর্কে আমরা নিশ্চয়তা দিতে পারি না এবং আমরা সেই
            অকাট্য দাবিও করতে পারি না। কারণ, ভয়ের ঘটনাগুলো প্রমাণ করা যায় না। তাছাড়া আমরা বিশ্বাস
            করি আমাদের সম্মানিত লিসেনারগণ আমাদেরকে সত্য ভয়ের ঘটনাগুলোই পাঠান।
          </p>
          <p>
            প্যারানরমাল বিষয় নিয়ে দেশি এবং আন্তর্জাতিক মানের কোনো গবেষণায় সহযোগিতা করতে আমরা
            চেষ্টা করি। তবে কারো প্যারানরমাল সমস্যা সমাধানে আমরা কোনো ভূমিকা রাখি না এবং এই
            বিষয় নিয়ে কোনো সহায়তাও আমরা করি না।
          </p>
        </div>
      </section>

      <Separator className="bg-(--color-border)" />

      {/* Community Stats */}
      {channel && <AboutStats channel={channel} />}

      <Separator className="bg-(--color-border)" />

      {/* Team */}
      <AboutTeam />

      <Separator className="bg-(--color-border)" />

      {/* Disclaimer */}
      <section className="space-y-4 rounded-xl border border-(--color-bg-elevated) bg-(--color-bg-card) p-6">
        <h3 className="text-sm font-semibold text-(--color-text-muted)">বিশেষ দ্রষ্টব্য</h3>
        <p className="text-xs leading-relaxed text-(--color-text-subtle)">
          চ্যানেলে প্রচারিত অধিকাংশ ঘটনায় ঘটনা সংগ্রহকারীর অনুরোধে এবং বাস্তবতার নিরিখে বিভিন্ন
          ছদ্মনাম ব্যবহার করা হয়। তাই উক্ত ঘটনায় উল্লিখিত নামের সাথে বাস্তবে কোনো নাম মিলে গেলে
          সেটা কাকতালীয় ব্যাপার। তার জন্য চ্যানেল কর্তৃপক্ষ দায়ী নয়।
        </p>
      </section>

      {/* Contact */}
      <section className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold">যোগাযোগ</h2>
        <p className="text-sm text-(--color-text-muted)">
          For collaborations, press, or partnerships
        </p>
        <a
          href="mailto:contact@afnanshorrorworld.com"
          className="inline-flex items-center gap-2 rounded-lg bg-(--color-crimson) px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--color-crimson-hover)"
        >
          <RiMailLine className="h-4 w-4" />
          contact@afnanshorrorworld.com
        </a>
      </section>
    </main>
  )
}
