import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/salon/Navbar";
import { Hero } from "@/components/salon/Hero";
import { Services } from "@/components/salon/Services";
import { Stylists } from "@/components/salon/Stylists";
import { Experience } from "@/components/salon/Experience";
import { Testimonials } from "@/components/salon/Testimonials";
import { Booking, type Prefill } from "@/components/salon/Booking";
import { Contact, Footer } from "@/components/salon/Contact";
import { scrollToId } from "@/components/salon/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Velvet & Vine Salon — Where Beauty Becomes an Art Form" },
      { name: "description", content: "Luxury independent hair & beauty salon in London. Precision cuts, balayage, treatments and bridal styling, tailored to you." },
      { property: "og:title", content: "Velvet & Vine Salon — Luxury Hair in London" },
      { property: "og:description", content: "Thoughtful consultations, exceptional artistry and beauty experiences designed around you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [prefill, setPrefill] = useState<Prefill>({ nonce: 0 });
  const book = (p: Omit<Prefill, "nonce">) => {
    setPrefill((cur) => ({ ...p, nonce: cur.nonce + 1 }));
    scrollToId("booking");
  };

  return (
    <>
      <div className="atmosphere" aria-hidden />
      <div className="grain" aria-hidden />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <div className="hairline mx-auto max-w-7xl" />
        <Services onBook={(s) => book({ service: s.name })} />
        <Stylists onBook={(name) => book({ stylist: name })} />
        <Experience />
        <Testimonials />
        <Booking prefill={prefill} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
