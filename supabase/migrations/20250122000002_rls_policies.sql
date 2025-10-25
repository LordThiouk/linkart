-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE boosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Products policies
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (status = 'active' AND deleted_at IS NULL);

CREATE POLICY "Users can view own products" ON products
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create products" ON products
  FOR INSERT WITH CHECK (
    auth.uid() = user_id 
    AND (auth.jwt() -> 'user_metadata' -> 'capabilities' ->> 'can_sell')::boolean = true
  );

CREATE POLICY "Users can update own products" ON products
  FOR UPDATE USING (
    auth.uid() = user_id 
    AND status IN ('draft', 'pending', 'rejected')
  );

CREATE POLICY "Users can delete own products" ON products
  FOR DELETE USING (auth.uid() = user_id);

-- Transactions policies
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Users can create transactions" ON transactions
  FOR INSERT WITH CHECK (
    auth.uid() = buyer_id 
    AND (auth.jwt() -> 'user_metadata' -> 'capabilities' ->> 'can_buy')::boolean = true
  );

-- Boosts policies
CREATE POLICY "Users can view own boosts" ON boosts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create boosts" ON boosts
  FOR INSERT WITH CHECK (
    auth.uid() = user_id 
    AND (auth.jwt() -> 'user_metadata' -> 'capabilities' ->> 'can_boost')::boolean = true
  );

-- Ratings policies
CREATE POLICY "Anyone can view visible ratings" ON ratings
  FOR SELECT USING (status = 'visible');

CREATE POLICY "Users can create ratings" ON ratings
  FOR INSERT WITH CHECK (
    auth.uid() = user_id 
    AND EXISTS (
      SELECT 1 FROM transactions 
      WHERE id = tx_id 
      AND buyer_id = auth.uid() 
      AND status = 'released'
    )
  );

CREATE POLICY "Users can update own ratings" ON ratings
  FOR UPDATE USING (auth.uid() = user_id);

-- Withdrawals policies
CREATE POLICY "Users can view own withdrawals" ON withdrawals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create withdrawals" ON withdrawals
  FOR INSERT WITH CHECK (
    auth.uid() = user_id 
    AND (auth.jwt() -> 'user_metadata' -> 'capabilities' ->> 'can_withdraw')::boolean = true
  );

-- Download tokens policies
CREATE POLICY "Users can view own download tokens" ON download_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create download tokens" ON download_tokens
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own download tokens" ON download_tokens
  FOR UPDATE USING (auth.uid() = user_id);

-- Download logs policies (read-only for users)
CREATE POLICY "Users can view own download logs" ON download_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Platform earnings policies (admin only)
CREATE POLICY "Platform earnings are view-only" ON platform_earnings
  FOR SELECT USING (true);

-- Audit logs policies
CREATE POLICY "Users can view own audit logs" ON audit_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Admin policies (for service role)
CREATE POLICY "Service role can manage all users" ON users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all products" ON products
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all transactions" ON transactions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all boosts" ON boosts
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all ratings" ON ratings
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all withdrawals" ON withdrawals
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all download tokens" ON download_tokens
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all download logs" ON download_logs
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all platform earnings" ON platform_earnings
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all audit logs" ON audit_logs
  FOR ALL USING (auth.role() = 'service_role');
