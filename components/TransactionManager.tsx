'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader } from 'lucide-react';

interface Transaction {
  id: string;
  property_id: string;
  client_id: string;
  transaction_type: string;
  amount_kwd: number;
  commission_amount_kwd: number;
  transaction_date: string;
  status: string;
  properties?: { title: string; location: string };
  clients?: { name: string; phone: string };
  created_at: string;
}

export default function TransactionManager() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    property_id: '',
    client_id: '',
    transaction_type: 'sale',
    amount_kwd: 0,
    transaction_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [txRes, propRes, cliRes] = await Promise.all([
        fetch('/api/transactions'),
        fetch('/api/properties'),
        fetch('/api/clients'),
      ]);

      if (!txRes.ok || !propRes.ok || !cliRes.ok) throw new Error('Failed to fetch data');

      setTransactions(await txRes.json());
      setProperties(await propRes.json());
      setClients(await cliRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const formatKwd = (value: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create transaction');
      
      await fetchData();
      setFormData({
        property_id: '',
        client_id: '',
        transaction_type: 'sale',
        amount_kwd: 0,
        transaction_date: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
      alert('Transaction recorded successfully!');
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert('Failed to record transaction');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this transaction?')) return;
    
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete transaction');
      
      await fetchData();
      alert('Transaction deleted');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction');
    }
  };

  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount_kwd, 0);
  const totalCommissions = transactions.reduce((sum, t) => sum + t.commission_amount_kwd, 0);
  const completedCount = transactions.filter((t) => t.status === 'completed').length;

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
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all flex items-center gap-2"
        >
          {showForm ? '✕ Cancel' : <Plus size={18} />} {showForm ? 'Cancel' : 'Record Deal'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-0.5 rounded-lg">
          <div className="bg-slate-900 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-white">{formatKwd(totalRevenue)}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-0.5 rounded-lg">
          <div className="bg-slate-900 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Commissions (5%)</p>
            <p className="text-3xl font-bold text-white">{formatKwd(totalCommissions)}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-0.5 rounded-lg">
          <div className="bg-slate-900 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Completed Deals</p>
            <p className="text-3xl font-bold text-white">{completedCount}/{transactions.length}</p>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.property_id}
                onChange={(e) => setFormData({ ...formData, property_id: e.target.value })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="">Select Property...</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} - {formatKwd(p.price_kwd)}
                  </option>
                ))}
              </select>

              <select
                value={formData.client_id}
                onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="">Select Client...</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} - {c.phone}
                  </option>
                ))}
              </select>

              <select
                value={formData.transaction_type}
                onChange={(e) => setFormData({ ...formData, transaction_type: e.target.value })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="sale">Sale</option>
                <option value="rental">Rental</option>
              </select>

              <input
                type="number"
                placeholder="Amount (د.ك KWD)"
                value={formData.amount_kwd}
                onChange={(e) => setFormData({ ...formData, amount_kwd: Number(e.target.value) })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
              />

              <input
                type="date"
                value={formData.transaction_date}
                onChange={(e) => setFormData({ ...formData, transaction_date: e.target.value })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all font-medium disabled:opacity-50"
            >
              {submitting ? 'Recording...' : 'Record Transaction'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader size={32} className="text-orange-400 animate-spin" />
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>No transactions yet. Record a deal!</p>
        </div>
      ) : (
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-800/50">
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Property</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Client</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Type</th>
                  <th className="text-right py-4 px-6 text-gray-400 font-medium">Amount (د.ك)</th>
                  <th className="text-right py-4 px-6 text-gray-400 font-medium">Commission</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 text-white font-medium">{tx.properties?.title || 'N/A'}</td>
                    <td className="py-4 px-6 text-gray-300">{tx.clients?.name || 'N/A'}</td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs capitalize">
                        {tx.transaction_type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-cyan-400 font-semibold">{formatKwd(tx.amount_kwd)}</td>
                    <td className="py-4 px-6 text-right text-green-400 font-semibold">{formatKwd(tx.commission_amount_kwd)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs capitalize ${getStatusColor(tx.status)}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleDelete(tx.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
