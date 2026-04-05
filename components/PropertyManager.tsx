'use client';

import { useState } from 'react';

interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  size: number;
  beds: number;
  baths: number;
  price: number;
  status: string;
  listingType: string;
}

export default function PropertyManager() {
  const [properties, setProperties] = useState<Property[]>([
    { id: '1', title: 'Villa - Salmiya Beach', type: 'villa', location: 'Salmiya', size: 450, beds: 4, baths: 3, price: 850000, status: 'available', listingType: 'sale' },
    { id: '2', title: 'Apartment - Zamalek', type: 'apartment', location: 'Zamalek', size: 180, beds: 3, baths: 2, price: 650000, status: 'available', listingType: 'sale' },
    { id: '3', title: 'Land Plot - Jahra', type: 'land', location: 'Jahra', size: 800, beds: 0, baths: 0, price: 1200000, status: 'sold', listingType: 'sale' },
    { id: '4', title: 'Commercial Space - Downtown', type: 'commercial', location: 'Downtown', size: 200, beds: 0, baths: 2, price: 125000, status: 'available', listingType: 'rent' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'apartment',
    location: '',
    size: 0,
    beds: 0,
    baths: 0,
    price: 0,
    status: 'available',
    listingType: 'sale',
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
    const newProperty: Property = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type,
      location: formData.location,
      size: formData.size,
      beds: formData.beds,
      baths: formData.baths,
      price: formData.price,
      status: formData.status,
      listingType: formData.listingType,
    };
    setProperties([...properties, newProperty]);
    setFormData({
      title: '',
      type: 'apartment',
      location: '',
      size: 0,
      beds: 0,
      baths: 0,
      price: 0,
      status: 'available',
      listingType: 'sale',
    });
    setShowForm(false);
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
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          {showForm ? '✕ Cancel' : '+ Add Property'}
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
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: Number(e.target.value) })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Bedrooms"
                value={formData.beds}
                onChange={(e) => setFormData({ ...formData, beds: Number(e.target.value) })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Bathrooms"
                value={formData.baths}
                onChange={(e) => setFormData({ ...formData, baths: Number(e.target.value) })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Price (د.ك KWD)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <select
                value={formData.listingType}
                onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
                className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all font-medium"
            >
              Add Property
            </button>
          </form>
        </div>
      )}

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {properties.map((prop) => (
          <div key={prop.id} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{prop.title}</h3>
                <p className="text-sm text-gray-400 mt-1">📍 {prop.location}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(prop.status)}`}>
                {prop.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="text-sm text-gray-200 capitalize">{prop.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Listing</p>
                  <p className="text-sm text-gray-200 capitalize">{prop.listingType}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-xs text-gray-500">Size</p>
                  <p className="text-sm text-gray-200">{prop.size} sqm</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Beds</p>
                  <p className="text-sm text-gray-200">{prop.beds}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Baths</p>
                  <p className="text-sm text-gray-200">{prop.baths}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/50">
                <p className="text-2xl font-bold text-cyan-400">{formatKwd(prop.price)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
