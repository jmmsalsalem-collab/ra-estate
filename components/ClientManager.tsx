'use client';

import { useState } from 'react';

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: string;
  budgetMin: number;
  budgetMax: number;
  preferredType: string;
  status: string;
}

export default function ClientManager() {
  const [clients, setClients] = useState<Client[]>([
    { id: '1', name: 'Ahmed Al-Sabah', phone: '96599123456', email: 'ahmed@email.com', type: 'buyer', budgetMin: 500000, budgetMax: 1500000, preferredType: 'villa', status: 'active' },
    { id: '2', name: 'Fatima Al-Dossari', phone: '96598765432', email: 'fatima@email.com', type: 'renter', budgetMin: 50000, budgetMax: 150000, preferredType: 'apartment', status: 'active' },
    { id: '3', name: 'Mohammed Al-Othman', phone: '96597654321', email: 'mohammed@email.com', type: 'buyer', budgetMin: 800000, budgetMax: 2000000, preferredType: 'land', status: 'active' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'buyer',
    budgetMin: 0,
    budgetMax: 0,
    preferredType: 'apartment',
    status: 'active',
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
    const newClient: Client = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      type: formData.type,
      budgetMin: formData.budgetMin,
      budgetMax: formData.budgetMax,
      preferredType: formData.preferredType,
      status: formData.status,
    };
    setClients([...clients, newClient]);
    setFormData({
      name: '',
      phone: '',
      email: '',
      type: 'buyer',
      budgetMin: 0,
      budgetMax: 0,
      preferredType: 'apartment',
      status: 'active',
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Client Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          {showForm ? '✕ Cancel' : '+ Add Client'}
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
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500"
              >
                <option value="buyer">Buyer</option>
                <option value="renter">Renter</option>
                <option value="both">Both</option>
              </select>
              <input
                type="number"
                placeholder="Budget Min (د.ك)"
                value={formData.budgetMin}
                onChange={(e) => setFormData({ ...formData, budgetMin: Number(e.target.value) })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <input
                type="number"
                placeholder="Budget Max (د.ك)"
                value={formData.budgetMax}
                onChange={(e) => setFormData({ ...formData, budgetMax: Number(e.target.value) })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all font-medium"
            >
              Add Client
            </button>
          </form>
        </div>
      )}

      {/* Clients Table */}
      <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/50">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Name</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Phone</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Type</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Budget</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6 text-white font-medium">{client.name}</td>
                  <td className="py-4 px-6 text-gray-300">{client.phone}</td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs capitalize">
                      {client.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-cyan-400">
                    {formatKwd(client.budgetMin)} - {formatKwd(client.budgetMax)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs capitalize">
                      {client.status}
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
