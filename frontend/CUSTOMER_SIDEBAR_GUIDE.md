# Customer Dashboard Sidebar - Implementation Guide

## Overview
A comprehensive customer dashboard sidebar has been created for the food ordering system with all essential features for customer management.

## Features Implemented

### 1. **Sidebar Component** (`SidebarCustomer.jsx`)
Located at: `frontend/src/components/Customer/SidebarCustomer.jsx`

**Key Features:**
- Responsive design (mobile & desktop)
- User profile display
- Organized menu sections
- Logout confirmation dialog
- Active route highlighting
- Badge notifications

**Menu Sections:**
1. **Account**
   - My Profile
   - Manage Addresses

2. **Orders**
   - My Orders (with order count badge)
   - Favorites

3. **Payments & Rewards**
   - My Wallet
   - Offers & Rewards (with "New" badge)

4. **Other**
   - Notifications
   - My Reviews
   - Settings
   - Help & Support

### 2. **Customer Pages Created**

#### `CustomerDashboard.jsx`
- Main layout component with sidebar and content area
- Mobile-responsive with hamburger menu
- Uses React Router's `<Outlet />` for nested routes

#### `MyProfile.jsx`
- View and edit profile information
- Avatar display with initials
- Editable fields: Name, Email, Phone, Date of Birth
- Profile photo upload button

#### `ManageAddresses.jsx`
- Add, edit, delete delivery addresses
- Set default address
- Address types: Home, Work, Other
- Icon-based visual identification
- Address validation

#### `MyOrders.jsx`
- View all orders with status filtering
- Order status tabs: All, Pending, In Progress, Delivered, Cancelled
- Order details modal
- Track order status
- Reorder and rate order options
- Visual status indicators

#### `Favorites.jsx`
- Grid view of favorite food items
- Quick add to cart
- Remove from favorites
- Restaurant and pricing information
- Star ratings display

#### `MyWallet.jsx`
- Wallet balance display
- Add money to wallet
- Manage payment methods
- Transaction history
- Add/remove credit cards
- Set default payment method

#### `OffersRewards.jsx`
- View available offers and coupons
- Copy promo codes
- Reward points tracking
- Progress bar for next reward
- Offer details with validity dates
- Minimum order requirements

#### `Notifications.jsx`
- Recent notifications feed
- Notification preferences
- Toggle notification types:
  - Push Notifications
  - Email Notifications
  - SMS Notifications
- Category-specific settings:
  - Order Updates
  - Offers & Promotions
  - Review Reminders
  - Recommendations

#### `HelpSupport.jsx`
- Multiple support channels
- Live chat option
- Phone and email support
- Help center access
- FAQ accordion
- 24/7 support information

## Usage

### Accessing the Customer Dashboard

```jsx
// Navigate to the customer dashboard
navigate('/customer/profile');
navigate('/customer/orders');
navigate('/customer/addresses');
// ... etc
```

### Route Structure

```
/customer (CustomerDashboard layout)
  ├── /profile (My Profile)
  ├── /addresses (Manage Addresses)
  ├── /orders (My Orders)
  ├── /favorites (Favorites)
  ├── /wallet (My Wallet)
  ├── /offers (Offers & Rewards)
  ├── /notifications (Notifications)
  ├── /reviews (My Reviews)
  ├── /settings (Settings)
  └── /help (Help & Support)
```

### Integrating with Authentication

Update your login success handler to navigate to the customer dashboard:

```jsx
// In CustomerLogin.jsx
const handleLogin = async () => {
  // ... authentication logic
  localStorage.setItem('customerToken', token);
  localStorage.setItem('customerName', name);
  localStorage.setItem('customerEmail', email);
  navigate('/customer/profile'); // Navigate to dashboard
};
```

### Responsive Design

The sidebar automatically adapts to different screen sizes:
- **Desktop (lg+)**: Sidebar always visible
- **Mobile/Tablet**: Sidebar hidden, toggleable with hamburger menu
- Mobile menu includes overlay for better UX

### Customization

#### Changing Colors
The sidebar uses Tailwind CSS classes and shadcn/ui components. Modify colors in:
- `tailwind.config.js` for theme colors
- Component classes for specific styling

#### Adding New Menu Items

```jsx
// In SidebarCustomer.jsx, add to menuItems array
{
  section: 'Your Section',
  items: [
    {
      id: 'unique-id',
      label: 'Menu Label',
      icon: IconComponent, // from lucide-react
      path: '/customer/your-path',
      description: 'Brief description',
      badge: 'Optional', // optional badge text
    }
  ]
}
```

#### Updating User Info
User information is stored in localStorage:
- `customerName`
- `customerEmail`
- `customerToken`

## Dependencies Required

Make sure these packages are installed:

```bash
npm install lucide-react
npm install @tanstack/react-query
npm install react-router-dom
```

All shadcn/ui components used:
- `button`, `card`, `badge`, `separator`, `dialog`, `alert-dialog`
- `input`, `label`, `select`, `switch`, `avatar`
- `tabs`, `accordion`, `toast`

## Mobile Optimization

- Touch-friendly buttons and links
- Proper spacing for mobile screens
- Swipe-to-close sidebar support
- Responsive grid layouts
- Stack layouts for small screens

## Security Considerations

1. **Token Management**: Store authentication tokens securely
2. **Logout**: Clear all user data from localStorage
3. **Protected Routes**: Add route guards to prevent unauthorized access
4. **API Integration**: Replace mock data with actual API calls

## Next Steps

1. **API Integration**: Connect all pages to backend APIs
2. **Authentication Guards**: Implement protected route wrapper
3. **Real-time Updates**: Add WebSocket for order tracking
4. **Payment Gateway**: Integrate actual payment processing
5. **Image Upload**: Implement profile photo upload functionality
6. **Search Functionality**: Add search in orders and favorites
7. **Filters**: Add date range filters for orders and transactions

## Example: Protected Route Implementation

```jsx
// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('customerToken');
  
  if (!token) {
    return <Navigate to="/login/customer" replace />;
  }
  
  return children;
};

// In App.jsx
<Route path="/customer" element={
  <ProtectedRoute>
    <CustomerDashboard />
  </ProtectedRoute>
}>
  {/* nested routes */}
</Route>
```

## Testing

To test the sidebar:
1. Navigate to `http://localhost:5173/customer/profile`
2. Try clicking different menu items
3. Test mobile responsiveness (resize browser)
4. Test logout functionality
5. Verify all pages load correctly

## Support

For issues or questions:
- Check browser console for errors
- Verify all components are properly imported
- Ensure all required packages are installed
- Check that routes are correctly configured in App.jsx
