import { MAIN_CHANNEL_URL, AFNANS_BEE_URL } from "@/config/channel-urls"

export type Channel = "main" | "afnansbee"

export interface ScheduleItem {
  day: string
  dayBangla: string
  time: string
  show: string
  season: string | null
  irregular: boolean
  channel: Channel
  channelLabel: string
  channelUrl: string
}

export const WEEKLY_SCHEDULE: ScheduleItem[] = [
  {
    day: "Every Sunday",
    dayBangla: "প্রতি রবিবার",
    time: "10:59 PM",
    show: "অমীমাংসিত রহস্য",
    season: "Season 2",
    irregular: false,
    channel: "afnansbee",
    channelLabel: "@AfnansBee",
    channelUrl: AFNANS_BEE_URL,
  },
  {
    day: "Every Monday",
    dayBangla: "প্রতি সোমবার",
    time: "10:59 PM",
    show: "Horror Night",
    season: null,
    irregular: false,
    channel: "main",
    channelLabel: "@AfnanTheHorrorWorldBD",
    channelUrl: MAIN_CHANNEL_URL,
  },
  {
    day: "Every Tuesday",
    dayBangla: "প্রতি মঙ্গলবার",
    time: "10:59 PM",
    show: "Fear With Tuesday",
    season: null,
    irregular: false,
    channel: "afnansbee",
    channelLabel: "@AfnansBee",
    channelUrl: AFNANS_BEE_URL,
  },
  {
    day: "Every Thursday",
    dayBangla: "প্রতি বৃহস্পতিবার",
    time: "10:59 PM",
    show: "Thursday Night",
    season: null,
    irregular: false,
    channel: "main",
    channelLabel: "@AfnanTheHorrorWorldBD",
    channelUrl: MAIN_CHANNEL_URL,
  },
  {
    day: "Fridays",
    dayBangla: "শুক্রবার",
    time: "10:59 PM",
    show: "Friday Special Episode",
    season: null,
    irregular: true,
    channel: "main",
    channelLabel: "@AfnanTheHorrorWorldBD",
    channelUrl: MAIN_CHANNEL_URL,
  },
  {
    day: "Every Saturday",
    dayBangla: "প্রতি শনিবার",
    time: "10:59 PM",
    show: "শনির রাত",
    season: null,
    irregular: false,
    channel: "main",
    channelLabel: "@AfnanTheHorrorWorldBD",
    channelUrl: MAIN_CHANNEL_URL,
  },
]
