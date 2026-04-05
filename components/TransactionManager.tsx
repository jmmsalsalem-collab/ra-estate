'use client';

import { useState } from 'react';

interface Transaction {
  id: string;
  propertyTitle: string;
  clientName: string;
  type: string;
  amount: number;
  date: string;
  status: string;
  commission: number;
}

export default function TransactionManager() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', propertyTitle: 'Luxury Villa - Salmiya Waterfront', clientName: 'Ahmed Al-Sabah', type: 'sale', amount: 2850000, date: '2026-03-28', status: 'completed', commission: 142500 },
    { id: '2', propertyTitle: 'Premium Apartment - Zamalek Tower', clientName: 'Fatima Al-Dossari', type: 'rent', amount: 450000, date: '2026-03-29', status: 'completed', commission: 22500 },
    { id: '3', propertyTitle: 'Business Hub - Downtown Kuwait', clientName: 'Mohammed Al-Othman', type: 'rent', amount: 750000, date: '2026-03-30', status: 'completed', commission: 37500 },
    { id: '4', propertyTitle: 'Modern Villa - Bayan Hills', clientName: 'Layla Al-Rashid', type: 'sale', amount: 1950000, date: '2026-03-31', status: 'pending', commission: 97500 },
    { id: '5', propertyTitle: 'Executive Apartment - Salmiya', clientName: 'Khalid Al-Enezi', type: 'rent', amount: 350000, date: '2026-04-01', status: 'completed', commission: 17500 },
    { id: '6', propertyTitle: 'Land Plot - Kaifan', clientName: 'Ibrahim Al-Dawood', type: 'sale', amount: 1800000, date: '2026-04-02', status: 'pending', commission: 90000 },
    { id: '7', propertyTitle: 'Retail Space - The Avenues', clientName: 'Sara Al-Aziz', type: 'rent', amount: 320000, date: '2026-04-03', status: 'completed', commission: 16000 },
    { id: '8', propertyTitle: 'Spacious Villa - Mishref', clientName: 'Noor Al-Mutairi', type: 'sale', amount: 1650000, date: '2026-04-04', status: 'pending', commission: 82500 },
    { id: '9', propertyTitle: 'Commercial Land - Jahra Industrial', clientName: 'Mohammed Al-Othman', type: 'sale', amount: 3200000, date: '2026-04-05', status: 'completed', commission: 160000 },
    { id: '10', propertyTitle: 'Studio Apartment - Jaber Al-Ahmed', clientName: 'Layla Al-Rashid', type: 'sale', amount: 380000, date: '2026-04-05', status: 'pending', commission: 19000 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    propertyTitle: '',
    clientName: '',
    type: 'sale',
    amount: 0,
    date: '',
    status: 'pending',
  });

  const formatKwd = (value: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const commission = formData.amount * 0.05;
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      propertyTitle: formData.propertyTitle,
      clientName: formData.clientName,
      type: formData.type,
      amount: formData.amount,
      date: formData.date,
      status: formData.status,
      commission,
    };
    setTransactions([...transactions, newTransaction]);
    setFormData({
      propertyTitle: '',
      clientName: '',
      type: 'sale',
      amount: 0,
      date: '',
      status: 'pending',
    });
    setShowForm(false);
  };

  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalCommissions = transactions.reduce((sum, t) => sum + t.commission, 0);
  const completedTransactions = transactions.filter((t) => t.status === 'completed').length;

  const getStatusColor = (status: string) => {
    return status === 'completed'
      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Transaction Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all"
        >
          {showForm ? '✕ Cancel' : '+ Record Transaction'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-0.5 rounded-lg">
          <div className="bg-slate-900 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-white">{formatKwd(totalRevenue)}</p>
            <p className="text-gray-500 text-sm mt-2">From all transactions</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-0.5 rounded-lg">
          <div className="bg-slate-900 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Commissions</p>
            <p className="text-3xl font-bold text-white">{formatKwd(totalCommissions)}</p>
            <p className="text-gray-500 text-sm mt-2">5% commission rate</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-0.5 rounded-lg">
          <div className="bg-slate-900 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Completed Deals</p>
            <p className="text-3xl font-bold text-white">{completedTransactions}</p>
            <p className="text-gray-500 text-sm mt-2">Out of {transactions.length} total</p>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Property Title"
                value={formData.propertyTitle}
                onChange={(e) => setFormData({ ...formData, propertyTitle: e.target.value })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Client Name"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="sale">Sale</option>
                <option value="rent">Rental</option>
              </select>
              <input
                type="number"
                placeholder="Amount (د.ك KWD)"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all font-medium"
            >
              Record Transaction
            </button>
          </form>
        </div>
      )}

      {/* Transactions Table */}
      <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/50">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Property</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Client</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Type</th>
                <th className="text-right py-4 px-6 text-gray-400 font-medium">Amount (د.ك)</th>
                <th className="text-right py-4 px-6 text-gray-400 font-medium">Commission</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6 text-white font-medium">{tx.propertyTitle}</td>
                  <td className="py-4 px-6 text-gray-300">{tx.clientName}</td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs capitalize">
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right text-cyan-400 font-semibold">{formatKwd(tx.amount)}</td>
                  <td className="py-4 px-6 text-right text-green-400 font-semibold">{formatKwd(tx.commission)}</td>
                  <td className="py-4 px-6 text-gray-300 text-sm">{tx.date}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs capitalize ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
