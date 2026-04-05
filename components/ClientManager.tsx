'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Loader } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  client_type: string;
  budget_min_kwd: number;
  budget_max_kwd: number;
  status: string;
  created_at: string;
}

export default function ClientManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    client_type: 'buyer',
    budget_min_kwd: 0,
    budget_max_kwd: 0,
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/clients');
      if (!res.ok) throw new Error('Failed to fetch clients');
      const data = await res.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      alert('Failed to load clients');
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
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create client');
      
      await fetchClients();
      setFormData({
        name: '',
        phone: '',
        email: '',
        client_type: 'buyer',
        budget_min_kwd: 0,
        budget_max_kwd: 0,
      });
      setShowForm(false);
      alert('Client added successfully!');
    } catch (error) {
      console.error('Error creating client:', error);
      alert('Failed to add client');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this client?')) return;
    
    try {
      const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete client');
      
      await fetchClients();
      alert('Client deleted');
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Failed to delete client');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Client Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
        >
          {showForm ? '✕ Cancel' : <Plus size={18} />} {showForm ? 'Cancel' : 'Add Client'}
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <select
                value={formData.client_type}
                onChange={(e) => setFormData({ ...formData, client_type: e.target.value })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500"
              >
                <option value="buyer">Buyer</option>
                <option value="renter">Renter</option>
                <option value="investor">Investor</option>
              </select>
              <input
                type="number"
                placeholder="Budget Min (د.ك)"
                value={formData.budget_min_kwd}
                onChange={(e) => setFormData({ ...formData, budget_min_kwd: Number(e.target.value) })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <input
                type="number"
                placeholder="Budget Max (د.ك)"
                value={formData.budget_max_kwd}
                onChange={(e) => setFormData({ ...formData, budget_max_kwd: Number(e.target.value) })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all font-medium disabled:opacity-50"
            >
              {submitting ? 'Adding...' : 'Add Client'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader size={32} className="text-purple-400 animate-spin" />
        </div>
      ) : clients.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>No clients yet. Add one to get started!</p>
        </div>
      ) : (
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-800/50">
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Phone</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Type</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Budget</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 text-white font-medium">{client.name}</td>
                    <td className="py-4 px-6 text-gray-300">{client.phone}</td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs capitalize">
                        {client.client_type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-cyan-400 text-sm">
                      {formatKwd(client.budget_min_kwd)} - {formatKwd(client.budget_max_kwd)}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleDelete(client.id)}
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
