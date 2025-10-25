-- Seed data for development and testing

-- Insert test users
INSERT INTO users (id, phone, email, name, bio, location, capabilities, wallet_balance, verified) VALUES
  ('00000000-0000-0000-0000-000000000001', '+221701234567', 'admin@linkart.sn', 'Admin User', 'Platform administrator', 'Dakar, Senegal', '{"can_buy": true, "can_sell": true, "can_withdraw": true, "can_boost": true}', 0, true),
  ('00000000-0000-0000-0000-000000000002', '+221701234568', 'beatmaker@linkart.sn', 'Test Beatmaker', 'Professional beatmaker from Dakar', 'Dakar, Senegal', '{"can_buy": true, "can_sell": true, "can_withdraw": true, "can_boost": true}', 50000, true),
  ('00000000-0000-0000-0000-000000000003', '+221701234569', 'artist@linkart.sn', 'Test Artist', 'Rising artist looking for beats', 'Thiès, Senegal', '{"can_buy": true, "can_sell": false, "can_withdraw": false, "can_boost": true}', 0, true),
  ('00000000-0000-0000-0000-000000000004', '+221701234570', 'engineer@linkart.sn', 'Test Engineer', 'Audio engineer and studio owner', 'Saint-Louis, Senegal', '{"can_buy": true, "can_sell": true, "can_withdraw": true, "can_boost": true}', 25000, true);

-- Insert test products
INSERT INTO products (id, user_id, title, type, price, license, status, metadata) VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Afrobeat Instrumental', 'beat', 15000, 'exclusive', 'active', '{"bpm": 120, "genre": "afrobeat", "key": "C minor", "duration": 180}'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Trap Beat Pack', 'kit', 25000, 'non-exclusive', 'active', '{"bpm": 140, "genre": "trap", "key": "F minor", "duration": 300}'),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', 'Mixing Service', 'service', 50000, 'standard', 'active', '{"duration": 240, "genre": "any", "description": "Professional mixing service"}'),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'Mbalax Sample', 'sample', 5000, 'non-exclusive', 'pending', '{"bpm": 110, "genre": "mbalax", "key": "G major", "duration": 30}'),
  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000004', 'Mastering Service', 'service', 30000, 'standard', 'active', '{"duration": 180, "genre": "any", "description": "Professional mastering service"}');

-- Insert test transactions
INSERT INTO transactions (id, buyer_id, seller_id, product_id, type, gross_amount, commission_amount, net_amount, status) VALUES
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'sale', 15000, 750, 14250, 'released'),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000003', 'sale', 50000, 2500, 47500, 'paid_held'),
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', null, null, 'boost', 10000, 0, 10000, 'released');

-- Insert test boosts
INSERT INTO boosts (id, user_id, target_type, target_id, start_at, end_at, amount_paid, status) VALUES
  ('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'product', '10000000-0000-0000-0000-000000000001', NOW(), NOW() + INTERVAL '7 days', 10000, 'active'),
  ('30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', 'profile', null, NOW() - INTERVAL '1 day', NOW() + INTERVAL '6 days', 15000, 'active');

-- Insert test ratings
INSERT INTO ratings (user_id, target_type, target_id, score, comment, tx_id, status) VALUES
  ('00000000-0000-0000-0000-000000000003', 'product', '10000000-0000-0000-0000-000000000001', 5, 'Excellent beat, exactly what I needed!', '20000000-0000-0000-0000-000000000001', 'visible'),
  ('00000000-0000-0000-0000-000000000003', 'profile', '00000000-0000-0000-0000-000000000002', 5, 'Great beatmaker, very professional', '20000000-0000-0000-0000-000000000001', 'visible');

-- Insert test withdrawals
INSERT INTO withdrawals (id, user_id, amount, status) VALUES
  ('40000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 20000, 'pending'),
  ('40000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', 15000, 'paid');

-- Insert test platform earnings
INSERT INTO platform_earnings (tx_id, type, amount) VALUES
  ('20000000-0000-0000-0000-000000000001', 'commission', 750),
  ('20000000-0000-0000-0000-000000000002', 'commission', 2500),
  ('20000000-0000-0000-0000-000000000003', 'boost', 10000);

-- Insert test audit logs
INSERT INTO audit_logs (user_id, action, resource_type, resource_id, metadata) VALUES
  ('00000000-0000-0000-0000-000000000001', 'user_created', 'user', '00000000-0000-0000-0000-000000000002', '{"capabilities": ["can_sell", "can_withdraw"]}'),
  ('00000000-0000-0000-0000-000000000001', 'product_approved', 'product', '10000000-0000-0000-0000-000000000001', '{"status": "active"}'),
  ('00000000-0000-0000-0000-000000000001', 'withdrawal_processed', 'withdrawal', '40000000-0000-0000-0000-000000000002', '{"amount": 15000, "provider": "wave"}');
