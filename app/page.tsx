import Announcement from "@/components/Announcement";
import Video from "@/components/Video";
import EventList from "@/components/EventList";
import CallToAction from "@/components/CallToAction";
import Footer from "./layout/Footer";



export default function Home() {
  return (
    <main className="font-sans grow shrink-0 basis-auto">
      <Announcement >
        <Video src="https://www.youtube.com/embed/fhosZ_-6D40?si=kQ9QEpt6ZAfULdRk" width="100%" height="800px" />
      </Announcement>
      <EventList />
      <CallToAction />
      <Footer />
    </main>
  );
}
