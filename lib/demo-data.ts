// R&A Estate — Demo Data (Kuwait Real Estate)

export interface Property {
  id: string;
  title: string;
  description: string;
  property_type: 'villa' | 'apartment' | 'land' | 'commercial';
  location: string;
  size_sqm: number;
  bedrooms: number;
  bathrooms: number;
  price_kwd: number;
  property_status: 'available' | 'sold' | 'rented' | 'under_offer';
  listing_type: 'sale' | 'rent';
  agent_id: string;
  created_at: string;
  image_gradient: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  client_type: 'buyer' | 'renter' | 'investor';
  budget_min_kwd: number;
  budget_max_kwd: number;
  preferred_location: string;
  status: 'active' | 'closed' | 'inactive';
  assigned_agent: string;
  last_contact: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  property_id: string;
  property_title: string;
  property_location: string;
  client_id: string;
  client_name: string;
  transaction_type: 'sale' | 'rental';
  amount_kwd: number;
  commission_rate: number;
  commission_amount_kwd: number;
  status: 'completed' | 'pending' | 'under_contract' | 'cancelled';
  transaction_date: string;
  agent_name: string;
  created_at: string;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar_color: string;
  deals_closed: number;
  revenue_kwd: number;
  commission_kwd: number;
  rating: number;
  properties_listed: number;
}

export interface Activity {
  id: string;
  agent_name: string;
  action: string;
  detail: string;
  timestamp: string;
  avatar_color: string;
  type: 'deal' | 'client' | 'property' | 'commission';
}

// ─── Agents ──────────────────────────────────────────────
export const agents: Agent[] = [
  { id: 'a1', name: 'Amira Al-Rashid', phone: '+965 9912 3456', email: 'amira@raestate.kw', avatar_color: 'from-blue-500 to-cyan-500', deals_closed: 23, revenue_kwd: 8_420_000, commission_kwd: 421_000, rating: 4.9, properties_listed: 34 },
  { id: 'a2', name: 'Khalid Al-Mutairi', phone: '+965 9923 4567', email: 'khalid@raestate.kw', avatar_color: 'from-purple-500 to-pink-500', deals_closed: 19, revenue_kwd: 6_780_000, commission_kwd: 339_000, rating: 4.8, properties_listed: 28 },
  { id: 'a3', name: 'Fatima Al-Sabah', phone: '+965 9934 5678', email: 'fatima@raestate.kw', avatar_color: 'from-emerald-500 to-teal-500', deals_closed: 15, revenue_kwd: 5_200_000, commission_kwd: 260_000, rating: 4.7, properties_listed: 22 },
  { id: 'a4', name: 'Omar Al-Enezi', phone: '+965 9945 6789', email: 'omar@raestate.kw', avatar_color: 'from-orange-500 to-red-500', deals_closed: 12, revenue_kwd: 4_350_000, commission_kwd: 217_500, rating: 4.6, properties_listed: 18 },
  { id: 'a5', name: 'Noura Al-Dosari', phone: '+965 9956 7890', email: 'noura@raestate.kw', avatar_color: 'from-violet-500 to-fuchsia-500', deals_closed: 8, revenue_kwd: 3_100_000, commission_kwd: 155_000, rating: 4.5, properties_listed: 14 },
];

// ─── Properties ──────────────────────────────────────────
export const properties: Property[] = [
  { id: 'p1', title: 'Luxury Waterfront Villa', description: 'Stunning 5-bedroom villa with private pool and garden', property_type: 'villa', location: 'Salmiya', size_sqm: 620, bedrooms: 5, bathrooms: 6, price_kwd: 985_000, property_status: 'available', listing_type: 'sale', agent_id: 'a1', created_at: '2026-03-15', image_gradient: 'from-blue-600 to-cyan-600' },
  { id: 'p2', title: 'Modern Penthouse Suite', description: 'Top-floor penthouse with panoramic city views', property_type: 'apartment', location: 'Kuwait City', size_sqm: 280, bedrooms: 3, bathrooms: 3, price_kwd: 175_000, property_status: 'available', listing_type: 'sale', agent_id: 'a2', created_at: '2026-03-18', image_gradient: 'from-purple-600 to-pink-600' },
  { id: 'p3', title: 'Commercial Tower Office', description: 'Premium office space in business district', property_type: 'commercial', location: 'Sharq', size_sqm: 450, bedrooms: 0, bathrooms: 2, price_kwd: 1_250_000, property_status: 'under_offer', listing_type: 'sale', agent_id: 'a1', created_at: '2026-02-28', image_gradient: 'from-amber-600 to-orange-600' },
  { id: 'p4', title: 'Family Compound Villa', description: 'Spacious family villa in quiet residential area', property_type: 'villa', location: 'Mishref', size_sqm: 520, bedrooms: 4, bathrooms: 5, price_kwd: 750_000, property_status: 'sold', listing_type: 'sale', agent_id: 'a3', created_at: '2026-01-20', image_gradient: 'from-emerald-600 to-teal-600' },
  { id: 'p5', title: 'Sea View Apartment', description: 'Beautiful 2BR apartment with direct sea view', property_type: 'apartment', location: 'Salmiya', size_sqm: 145, bedrooms: 2, bathrooms: 2, price_kwd: 92_000, property_status: 'available', listing_type: 'sale', agent_id: 'a4', created_at: '2026-03-22', image_gradient: 'from-sky-600 to-blue-600' },
  { id: 'p6', title: 'Prime Development Land', description: 'Large plot ready for residential development', property_type: 'land', location: 'Jahra', size_sqm: 2_000, bedrooms: 0, bathrooms: 0, price_kwd: 420_000, property_status: 'available', listing_type: 'sale', agent_id: 'a2', created_at: '2026-03-10', image_gradient: 'from-lime-600 to-green-600' },
  { id: 'p7', title: 'Executive Studio', description: 'Luxury furnished studio in prime location', property_type: 'apartment', location: 'Hawally', size_sqm: 65, bedrooms: 1, bathrooms: 1, price_kwd: 450, property_status: 'rented', listing_type: 'rent', agent_id: 'a5', created_at: '2026-02-14', image_gradient: 'from-rose-600 to-pink-600' },
  { id: 'p8', title: 'Retail Space Downtown', description: 'High-traffic retail location near Avenues Mall', property_type: 'commercial', location: 'Rai', size_sqm: 320, bedrooms: 0, bathrooms: 1, price_kwd: 890_000, property_status: 'available', listing_type: 'sale', agent_id: 'a3', created_at: '2026-03-25', image_gradient: 'from-indigo-600 to-violet-600' },
  { id: 'p9', title: 'Garden Villa Residence', description: 'Charming villa with large private garden', property_type: 'villa', location: 'Salwa', size_sqm: 480, bedrooms: 4, bathrooms: 4, price_kwd: 680_000, property_status: 'available', listing_type: 'sale', agent_id: 'a1', created_at: '2026-03-28', image_gradient: 'from-teal-600 to-cyan-600' },
  { id: 'p10', title: 'Luxury Duplex', description: 'Modern duplex with private elevator and rooftop terrace', property_type: 'apartment', location: 'Jabriya', size_sqm: 310, bedrooms: 4, bathrooms: 3, price_kwd: 220_000, property_status: 'under_offer', listing_type: 'sale', agent_id: 'a4', created_at: '2026-03-05', image_gradient: 'from-fuchsia-600 to-purple-600' },
  { id: 'p11', title: 'Investment Plot', description: 'Strategic land plot near new highway development', property_type: 'land', location: 'Fintas', size_sqm: 1_500, bedrooms: 0, bathrooms: 0, price_kwd: 350_000, property_status: 'available', listing_type: 'sale', agent_id: 'a2', created_at: '2026-04-01', image_gradient: 'from-yellow-600 to-amber-600' },
  { id: 'p12', title: 'Beachfront Chalet', description: 'Private chalet with direct beach access', property_type: 'villa', location: 'Khairan', size_sqm: 380, bedrooms: 3, bathrooms: 3, price_kwd: 1_150_000, property_status: 'available', listing_type: 'sale', agent_id: 'a5', created_at: '2026-04-02', image_gradient: 'from-cyan-600 to-blue-600' },
];

// ─── Clients ─────────────────────────────────────────────
export const clients: Client[] = [
  { id: 'c1', name: 'Abdullah Al-Khaled', phone: '+965 6612 3456', email: 'abdullah.k@gmail.com', client_type: 'buyer', budget_min_kwd: 500_000, budget_max_kwd: 1_000_000, preferred_location: 'Salmiya', status: 'active', assigned_agent: 'Amira Al-Rashid', last_contact: '2026-04-05', created_at: '2026-02-10' },
  { id: 'c2', name: 'Maryam Al-Fahad', phone: '+965 6623 4567', email: 'maryam.f@outlook.com', client_type: 'investor', budget_min_kwd: 1_000_000, budget_max_kwd: 3_000_000, preferred_location: 'Kuwait City', status: 'active', assigned_agent: 'Khalid Al-Mutairi', last_contact: '2026-04-04', created_at: '2026-01-15' },
  { id: 'c3', name: 'Yousef Al-Shammari', phone: '+965 6634 5678', email: 'yousef.s@yahoo.com', client_type: 'buyer', budget_min_kwd: 200_000, budget_max_kwd: 400_000, preferred_location: 'Hawally', status: 'active', assigned_agent: 'Fatima Al-Sabah', last_contact: '2026-04-03', created_at: '2026-03-01' },
  { id: 'c4', name: 'Sara Al-Ajmi', phone: '+965 6645 6789', email: 'sara.a@gmail.com', client_type: 'renter', budget_min_kwd: 300, budget_max_kwd: 800, preferred_location: 'Jabriya', status: 'active', assigned_agent: 'Omar Al-Enezi', last_contact: '2026-04-05', created_at: '2026-03-12' },
  { id: 'c5', name: 'Hamad Al-Azmi', phone: '+965 6656 7890', email: 'hamad.az@hotmail.com', client_type: 'investor', budget_min_kwd: 800_000, budget_max_kwd: 2_500_000, preferred_location: 'Sharq', status: 'active', assigned_agent: 'Amira Al-Rashid', last_contact: '2026-04-02', created_at: '2026-02-20' },
  { id: 'c6', name: 'Latifa Al-Hajri', phone: '+965 6667 8901', email: 'latifa.h@gmail.com', client_type: 'buyer', budget_min_kwd: 150_000, budget_max_kwd: 300_000, preferred_location: 'Salwa', status: 'active', assigned_agent: 'Noura Al-Dosari', last_contact: '2026-04-01', created_at: '2026-03-08' },
  { id: 'c7', name: 'Faisal Al-Otaibi', phone: '+965 6678 9012', email: 'faisal.o@icloud.com', client_type: 'buyer', budget_min_kwd: 600_000, budget_max_kwd: 900_000, preferred_location: 'Mishref', status: 'closed', assigned_agent: 'Fatima Al-Sabah', last_contact: '2026-03-20', created_at: '2026-01-05' },
  { id: 'c8', name: 'Dalal Al-Qattan', phone: '+965 6689 0123', email: 'dalal.q@gmail.com', client_type: 'renter', budget_min_kwd: 500, budget_max_kwd: 1_200, preferred_location: 'Salmiya', status: 'active', assigned_agent: 'Khalid Al-Mutairi', last_contact: '2026-04-05', created_at: '2026-03-18' },
  { id: 'c9', name: 'Nasser Al-Bloushi', phone: '+965 6690 1234', email: 'nasser.b@outlook.com', client_type: 'investor', budget_min_kwd: 2_000_000, budget_max_kwd: 5_000_000, preferred_location: 'Kuwait City', status: 'active', assigned_agent: 'Amira Al-Rashid', last_contact: '2026-04-04', created_at: '2026-02-01' },
  { id: 'c10', name: 'Hessa Al-Duwaisan', phone: '+965 6601 2345', email: 'hessa.d@gmail.com', client_type: 'buyer', budget_min_kwd: 400_000, budget_max_kwd: 700_000, preferred_location: 'Jabriya', status: 'active', assigned_agent: 'Omar Al-Enezi', last_contact: '2026-03-30', created_at: '2026-03-05' },
  { id: 'c11', name: 'Bader Al-Sayer', phone: '+965 6612 3450', email: 'bader.s@yahoo.com', client_type: 'buyer', budget_min_kwd: 300_000, budget_max_kwd: 500_000, preferred_location: 'Fintas', status: 'inactive', assigned_agent: 'Noura Al-Dosari', last_contact: '2026-02-15', created_at: '2026-01-20' },
  { id: 'c12', name: 'Reem Al-Kandari', phone: '+965 6623 4560', email: 'reem.k@gmail.com', client_type: 'renter', budget_min_kwd: 400, budget_max_kwd: 900, preferred_location: 'Hawally', status: 'active', assigned_agent: 'Fatima Al-Sabah', last_contact: '2026-04-05', created_at: '2026-03-22' },
  { id: 'c13', name: 'Talal Al-Roumi', phone: '+965 6634 5670', email: 'talal.r@hotmail.com', client_type: 'investor', budget_min_kwd: 1_500_000, budget_max_kwd: 4_000_000, preferred_location: 'Sharq', status: 'active', assigned_agent: 'Khalid Al-Mutairi', last_contact: '2026-04-03', created_at: '2026-02-12' },
  { id: 'c14', name: 'Aisha Al-Harbi', phone: '+965 6645 6780', email: 'aisha.h@gmail.com', client_type: 'buyer', budget_min_kwd: 100_000, budget_max_kwd: 250_000, preferred_location: 'Rumaithiya', status: 'active', assigned_agent: 'Omar Al-Enezi', last_contact: '2026-04-01', created_at: '2026-03-15' },
  { id: 'c15', name: 'Mohammed Al-Subaie', phone: '+965 6656 7880', email: 'mohammed.s@icloud.com', client_type: 'buyer', budget_min_kwd: 700_000, budget_max_kwd: 1_200_000, preferred_location: 'Khairan', status: 'active', assigned_agent: 'Amira Al-Rashid', last_contact: '2026-04-04', created_at: '2026-03-01' },
];

// ─── Transactions ────────────────────────────────────────
export const transactions: Transaction[] = [
  { id: 't1', property_id: 'p4', property_title: 'Family Compound Villa', property_location: 'Mishref', client_id: 'c7', client_name: 'Faisal Al-Otaibi', transaction_type: 'sale', amount_kwd: 750_000, commission_rate: 5, commission_amount_kwd: 37_500, status: 'completed', transaction_date: '2026-03-20', agent_name: 'Fatima Al-Sabah', created_at: '2026-03-15' },
  { id: 't2', property_id: 'p3', property_title: 'Commercial Tower Office', property_location: 'Sharq', client_id: 'c5', client_name: 'Hamad Al-Azmi', transaction_type: 'sale', amount_kwd: 1_250_000, commission_rate: 5, commission_amount_kwd: 62_500, status: 'under_contract', transaction_date: '2026-04-02', agent_name: 'Amira Al-Rashid', created_at: '2026-04-01' },
  { id: 't3', property_id: 'p7', property_title: 'Executive Studio', property_location: 'Hawally', client_id: 'c4', client_name: 'Sara Al-Ajmi', transaction_type: 'rental', amount_kwd: 5_400, commission_rate: 5, commission_amount_kwd: 270, status: 'completed', transaction_date: '2026-02-14', agent_name: 'Noura Al-Dosari', created_at: '2026-02-10' },
  { id: 't4', property_id: 'p1', property_title: 'Luxury Waterfront Villa', property_location: 'Salmiya', client_id: 'c1', client_name: 'Abdullah Al-Khaled', transaction_type: 'sale', amount_kwd: 985_000, commission_rate: 5, commission_amount_kwd: 49_250, status: 'pending', transaction_date: '2026-04-05', agent_name: 'Amira Al-Rashid', created_at: '2026-04-04' },
  { id: 't5', property_id: 'p10', property_title: 'Luxury Duplex', property_location: 'Jabriya', client_id: 'c10', client_name: 'Hessa Al-Duwaisan', transaction_type: 'sale', amount_kwd: 220_000, commission_rate: 5, commission_amount_kwd: 11_000, status: 'under_contract', transaction_date: '2026-04-03', agent_name: 'Omar Al-Enezi', created_at: '2026-04-02' },
  { id: 't6', property_id: 'p2', property_title: 'Modern Penthouse Suite', property_location: 'Kuwait City', client_id: 'c2', client_name: 'Maryam Al-Fahad', transaction_type: 'sale', amount_kwd: 175_000, commission_rate: 5, commission_amount_kwd: 8_750, status: 'pending', transaction_date: '2026-04-04', agent_name: 'Khalid Al-Mutairi', created_at: '2026-04-03' },
  { id: 't7', property_id: 'p9', property_title: 'Garden Villa Residence', property_location: 'Salwa', client_id: 'c15', client_name: 'Mohammed Al-Subaie', transaction_type: 'sale', amount_kwd: 680_000, commission_rate: 5, commission_amount_kwd: 34_000, status: 'completed', transaction_date: '2026-03-28', agent_name: 'Amira Al-Rashid', created_at: '2026-03-25' },
  { id: 't8', property_id: 'p5', property_title: 'Sea View Apartment', property_location: 'Salmiya', client_id: 'c3', client_name: 'Yousef Al-Shammari', transaction_type: 'sale', amount_kwd: 92_000, commission_rate: 5, commission_amount_kwd: 4_600, status: 'completed', transaction_date: '2026-03-22', agent_name: 'Omar Al-Enezi', created_at: '2026-03-20' },
  { id: 't9', property_id: 'p8', property_title: 'Retail Space Downtown', property_location: 'Rai', client_id: 'c9', client_name: 'Nasser Al-Bloushi', transaction_type: 'sale', amount_kwd: 890_000, commission_rate: 5, commission_amount_kwd: 44_500, status: 'pending', transaction_date: '2026-04-06', agent_name: 'Fatima Al-Sabah', created_at: '2026-04-05' },
  { id: 't10', property_id: 'p12', property_title: 'Beachfront Chalet', property_location: 'Khairan', client_id: 'c13', client_name: 'Talal Al-Roumi', transaction_type: 'sale', amount_kwd: 1_150_000, commission_rate: 5, commission_amount_kwd: 57_500, status: 'cancelled', transaction_date: '2026-03-10', agent_name: 'Khalid Al-Mutairi', created_at: '2026-03-08' },
];

// ─── Activities ──────────────────────────────────────────
export const activities: Activity[] = [
  { id: 'act1', agent_name: 'Amira Al-Rashid', action: 'Closed deal', detail: 'Luxury Waterfront Villa — 985,000 KWD', timestamp: '2 hours ago', avatar_color: 'from-blue-500 to-cyan-500', type: 'deal' },
  { id: 'act2', agent_name: 'Khalid Al-Mutairi', action: 'New listing', detail: 'Modern Penthouse Suite — Kuwait City', timestamp: '4 hours ago', avatar_color: 'from-purple-500 to-pink-500', type: 'property' },
  { id: 'act3', agent_name: 'Fatima Al-Sabah', action: 'New client signed', detail: 'Nasser Al-Bloushi — Investor', timestamp: '6 hours ago', avatar_color: 'from-emerald-500 to-teal-500', type: 'client' },
  { id: 'act4', agent_name: 'Omar Al-Enezi', action: 'Commission paid', detail: '11,000 KWD — Luxury Duplex deal', timestamp: 'Yesterday', avatar_color: 'from-orange-500 to-red-500', type: 'commission' },
  { id: 'act5', agent_name: 'Noura Al-Dosari', action: 'Property rented', detail: 'Executive Studio — Hawally', timestamp: 'Yesterday', avatar_color: 'from-violet-500 to-fuchsia-500', type: 'deal' },
];

// ─── Chart Data ──────────────────────────────────────────
export const monthlyRevenue = [
  { month: 'Jan', revenue: 3_200_000, commissions: 160_000 },
  { month: 'Feb', revenue: 4_100_000, commissions: 205_000 },
  { month: 'Mar', revenue: 5_850_000, commissions: 292_500 },
  { month: 'Apr', revenue: 8_600_000, commissions: 430_000 },
  { month: 'May', revenue: 7_000_000, commissions: 350_000 },
  { month: 'Jun', revenue: 6_400_000, commissions: 320_000 },
];

export const propertyTypeData = [
  { name: 'Villas', value: 54, fill: '#3b82f6' },
  { name: 'Apartments', value: 68, fill: '#a855f7' },
  { name: 'Land', value: 22, fill: '#00d4ff' },
  { name: 'Commercial', value: 12, fill: '#7c3aed' },
];

export const locationData = [
  { location: 'Salmiya', properties: 28, revenue: 6_200_000 },
  { location: 'Kuwait City', properties: 22, revenue: 5_800_000 },
  { location: 'Hawally', properties: 18, revenue: 3_400_000 },
  { location: 'Mishref', properties: 15, revenue: 4_100_000 },
  { location: 'Jabriya', properties: 12, revenue: 2_900_000 },
  { location: 'Sharq', properties: 10, revenue: 3_600_000 },
  { location: 'Salwa', properties: 8, revenue: 1_800_000 },
  { location: 'Fintas', properties: 6, revenue: 1_200_000 },
];

export const transactionTrend = [
  { date: 'Week 1', completed: 8, pending: 4, under_contract: 2 },
  { date: 'Week 2', completed: 12, pending: 5, under_contract: 3 },
  { date: 'Week 3', completed: 15, pending: 6, under_contract: 4 },
  { date: 'Week 4', completed: 18, pending: 5, under_contract: 6 },
  { date: 'Week 5', completed: 23, pending: 8, under_contract: 5 },
];

// ─── Helpers ─────────────────────────────────────────────
export function formatKwd(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return value.toFixed(0);
}

export function formatKwdFull(value: number): string {
  return new Intl.NumberFormat('en-KW', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
