# Backend Integration Checklist

## 🔗 API Integration Guide for Customer Dashboard

This checklist will help you connect the customer dashboard to your backend API.

## 📋 Prerequisites

- [ ] Backend API is running
- [ ] API endpoints are documented
- [ ] Authentication system is implemented
- [ ] CORS is configured properly

## 🔐 Authentication Integration

### 1. Update Login Component

**File**: `frontend/src/pages/auth/CustomerLogin.jsx`

```javascript
// Add API call
const handleLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/customer/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.token) {
      localStorage.setItem('customerToken', data.token);
      localStorage.setItem('customerName', data.name);
      localStorage.setItem('customerEmail', data.email);
      navigate('/customer/profile');
    }
  } catch (error) {
    // Handle error
  }
};
```

### 2. Create Protected Route Wrapper

**File**: `frontend/src/components/ProtectedRoute.jsx` (Create New)

```javascript
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('customerToken');
  
  if (!token) {
    return <Navigate to="/login/customer" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
```

### 3. Update App.jsx Routes

```javascript
import ProtectedRoute from './components/ProtectedRoute';

// Wrap customer routes
<Route path="/customer" element={
  <ProtectedRoute>
    <CustomerDashboard />
  </ProtectedRoute>
}>
  {/* nested routes */}
</Route>
```

- [ ] Login API integrated
- [ ] Token stored in localStorage
- [ ] Protected routes implemented
- [ ] Redirect to login works

## 👤 Profile Management

### API Endpoints Needed:
```
GET    /api/customer/profile
PUT    /api/customer/profile
POST   /api/customer/profile/avatar
```

### Update MyProfile.jsx:

```javascript
import { useQuery, useMutation } from '@tanstack/react-query';

const MyProfile = () => {
  // Fetch profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const token = localStorage.getItem('customerToken');
      const response = await fetch('/api/customer/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.json();
    }
  });

  // Update profile
  const updateMutation = useMutation({
    mutationFn: async (profileData) => {
      const token = localStorage.getItem('customerToken');
      const response = await fetch('/api/customer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Profile Updated" });
    }
  });

  // Rest of component...
};
```

**Backend Tasks:**
- [ ] Create GET profile endpoint
- [ ] Create PUT profile endpoint
- [ ] Add avatar upload endpoint
- [ ] Validate profile data
- [ ] Return updated profile

**Frontend Tasks:**
- [ ] Replace mock data with API call
- [ ] Add loading states
- [ ] Handle errors
- [ ] Update avatar upload

## 📍 Address Management

### API Endpoints Needed:
```
GET    /api/customer/addresses
POST   /api/customer/addresses
PUT    /api/customer/addresses/:id
DELETE /api/customer/addresses/:id
PUT    /api/customer/addresses/:id/default
```

### Update ManageAddresses.jsx:

```javascript
// Fetch addresses
const { data: addresses } = useQuery({
  queryKey: ['addresses'],
  queryFn: async () => {
    const token = localStorage.getItem('customerToken');
    const response = await fetch('/api/customer/addresses', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
});

// Add address
const addMutation = useMutation({
  mutationFn: async (addressData) => {
    const token = localStorage.getItem('customerToken');
    return fetch('/api/customer/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(addressData)
    }).then(res => res.json());
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['addresses']);
  }
});
```

**Backend Tasks:**
- [ ] Create address CRUD endpoints
- [ ] Validate address data
- [ ] Handle default address logic
- [ ] Link addresses to customer

**Frontend Tasks:**
- [ ] Replace mock addresses
- [ ] Implement add address
- [ ] Implement edit address
- [ ] Implement delete address
- [ ] Set default address

## 📦 Order Management

### API Endpoints Needed:
```
GET    /api/customer/orders
GET    /api/customer/orders/:id
POST   /api/customer/orders/:id/reorder
POST   /api/customer/orders/:id/rate
PUT    /api/customer/orders/:id/cancel
```

### Update MyOrders.jsx:

```javascript
const { data: orders } = useQuery({
  queryKey: ['orders'],
  queryFn: async () => {
    const token = localStorage.getItem('customerToken');
    const response = await fetch('/api/customer/orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
});
```

**Backend Tasks:**
- [ ] Create order endpoints
- [ ] Add order status tracking
- [ ] Implement reorder logic
- [ ] Add rating system
- [ ] Handle order cancellation

**Frontend Tasks:**
- [ ] Fetch real orders
- [ ] Display order status
- [ ] Real-time status updates
- [ ] Rate order functionality
- [ ] Reorder functionality

## ❤️ Favorites

### API Endpoints Needed:
```
GET    /api/customer/favorites
POST   /api/customer/favorites/:itemId
DELETE /api/customer/favorites/:itemId
```

**Backend Tasks:**
- [ ] Create favorites table
- [ ] Add/remove favorites
- [ ] Link to menu items
- [ ] Return item details

**Frontend Tasks:**
- [ ] Fetch favorites
- [ ] Add to favorites
- [ ] Remove from favorites
- [ ] Show favorite status on menu

## 💰 Wallet & Payments

### API Endpoints Needed:
```
GET    /api/customer/wallet
POST   /api/customer/wallet/add-money
GET    /api/customer/payment-methods
POST   /api/customer/payment-methods
DELETE /api/customer/payment-methods/:id
PUT    /api/customer/payment-methods/:id/default
GET    /api/customer/transactions
```

**Backend Tasks:**
- [ ] Wallet balance management
- [ ] Payment gateway integration
- [ ] Transaction logging
- [ ] Secure card storage
- [ ] Payment method CRUD

**Frontend Tasks:**
- [ ] Display wallet balance
- [ ] Add money flow
- [ ] Manage payment methods
- [ ] Show transactions
- [ ] Secure card details

## 🎁 Offers & Rewards

### API Endpoints Needed:
```
GET    /api/customer/offers
GET    /api/customer/rewards/points
POST   /api/customer/rewards/redeem
POST   /api/customer/offers/:id/apply
```

**Backend Tasks:**
- [ ] Offer management system
- [ ] Reward points logic
- [ ] Promo code validation
- [ ] Expiry handling
- [ ] Min order validation

**Frontend Tasks:**
- [ ] Fetch active offers
- [ ] Display reward points
- [ ] Apply promo codes
- [ ] Redeem rewards
- [ ] Show offer details

## 🔔 Notifications

### API Endpoints Needed:
```
GET    /api/customer/notifications
PUT    /api/customer/notifications/:id/read
PUT    /api/customer/notifications/mark-all-read
GET    /api/customer/notification-preferences
PUT    /api/customer/notification-preferences
```

**Backend Tasks:**
- [ ] Notification system
- [ ] Push notification service
- [ ] Email notification
- [ ] SMS integration
- [ ] Preference management

**Frontend Tasks:**
- [ ] Fetch notifications
- [ ] Mark as read
- [ ] Update preferences
- [ ] Real-time notifications
- [ ] Badge counts

## ⚙️ Settings

### API Endpoints Needed:
```
GET    /api/customer/settings
PUT    /api/customer/settings
POST   /api/customer/change-password
POST   /api/customer/enable-2fa
DELETE /api/customer/account
```

**Backend Tasks:**
- [ ] Settings storage
- [ ] Password change
- [ ] 2FA implementation
- [ ] Account deletion
- [ ] Theme/language storage

**Frontend Tasks:**
- [ ] Load settings
- [ ] Save preferences
- [ ] Change password
- [ ] Enable 2FA
- [ ] Account actions

## 🆘 Help & Support

### API Endpoints Needed:
```
GET    /api/support/faqs
POST   /api/support/ticket
POST   /api/support/chat
```

**Backend Tasks:**
- [ ] FAQ management
- [ ] Support ticket system
- [ ] Chat integration
- [ ] Email support

**Frontend Tasks:**
- [ ] Display FAQs
- [ ] Submit tickets
- [ ] Live chat widget
- [ ] Contact forms

## 🔄 Real-time Features

### WebSocket Integration:

**For Order Tracking:**
```javascript
// In MyOrders.jsx
useEffect(() => {
  const ws = new WebSocket('ws://localhost:5000');
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'order_update') {
      queryClient.invalidateQueries(['orders']);
    }
  };
  
  return () => ws.close();
}, []);
```

**Backend Tasks:**
- [ ] WebSocket server setup
- [ ] Order status broadcasting
- [ ] Authentication for WS
- [ ] Event types defined

**Frontend Tasks:**
- [ ] WebSocket client
- [ ] Auto-refresh on updates
- [ ] Live status indicators
- [ ] Connection handling

## 🧪 Testing Integration

### Test Checklist:

**Authentication:**
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Token expiration handling
- [ ] Refresh token flow
- [ ] Logout clears data

**Profile:**
- [ ] Load profile data
- [ ] Update profile
- [ ] Upload avatar
- [ ] Validation errors

**Addresses:**
- [ ] List addresses
- [ ] Add new address
- [ ] Edit address
- [ ] Delete address
- [ ] Set default

**Orders:**
- [ ] List orders
- [ ] Filter by status
- [ ] View details
- [ ] Rate order
- [ ] Reorder

**Wallet:**
- [ ] Show balance
- [ ] Add money
- [ ] Add payment method
- [ ] Transaction history

**Others:**
- [ ] Favorites CRUD
- [ ] Offers display
- [ ] Notifications
- [ ] Settings save

## 📝 Environment Setup

### Frontend `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000
```

### Backend `.env`:
```env
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d
DATABASE_URL=your-database-url
STRIPE_KEY=your-stripe-key
```

## 🚀 Deployment Checklist

**Frontend:**
- [ ] Update API URLs for production
- [ ] Enable production build
- [ ] Configure CORS
- [ ] Test all features
- [ ] Add error boundaries

**Backend:**
- [ ] Production database
- [ ] Environment variables
- [ ] Rate limiting
- [ ] Security headers
- [ ] Logging system

## 📊 Monitoring

**Setup:**
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Performance monitoring
- [ ] API response times
- [ ] User activity logs

## 🎯 Priority Order

**Phase 1 (Essential):**
1. Authentication
2. Profile Management
3. Order Management
4. Address Management

**Phase 2 (Important):**
5. Wallet & Payments
6. Favorites
7. Notifications

**Phase 3 (Nice to Have):**
8. Offers & Rewards
9. Settings
10. Help & Support

## ✅ Final Verification

Before going live:
- [ ] All APIs tested
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Success messages shown
- [ ] Mobile responsive
- [ ] Security reviewed
- [ ] Performance optimized
- [ ] Backup strategy
- [ ] Documentation updated

---

**Good luck with the integration! 🚀**

Each checkbox represents a task. Work through them systematically for smooth integration.
