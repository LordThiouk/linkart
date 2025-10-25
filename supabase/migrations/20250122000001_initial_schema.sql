-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT UNIQUE,
  email TEXT UNIQUE,
  name TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  capabilities JSONB DEFAULT '{"can_buy": true, "can_sell": false, "can_withdraw": false, "can_boost": false}',
  wallet_balance NUMERIC DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('beat', 'sample', 'kit', 'service')),
  price NUMERIC NOT NULL CHECK (price > 0),
  license TEXT,
  preview_key TEXT,
  file_key TEXT,
  status TEXT CHECK (status IN ('draft', 'pending', 'active', 'rejected')) DEFAULT 'draft',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Create transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES users(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  type TEXT CHECK (type IN ('sale', 'boost', 'withdrawal', 'refund')),
  gross_amount NUMERIC NOT NULL CHECK (gross_amount > 0),
  commission_amount NUMERIC NOT NULL CHECK (commission_amount >= 0),
  net_amount NUMERIC NOT NULL CHECK (net_amount >= 0),
  status TEXT CHECK (status IN ('pending', 'paid_held', 'released', 'failed', 'refunded')) DEFAULT 'pending',
  contract_url TEXT,
  provider_payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create boosts table
CREATE TABLE boosts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  target_type TEXT CHECK (target_type IN ('product', 'profile')),
  target_id UUID,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  amount_paid NUMERIC NOT NULL CHECK (amount_paid > 0),
  status TEXT CHECK (status IN ('active', 'expired', 'cancelled')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create ratings table
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  target_type TEXT CHECK (target_type IN ('product', 'service', 'profile')),
  target_id UUID NOT NULL,
  score INTEGER CHECK (score >= 1 AND score <= 5),
  comment TEXT,
  tx_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
  status TEXT CHECK (status IN ('visible', 'hidden', 'flagged')) DEFAULT 'visible',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create withdrawals table
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  status TEXT CHECK (status IN ('pending', 'paid', 'rejected')) DEFAULT 'pending',
  provider_ref TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create download_tokens table
CREATE TABLE download_tokens (
  token TEXT PRIMARY KEY,
  tx_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  file_key TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  max_downloads INTEGER DEFAULT 3,
  downloads INTEGER DEFAULT 0,
  revoked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create download_logs table
CREATE TABLE download_logs (
  id SERIAL PRIMARY KEY,
  token TEXT,
  tx_id UUID,
  user_id UUID,
  file_key TEXT NOT NULL,
  ip TEXT NOT NULL,
  ua TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create platform_earnings table
CREATE TABLE platform_earnings (
  id SERIAL PRIMARY KEY,
  tx_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('commission', 'boost')),
  amount NUMERIC NOT NULL CHECK (amount > 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_capabilities ON users USING GIN(capabilities);

CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_type ON products(type);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_created_at ON products(created_at);

CREATE INDEX idx_transactions_buyer_id ON transactions(buyer_id);
CREATE INDEX idx_transactions_seller_id ON transactions(seller_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

CREATE INDEX idx_boosts_user_id ON boosts(user_id);
CREATE INDEX idx_boosts_target_type ON boosts(target_type);
CREATE INDEX idx_boosts_status ON boosts(status);
CREATE INDEX idx_boosts_start_at ON boosts(start_at);
CREATE INDEX idx_boosts_end_at ON boosts(end_at);

CREATE INDEX idx_ratings_target ON ratings(target_type, target_id);
CREATE INDEX idx_ratings_user_id ON ratings(user_id);
CREATE INDEX idx_ratings_score ON ratings(score);
CREATE INDEX idx_ratings_status ON ratings(status);

CREATE INDEX idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);
CREATE INDEX idx_withdrawals_created_at ON withdrawals(created_at);

CREATE INDEX idx_download_tokens_expires_at ON download_tokens(expires_at);
CREATE INDEX idx_download_tokens_user_id ON download_tokens(user_id);
CREATE INDEX idx_download_tokens_revoked ON download_tokens(revoked);

CREATE INDEX idx_download_logs_created_at ON download_logs(created_at);
CREATE INDEX idx_download_logs_user_id ON download_logs(user_id);

CREATE INDEX idx_platform_earnings_tx_id ON platform_earnings(tx_id);
CREATE INDEX idx_platform_earnings_type ON platform_earnings(type);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_withdrawals_updated_at BEFORE UPDATE ON withdrawals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to calculate commission (5%)
CREATE OR REPLACE FUNCTION calculate_commission(gross_amount NUMERIC)
RETURNS NUMERIC AS $$
BEGIN
  RETURN ROUND(gross_amount * 0.05, 2);
END;
$$ LANGUAGE plpgsql;

-- Create function to calculate net amount
CREATE OR REPLACE FUNCTION calculate_net_amount(gross_amount NUMERIC)
RETURNS NUMERIC AS $$
BEGIN
  RETURN ROUND(gross_amount - calculate_commission(gross_amount), 2);
END;
$$ LANGUAGE plpgsql;

-- Create function to expire boosts
CREATE OR REPLACE FUNCTION expire_boosts()
RETURNS void AS $$
BEGIN
  UPDATE boosts 
  SET status = 'expired' 
  WHERE status = 'active' 
  AND end_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create function to clean up expired download tokens
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM download_tokens 
  WHERE expires_at < NOW() 
  OR revoked = true;
END;
$$ LANGUAGE plpgsql;
