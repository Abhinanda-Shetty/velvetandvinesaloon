import interior from "@/assets/salon-interior.jpg";
import artistry from "@/assets/experience-artistry.jpg";
import ritual from "@/assets/experience-ritual.jpg";
import { CircularCarousel } from "./CircularCarousel";
import { Reveal } from "./ui";

const principles = [
  { n: "I", title: "Personal, Never Prescribed.", copy: "Every visit opens with a conversation about you — your hair, your routine, your idea of beautiful." },
  { n: "II", title: "Artistry in Every Detail.", copy: "From the first section to the final finish, we work with patience and precision." },
  { n: "III", title: "Luxury That Feels Like You.", copy: "Calm surroundings, attentive service and haircare we genuinely believe in." },
];

export function Experience() {
  return (
    <section id="experience" className="experience-section relative overflow-hidden py-20 text-foreground sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div className="min-w-0 lg:order-2">
          <Reveal>
            <p className="eyebrow">The Experience</p>
            <h2 className="display mt-6 text-5xl sm:text-6xl lg:text-7xl">A Little Luxury, <em className="text-gold-sheen">Just for You.</em></h2>
            <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
              We believe great hair begins with listening. Each appointment is shaped by a personal consultation, celebrating your individual expression and delivered with attentive, unhurried care — in surroundings designed to let you breathe out.
            </p>
          </Reveal>
          <ol className="mt-8 space-y-5">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.1}>
                <li className="grid grid-cols-[2rem_1fr] gap-4 border-t border-border pt-5">
                  <span className="display text-2xl italic text-gold">{p.n}</span>
                  <div>
                    <h3 className="display text-2xl">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="min-w-0 lg:order-1">
          <CircularCarousel items={[
            { src: artistry, alt: "Precision haircut with steel scissors in a burgundy salon", title: "The Artistry", subtitle: "Considered craftsmanship" },
            { src: interior, alt: "Burgundy velvet chairs and brass mirrors in the salon", title: "The Sanctuary", subtitle: "Space to unwind" },
            { src: ritual, alt: "Relaxing hair wash with brass fittings and soft towels", title: "The Ritual", subtitle: "Care in every detail" },
          ]} />
        </div>
      </div>
    </section>
  );
}
