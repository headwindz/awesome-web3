import { getAllEvents } from "@/lib/events"
import TimelineClient from "../components/timeline"

export default async function Home() {
  const events = await getAllEvents()

  return <TimelineClient events={events} />
}
