import { FC } from "react";
import { FaCalendarAlt, FaMoneyBillAlt, FaUserAlt } from "react-icons/fa";
import { FaMoneyBillTransfer, FaUserGroup } from "react-icons/fa6";

interface AdminPaymentsStatsProps {
  totalPayments: number;
  totalAmount: number;
  totalUsers: number;
  totalAgents: number;
}

const AdminPaymentsStats: FC<AdminPaymentsStatsProps> = ({ totalPayments, totalAmount, totalUsers, totalAgents }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 *:shadow-xl">
    <div className="bg-green-100 dark:bg-green-900/40 rounded-xl p-4 text-center">
      <div className="flex justify-center items-center text-2xl font-bold text-green-700 dark:text-green-200"><FaMoneyBillAlt /></div>
      <div className="text-2xl font-bold text-green-700 dark:text-green-200">{totalPayments}</div>
      <div className="text-sm text-green-800 dark:text-green-100">Payments</div>
    </div>
    <div className="bg-green-100 dark:bg-green-900/40 rounded-xl p-4 text-center">
      <div className="flex justify-center items-center text-2xl font-bold text-green-700 dark:text-green-200"><FaMoneyBillTransfer /></div>
      <div className="text-2xl font-bold text-green-700 dark:text-green-200">${totalAmount.toLocaleString()}</div>
      <div className="text-sm text-green-800 dark:text-green-100">Total Amount</div>
    </div>
    <div className="bg-green-100 dark:bg-green-900/40 rounded-xl p-4 text-center">
      <div className="flex justify-center items-center text-2xl font-bold text-green-700 dark:text-green-200"><FaUserAlt /></div>
      <div className="text-2xl font-bold text-green-700 dark:text-green-200">{totalUsers}</div>
      <div className="text-sm text-green-800 dark:text-green-100">Users</div>
    </div>
    <div className="bg-green-100 dark:bg-green-900/40 rounded-xl p-4 text-center">
      <div className="flex justify-center items-center text-2xl font-bold text-green-700 dark:text-green-200"><FaUserGroup /></div>
      <div className="text-2xl font-bold text-green-700 dark:text-green-200">{totalAgents}</div>
      <div className="text-sm text-green-800 dark:text-green-100">Agents</div>
    </div>
  </div>
);

export default AdminPaymentsStats;
