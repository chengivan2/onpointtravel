import BookingStepsImage from "./BookingStepsImage";
import BookingStepsInfo from "./BookingStepsInfo";

export default function BookingSteps() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <BookingStepsInfo />
        <BookingStepsImage />
      </div>
    </section>
  );
}
