import EmptyPaymentsCard from "../EmptyPaymentsCard";
import { FC } from "react";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  booking_id: string;
  processed_at: string;
  trip_name: string;
}

const PaymentsCard: FC<{ payments: Payment[] }> = ({ payments }) => {
  if (!payments || payments.length === 0) {
    return (
      <EmptyPaymentsCard
        message="You haven't booked any trip yet."
        buttonText="Book now"
        buttonHref="/trips"
      />
    );
  }
  return (
    <div className="rounded-2xl shadow-xl bg-white/40 dark:bg-green-900/30 p-6">
      <h3 className="text-xl font-semibold mb-4">Your Payments</h3>
      <ul className="divide-y divide-green-100 dark:divide-green-900">
        {payments.map((p) => (
          <li key={p.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-bold text-green-900 dark:text-green-100">{p.trip_name}</div>
              <div className="text-sm text-green-700 dark:text-green-200">Paid {p.amount} {p.currency} on {new Date(p.processed_at).toLocaleDateString()}</div>
            </div>
            <div className="mt-2 md:mt-0">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100`}>{p.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentsCard;
