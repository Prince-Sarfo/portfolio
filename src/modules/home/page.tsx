import { Navbar } from "@/modules/home/components/layout/navbar";
import { Footer } from "@/modules/home/components/layout/footer";
import { HeroSection } from "@/modules/home/components/sections/hero-section";
import { AboutSection } from "@/modules/home/components/sections/about-section";
import { SkillsSection } from "@/modules/home/components/sections/skills-section";
import { ExperienceSection } from "@/modules/home/components/sections/experience-section";
import { ProjectsSection } from "@/modules/home/components/sections/projects-section";
import { ContactSection } from "@/modules/home/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
