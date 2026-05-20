import HeroBanner from "@/components/home/HeroBanner";
import TopRatedDoctors from "@/components/home/TopRatedDoctors";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export const metadata = {
  title: "DocAppoint — Book Doctor Appointments Online",
  description:
    "Browse top-rated doctors in Bangladesh and book appointments instantly.",
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TopRatedDoctors />
      <HowItWorks />
      <WhyChooseUs />
    </>
  );
}
