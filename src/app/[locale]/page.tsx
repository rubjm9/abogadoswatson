import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { ServicesPreview } from "@/components/sections/services-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";

export default function Home() {

    return (
        <>
            <Hero />
            <Stats />
            <ServicesPreview />
            <Testimonials />
            <CTASection />
        </>
    );
}
