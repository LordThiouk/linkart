# Documentation des Politiques RLS

> Généré le: 2025-10-29

## Table: `users`

| Nom de la Politique | Commande | Règle |
|---|---|---|
| Users can view own profile | `SELECT` | `auth.uid() = id` |
| Users can update own profile | `UPDATE` | `auth.uid() = id` |
| Users can insert own profile | `INSERT` | `auth.uid() = id` |
| Service role can manage all users | `ALL` | `auth.role() = 'service_role'` |

## Table: `products`

| Nom de la Politique | Commande | Règle |
|---|---|---|
| Anyone can view active products | `SELECT` | `status = 'active' AND deleted_at IS NULL` |
| Users can view own products | `SELECT` | `auth.uid() = user_id` |
| Users can create products | `INSERT` | `auth.uid() = user_id AND (auth.jwt() -> 'user_metadata' -> 'capabilities' ->> 'can_sell')::boolean = true` |
| Users can update own products | `UPDATE` | `auth.uid() = user_id AND status IN ('draft', 'pending', 'rejected')` |
| Users can delete own products | `DELETE` | `auth.uid() = user_id` |
| Service role can manage all products | `ALL` | `auth.role() = 'service_role'` |

## Table: `transactions`

| Nom de la Politique | Commande | Règle |
|---|---|---|
| Users can view own transactions | `SELECT` | `auth.uid() = buyer_id OR auth.uid() = seller_id` |
| Users can create transactions | `INSERT` | `auth.uid() = buyer_id AND (auth.jwt() -> 'user_metadata' -> 'capabilities' ->> 'can_buy')::boolean = true` |
| Service role can manage all transactions | `ALL` | `auth.role() = 'service_role'` |

## Table: `boosts`

| Nom de la Politique | Commande | Règle |
|---|---|---|
| Users can view own boosts | `SELECT` | `auth.uid() = user_id` |
| Users can create boosts | `INSERT` | `auth.uid() = user_id AND (auth.jwt() -> 'user_metadata' -> 'capabilities' ->> 'can_boost')::boolean = true` |
| Service role can manage all boosts | `ALL` | `auth.role() = 'service_role'` |

## Table: `ratings`

| Nom de la Politique | Commande | Règle |
|---|---|---|
| Anyone can view visible ratings | `SELECT` | `status = 'visible'` |
| Users can create ratings | `INSERT` | `auth.uid() = user_id AND EXISTS ( SELECT 1 FROM transactions WHERE id = tx_id AND buyer_id = auth.uid() AND status = 'released' )` |
| Users can update own ratings | `UPDATE` | `auth.uid() = user_id` |
| Service role can manage all ratings | `ALL` | `auth.role() = 'service_role'` |

## Table: `withdrawals`

| Nom de la Politique | Commande | Règle |
|---|---|---|
| Users can view own withdrawals | `SELECT` | `auth.uid() = user_id` |
| Users can create withdrawals | `INSERT` | `auth.uid() = user_id AND (auth.jwt() -> 'user_metadata' -> 'capabilities' ->> 'can_withdraw')::boolean = true` |
| Service role can manage all withdrawals | `ALL` | `auth.role() = 'service_role'` |

## Table: `download_tokens`

| Nom de la Politique | Commande | Règle |
|---|---|---|
| Users can view own download tokens | `SELECT` | `auth.uid() = user_id` |
| Users can create download tokens | `INSERT` | `auth.uid() = user_id` |
| Users can update own download tokens | `UPDATE` | `auth.uid() = user_id` |
| Service role can manage all download tokens | `ALL` | `auth.role() = 'service_role'` |

## Table: `download_logs`

| Nom de la Politique | Commande | Règle |
|---|---|---|
| Users can view own download logs | `SELECT` | `auth.uid() = user_id` |
| Service role can manage all download logs | `ALL` | `auth.role() = 'service_role'` |

## Table: `platform_earnings`

| Nom de la Politique | Commande | Règle |
|---|---|---|
| Platform earnings are view-only | `SELECT` | `true` |
| Service role can manage all platform earnings | `ALL` | `auth.role() = 'service_role'` |

## Table: `audit_logs`

| Nom de la Politique | Commande | Règle |
|---|---|---|
| Users can view own audit logs | `SELECT` | `auth.uid() = user_id` |
| Service role can manage all audit logs | `ALL` | `auth.role() = 'service_role'` |

