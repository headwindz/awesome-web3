import { getAllEvents } from "@/lib/events"
import TimelineClient from "./timeline-client"

export default function Home() {
  const events = getAllEvents()

  return <TimelineClient events={events} />
}
