import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { ServicesPreview } from "@/components/sections/services-preview";
import { TrustindexReviews } from "@/components/sections/trustindex-reviews";
import { CTASection } from "@/components/sections/cta-section";

export default function Home() {

    return (
        <>
            <Hero />
            <Stats />
            <ServicesPreview />
            <TrustindexReviews />
            <CTASection />
        </>
    );
}
