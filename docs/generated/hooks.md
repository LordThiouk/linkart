# Documentation des Hooks

> Généré le: 2025-10-29

## useAdmin

**Type:** admin

**Retourne:**

```typescript
{
    dashboard,
    loading,
    error,
    refreshDashboard: fetchDashboard,
    approveProduct,
    rejectProduct,
    approveWithdrawal,
    rejectWithdrawal,
    hideRating,
    approveRating,
    suspendUser,
    unsuspendUser,
  }
```

---

## useAuth

**Type:** auth

**Retourne:**

```typescript
{
    ...state,
    signInWithPhone,
    signInWithEmail,
    verifyOTP,
    signOut,
    updateCapabilities,
  }
```

---

## useBoosts

**Type:** boosts

**Retourne:**

```typescript
{
    boosts,
    loading,
    error,
    boostOptions: BOOST_OPTIONS,
    refreshBoosts: fetchBoosts,
    purchaseBoost,
    cancelBoost,
    getActiveBoosts,
    getExpiredBoosts,
  }
```

---

## useProducts

**Type:** products

**Retourne:**

```typescript
{
    products,
    loading,
    error,
    hasMore,
    refreshProducts,
    loadMoreProducts,
  }
```

---

## useRatings

**Type:** ratings

**Retourne:**

```typescript
{
    ratings,
    averageRating,
    totalRatings,
    loading,
    error,
    refreshRatings: fetchRatings,
    submitRating,
    updateRating,
    deleteRating,
    flagRating,
  }
```

---

## useUpload

**Type:** uploads

**Retourne:**

```typescript
{
    uploadState,
    requestUpload,
    uploadFile,
    completeUpload,
    resetUploadState,
  }
```

---

## useWallet

**Type:** wallet

**Retourne:**

```typescript
{
    walletData,
    loading,
    error,
    refreshWallet: fetchWalletData,
    requestWithdrawal,
  }
```

---

