-- R&A Estate Management System Schema

-- Properties Table
CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  property_type text NOT NULL, -- 'villa', 'apartment', 'land', 'commercial'
  location text NOT NULL, -- District/Area in Kuwait
  size_sqm integer NOT NULL,
  bedrooms integer,
  bathrooms integer,
  price_kwd decimal(12, 2) NOT NULL,
  property_status text DEFAULT 'available', -- 'available', 'sold', 'rented'
  listing_type text NOT NULL, -- 'sale' or 'rent'
  images_url text[], -- Array of image URLs
  agent_id uuid REFERENCES agents(id),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Clients Table (Buyers/Renters)
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  client_type text NOT NULL, -- 'buyer', 'renter', 'both'
  budget_min_kwd decimal(12, 2),
  budget_max_kwd decimal(12, 2),
  preferred_location text,
  preferred_property_type text,
  status text DEFAULT 'active', -- 'active', 'closed', 'inactive'
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Transactions (Sales/Rentals)
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  transaction_type text NOT NULL, -- 'sale' or 'rental'
  amount_kwd decimal(12, 2) NOT NULL,
  transaction_date date NOT NULL,
  status text DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
  commission_rate decimal(5, 2) DEFAULT 5.00, -- Percentage
  commission_amount_kwd decimal(12, 2) GENERATED ALWAYS AS (amount_kwd * commission_rate / 100) STORED,
  notes text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Agents Table
CREATE TABLE agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  commission_rate decimal(5, 2) DEFAULT 5.00,
  total_sales_kwd decimal(15, 2) DEFAULT 0,
  total_commissions_kwd decimal(15, 2) DEFAULT 0,
  properties_count integer DEFAULT 0,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Dashboard Analytics (Materialized View)
CREATE TABLE dashboard_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_date date DEFAULT CURRENT_DATE,
  total_properties integer,
  available_properties integer,
  sold_properties integer,
  rented_properties integer,
  total_revenue_kwd decimal(15, 2),
  total_commissions_kwd decimal(15, 2),
  active_clients integer,
  pending_transactions integer,
  updated_at timestamp DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_properties_status ON properties(property_status);
CREATE INDEX idx_properties_location ON properties(location);
CREATE INDEX idx_properties_type ON properties(property_type);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_property ON transactions(property_id);
CREATE INDEX idx_transactions_client ON transactions(client_id);
CREATE INDEX idx_agents_email ON agents(email);
