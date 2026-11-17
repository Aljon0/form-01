import MotionRoot from "@/components/layout/MotionRoot";
import CampaignClosing from "@/components/sections/CampaignClosing";
import ColorwayReveal from "@/components/sections/ColorwayReveal";
import MaterialsSection from "@/components/sections/MaterialsSection";
import PinnedSneakerStory from "@/components/sections/PinnedSneakerStory";
import ProductSpecs from "@/components/sections/ProductSpecs";
import SilhouetteSection from "@/components/sections/SilhouetteSection";
import SneakerHero from "@/components/sections/SneakerHero";

export default function Home() {
  return (
    <MotionRoot>
      <PinnedSneakerStory />
      {/* Static version: mobile, reduced motion, and no-JS fallback. */}
      <div className="story-static">
        <SneakerHero />
        <SilhouetteSection />
        <MaterialsSection />
        <ColorwayReveal />
        <ProductSpecs />
        <CampaignClosing />
      </div>
    </MotionRoot>
  );
}