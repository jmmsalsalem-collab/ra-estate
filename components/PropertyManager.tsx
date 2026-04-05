'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Loader } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  property_type: string;
  location: string;
  size_sqm: number;
  bedrooms: number;
  bathrooms: number;
  price_kwd: number;
  property_status: string;
  listing_type: string;
  created_at: string;
}

export default function PropertyManager() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    property_type: 'apartment',
    location: '',
    size_sqm: 0,
    bedrooms: 0,
    bathrooms: 0,
    price_kwd: 0,
    listing_type: 'sale',
  });

  // Fetch properties on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/properties');
      if (!res.ok) throw new Error('Failed to fetch properties');
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      alert('Failed to load properties');
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
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create property');
      
      await fetchProperties();
      setFormData({
        title: '',
        property_type: 'apartment',
        location: '',
        size_sqm: 0,
        bedrooms: 0,
        bathrooms: 0,
        price_kwd: 0,
        listing_type: 'sale',
      });
      setShowForm(false);
      alert('Property added successfully!');
    } catch (error) {
      console.error('Error creating property:', error);
      alert('Failed to add property');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete property');
      
      await fetchProperties();
      alert('Property deleted successfully!');
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'sold':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'rented':
        return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Property Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2"
        >
          {showForm ? '✕ Cancel' : <Plus size={18} />} {showForm ? 'Cancel' : 'Add Property'}
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Property Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <select
                value={formData.property_type}
                onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
              <input
                type="text"
                placeholder="Location (District)"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Size (sqm)"
                value={formData.size_sqm}
                onChange={(e) => setFormData({ ...formData, size_sqm: Number(e.target.value) })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Bedrooms"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Bathrooms"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Price (د.ك KWD)"
                value={formData.price_kwd}
                onChange={(e) => setFormData({ ...formData, price_kwd: Number(e.target.value) })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <select
                value={formData.listing_type}
                onChange={(e) => setFormData({ ...formData, listing_type: e.target.value })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all font-medium disabled:opacity-50"
            >
              {submitting ? 'Adding...' : 'Add Property'}
            </button>
          </form>
        </div>
      )}

      {/* Properties Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader size={32} className="text-blue-400 animate-spin" />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>No properties yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {properties.map((prop) => (
            <div key={prop.id} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{prop.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">📍 {prop.location}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(prop.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} className="text-red-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(prop.property_status)}`}>
                    {prop.property_status.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">{prop.listing_type}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm text-gray-200 capitalize">{prop.property_type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Size</p>
                    <p className="text-sm text-gray-200">{prop.size_sqm} sqm</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Beds</p>
                    <p className="text-sm text-gray-200">{prop.bedrooms}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/50">
                  <p className="text-2xl font-bold text-cyan-400">{formatKwd(prop.price_kwd)}</p>
                  <p className="text-xs text-gray-500 mt-1">Added {new Date(prop.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
