import HeroSlider from "../pages/Home";
import Eve from "../pages/Events";
import AboutPage from "../pages/About";
import EventsSection from "../pages/Eventstwo";
import Verse from "../pages/Verse";
import Gallery from "../pages/Gallery";
import Sermon from "../pages/Sermons";
import Map from "../pages/map";
 

function Layout() {
  return (
    <>
     <section id="Home">
        <HeroSlider />
      </section>

      <section id="eve">
        <Eve />
      </section>

      <section id="about">
        <AboutPage />
      </section>

      <section id="events">
        <EventsSection />
      </section>

      <section id="verse">
        <Verse />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="sermons">
        <Sermon />
      </section>

      <section id="contact">
        <Map />
      </section>

       
    </>
  );
}

export default Layout;
