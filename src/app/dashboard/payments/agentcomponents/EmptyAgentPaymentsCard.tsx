import { FC } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import Link from "next/link";

const EmptyAgentPaymentsCard: FC<{ forOwnBookings?: boolean }> = ({ forOwnBookings }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl shadow-xl bg-white/40 dark:bg-green-900/30 p-8 min-h-[200px]">
    <FaRegCreditCard className="text-5xl text-green-400 mb-4" />
    <div className="text-lg font-semibold mb-2">
      {forOwnBookings ? "You haven't booked any trip as a customer yet." : "You haven't booked any trip for others yet."}
    </div>
    <Link href={forOwnBookings ? "/trips" : "/dashboard/bookings"} className="mt-2 px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors">
      {forOwnBookings ? "Book now" : "Create booking"}
    </Link>
  </div>
);

export default EmptyAgentPaymentsCard;
