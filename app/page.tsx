import { Navbar } from "@/components/navbar";
import InfiniteMovingCardsDemo from "@/components/current-work";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { BlogSection } from "@/components/blog-section";
import { Footer } from "@/components/footer";
import WorkExperience from "@/components/WorkExperience";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <InfiniteMovingCardsDemo />
      <AboutSection />
      <WorkExperience />
      <ProjectsSection />
      <SkillsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  );
}