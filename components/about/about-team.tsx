import { FounderCard } from "@/components/about/founder-card"
import { TeamCard } from "@/components/about/team-card"

interface TeamMember {
  name: string
  role: string
  bio?: string
  avatarUrl: string
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "এম. এম. রহমত উল্লাহ আফনান",
    role: "Founder & Managing Director",
    bio: "জগন্নাথ বিশ্ববিদ্যালয়ের ফিন্যান্স বিভাগ থেকে BBA এবং MBA শেষ করেন। ২০১৩ সাল থেকে Bhoot FM-এ জনপ্রিয় স্টোরি টেলার।",
    avatarUrl: "https://ui-avatars.com/api/?name=M+M+Afnan&background=B91C1C&color=fff&size=200&bold=true",
  },
  {
    name: "রুনু আক্তার কণা",
    role: "Co-Founder & CEO",
    avatarUrl: "https://ui-avatars.com/api/?name=R+A+Kona&background=B91C1C&color=fff&size=200&bold=true",
  },
  {
    name: "সৌমিত্র রয়",
    role: "Chief Moderator & System Analyst",
    avatarUrl: "https://ui-avatars.com/api/?name=S+Roy&background=B91C1C&color=fff&size=200&bold=true",
  },
  {
    name: "মো: বদরুজ্জামান রাকিব",
    role: "Moderator, Strategy & Programme Analyst",
    avatarUrl: "https://ui-avatars.com/api/?name=B+Rakib&background=B91C1C&color=fff&size=200&bold=true",
  },
  {
    name: "মো: মুইন জামান",
    role: "Moderator, Graphics Designer & Editor",
    avatarUrl: "https://ui-avatars.com/api/?name=M+Zaman&background=B91C1C&color=fff&size=200&bold=true",
  },
]

export function AboutTeam() {
  const founder = TEAM_MEMBERS[0]
  const members = TEAM_MEMBERS.slice(1)

  return (
    <section className="space-y-10">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-semibold">আমাদের টিম</h2>
        <p className="text-(--color-text-muted)">The people behind every story</p>
      </div>

      <FounderCard
        name={founder.name}
        role={founder.role}
        bio={founder.bio}
        avatarUrl={founder.avatarUrl}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member) => (
          <TeamCard
            key={member.name}
            name={member.name}
            role={member.role}
            avatarUrl={member.avatarUrl}
          />
        ))}
      </div>
    </section>
  )
}
