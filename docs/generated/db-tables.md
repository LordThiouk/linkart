# Documentation des Tables

> Généré le: 2025-11-17

## Table: `users`

| Colonne | Type | Contraintes |
|---|---|---|
| `id` | `UUID` | PRIMARY KEY DEFAULT gen_random_uuid() |
| `phone` | `TEXT` | UNIQUE |
| `email` | `TEXT` | UNIQUE |
| `name` | `TEXT` | NOT NULL |
| `bio` | `TEXT` |  |
| `location` | `TEXT` |  |
| `capabilities` | `JSONB` | DEFAULT '{"can_buy": true, "can_sell": false, "can_withdraw": false, "can_boost": false}' |
| `wallet_balance` | `NUMERIC` | DEFAULT 0 |
| `verified` | `BOOLEAN` | DEFAULT false |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW() |
| `updated_at` | `TIMESTAMPTZ` | DEFAULT NOW() |
| `deleted_at` | `TIMESTAMPTZ` |  |

## Table: `products`

| Colonne | Type | Contraintes |
|---|---|---|
| `id` | `UUID` | PRIMARY KEY DEFAULT gen_random_uuid() |
| `user_id` | `UUID` | REFERENCES users(id) ON DELETE CASCADE |
| `title` | `TEXT` | NOT NULL |
| `type` | `TEXT` | CHECK (type IN ('beat', 'sample', 'kit', 'service')) |
| `price` | `NUMERIC` | NOT NULL CHECK (price > 0) |
| `license` | `TEXT` |  |
| `preview_key` | `TEXT` |  |
| `file_key` | `TEXT` |  |
| `status` | `TEXT` | CHECK (status IN ('draft', 'pending', 'active', 'rejected')) DEFAULT 'draft' |
| `metadata` | `JSONB` |  |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW() |
| `updated_at` | `TIMESTAMPTZ` | DEFAULT NOW() |
| `deleted_at` | `TIMESTAMPTZ` |  |

## Table: `transactions`

| Colonne | Type | Contraintes |
|---|---|---|
| `id` | `UUID` | PRIMARY KEY DEFAULT gen_random_uuid() |
| `buyer_id` | `UUID` | REFERENCES users(id) ON DELETE CASCADE |
| `seller_id` | `UUID` | REFERENCES users(id) ON DELETE SET NULL |
| `product_id` | `UUID` | REFERENCES products(id) ON DELETE SET NULL |
| `type` | `TEXT` | CHECK (type IN ('sale', 'boost', 'withdrawal', 'refund')) |
| `gross_amount` | `NUMERIC` | NOT NULL CHECK (gross_amount > 0) |
| `commission_amount` | `NUMERIC` | NOT NULL CHECK (commission_amount >= 0) |
| `net_amount` | `NUMERIC` | NOT NULL CHECK (net_amount >= 0) |
| `status` | `TEXT` | CHECK (status IN ('pending', 'paid_held', 'released', 'failed', 'refunded')) DEFAULT 'pending' |
| `contract_url` | `TEXT` |  |
| `provider_payload` | `JSONB` |  |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW() |
| `updated_at` | `TIMESTAMPTZ` | DEFAULT NOW() |

## Table: `boosts`

| Colonne | Type | Contraintes |
|---|---|---|
| `id` | `UUID` | PRIMARY KEY DEFAULT gen_random_uuid() |
| `user_id` | `UUID` | REFERENCES users(id) ON DELETE CASCADE |
| `target_type` | `TEXT` | CHECK (target_type IN ('product', 'profile')) |
| `target_id` | `UUID` |  |
| `start_at` | `TIMESTAMPTZ` | NOT NULL |
| `end_at` | `TIMESTAMPTZ` | NOT NULL |
| `amount_paid` | `NUMERIC` | NOT NULL CHECK (amount_paid > 0) |
| `status` | `TEXT` | CHECK (status IN ('active', 'expired', 'cancelled')) DEFAULT 'active' |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW() |

## Table: `ratings`

| Colonne | Type | Contraintes |
|---|---|---|
| `id` | `SERIAL` | PRIMARY KEY |
| `user_id` | `UUID` | REFERENCES users(id) ON DELETE CASCADE |
| `target_type` | `TEXT` | CHECK (target_type IN ('product', 'service', 'profile')) |
| `target_id` | `UUID` | NOT NULL |
| `score` | `INTEGER` | CHECK (score >= 1 AND score <= 5) |
| `comment` | `TEXT` |  |
| `tx_id` | `UUID` | REFERENCES transactions(id) ON DELETE SET NULL |
| `status` | `TEXT` | CHECK (status IN ('visible', 'hidden', 'flagged')) DEFAULT 'visible' |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW() |

## Table: `withdrawals`

| Colonne | Type | Contraintes |
|---|---|---|
| `id` | `UUID` | PRIMARY KEY DEFAULT gen_random_uuid() |
| `user_id` | `UUID` | REFERENCES users(id) ON DELETE CASCADE |
| `amount` | `NUMERIC` | NOT NULL CHECK (amount > 0) |
| `status` | `TEXT` | CHECK (status IN ('pending', 'paid', 'rejected')) DEFAULT 'pending' |
| `provider_ref` | `TEXT` |  |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW() |
| `updated_at` | `TIMESTAMPTZ` | DEFAULT NOW() |

## Table: `download_tokens`

| Colonne | Type | Contraintes |
|---|---|---|
| `token` | `TEXT` | PRIMARY KEY |
| `tx_id` | `UUID` | REFERENCES transactions(id) ON DELETE CASCADE |
| `user_id` | `UUID` | REFERENCES users(id) ON DELETE CASCADE |
| `file_key` | `TEXT` | NOT NULL |
| `expires_at` | `TIMESTAMPTZ` | NOT NULL |
| `max_downloads` | `INTEGER` | DEFAULT 3 |
| `downloads` | `INTEGER` | DEFAULT 0 |
| `revoked` | `BOOLEAN` | DEFAULT false |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW() |

## Table: `download_logs`

| Colonne | Type | Contraintes |
|---|---|---|
| `id` | `SERIAL` | PRIMARY KEY |
| `token` | `TEXT` |  |
| `tx_id` | `UUID` |  |
| `user_id` | `UUID` |  |
| `file_key` | `TEXT` | NOT NULL |
| `ip` | `TEXT` | NOT NULL |
| `ua` | `TEXT` | NOT NULL |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW() |

## Table: `platform_earnings`

| Colonne | Type | Contraintes |
|---|---|---|
| `id` | `SERIAL` | PRIMARY KEY |
| `tx_id` | `UUID` | REFERENCES transactions(id) ON DELETE CASCADE |
| `type` | `TEXT` | CHECK (type IN ('commission', 'boost')) |
| `amount` | `NUMERIC` | NOT NULL CHECK (amount > 0) |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW() |

## Table: `audit_logs`

| Colonne | Type | Contraintes |
|---|---|---|
| `id` | `SERIAL` | PRIMARY KEY |
| `user_id` | `UUID` | REFERENCES users(id) ON DELETE SET NULL |
| `action` | `TEXT` | NOT NULL |
| `resource_type` | `TEXT` | NOT NULL |
| `resource_id` | `UUID` |  |
| `metadata` | `JSONB` |  |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW() |

## Table: `notifications`

| Colonne | Type | Contraintes |
|---|---|---|
| `id` | `UUID` | PRIMARY KEY DEFAULT gen_random_uuid() |
| `user_id` | `UUID` | REFERENCES users(id) ON DELETE CASCADE |
| `title` | `TEXT` | NOT NULL |
| `message` | `TEXT` | NOT NULL |
| `type` | `TEXT` | CHECK (type IN ('info', 'alert', 'promo', 'update')) DEFAULT 'info' |
| `status` | `TEXT` | CHECK (status IN ('unread', 'read', 'archived')) DEFAULT 'unread' |
| `metadata` | `JSONB` |  |
| `created_at` | `TIMESTAMPTZ` | DEFAULT NOW() |

