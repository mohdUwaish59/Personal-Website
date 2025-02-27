import { Navbar } from "@/components/navbar"; // Update with your actual path
import { Footer } from "@/components/footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
