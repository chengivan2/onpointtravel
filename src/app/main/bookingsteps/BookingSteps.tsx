import BookingStepsImage from "./BookingStepsImage";
import BookingStepsInfo from "./BookingStepsInfo";

export default function BookingSteps() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 lg:gap-12">
        <BookingStepsInfo />
        <BookingStepsImage />
      </div>
    </section>
  );
}
