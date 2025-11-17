# Quick Start - Testing Customer Dashboard

## 🚀 How to Test the Customer Dashboard

### Step 1: Start the Development Server

```powershell
cd frontend
npm run dev
```

The app should start at `http://localhost:5173`

### Step 2: Access the Dashboard Directly

Open your browser and navigate to:

```
http://localhost:5173/customer/profile
```

Since we haven't implemented authentication guards yet, you can access any page directly.

### Available Routes to Test:

1. **My Profile**
   ```
   http://localhost:5173/customer/profile
   ```

2. **Manage Addresses**
   ```
   http://localhost:5173/customer/addresses
   ```

3. **My Orders**
   ```
   http://localhost:5173/customer/orders
   ```

4. **Favorites**
   ```
   http://localhost:5173/customer/favorites
   ```

5. **My Wallet**
   ```
   http://localhost:5173/customer/wallet
   ```

6. **Offers & Rewards**
   ```
   http://localhost:5173/customer/offers
   ```

7. **Notifications**
   ```
   http://localhost:5173/customer/notifications
   ```

8. **Settings**
   ```
   http://localhost:5173/customer/settings
   ```

9. **Help & Support**
   ```
   http://localhost:5173/customer/help
   ```

## 📱 Testing Mobile Responsiveness

### Using Browser DevTools:

1. Press `F12` to open DevTools
2. Click the device toolbar icon (or press `Ctrl+Shift+M`)
3. Select a mobile device (e.g., iPhone 12 Pro)
4. Test the hamburger menu functionality

### Mobile Features to Test:
- ✅ Click hamburger menu icon
- ✅ Sidebar slides in from left
- ✅ Click overlay to close
- ✅ Click X button to close
- ✅ Navigate to different pages
- ✅ Logout button works

## 🎨 Visual Testing Checklist

### Sidebar:
- [ ] Logo displays correctly
- [ ] User profile shows with avatar
- [ ] All menu items are visible
- [ ] Active route is highlighted
- [ ] Badges appear on "My Orders" and "Offers"
- [ ] Icons are aligned properly
- [ ] Logout button at bottom

### My Profile:
- [ ] Avatar displays with initials
- [ ] Form fields are editable
- [ ] Edit/Save buttons work
- [ ] Toast notification appears on save

### Manage Addresses:
- [ ] Address cards display properly
- [ ] "Add Address" button opens dialog
- [ ] Can edit/delete addresses
- [ ] Default badge shows correctly
- [ ] Address icons display (Home/Work/Other)

### My Orders:
- [ ] Tabs switch between order statuses
- [ ] Order cards show all information
- [ ] Status badges have correct colors
- [ ] "View Details" opens modal
- [ ] Order details display correctly

### Favorites:
- [ ] Items display in grid
- [ ] Images load properly
- [ ] Ratings show correctly
- [ ] "Add to Cart" button works
- [ ] "Remove" button works

### My Wallet:
- [ ] Balance displays in gradient card
- [ ] Payment methods list correctly
- [ ] Transaction history shows
- [ ] Color coding (green/red) works

### Offers & Rewards:
- [ ] Reward points card displays
- [ ] Progress bar animates
- [ ] Offer cards show all details
- [ ] "Copy" button copies code
- [ ] "New" badge appears on relevant offers

### Notifications:
- [ ] Recent notifications display
- [ ] Toggle switches work
- [ ] Unread notifications highlighted
- [ ] Settings save correctly

### Settings:
- [ ] Theme selector works
- [ ] Language selector works
- [ ] All switches toggle
- [ ] Save button shows toast

### Help & Support:
- [ ] Contact options display
- [ ] FAQ accordion works
- [ ] Support card stands out

## 🐛 Common Issues & Solutions

### Issue: Components not rendering
**Solution**: Make sure all shadcn/ui components are installed
```powershell
npx shadcn@latest add button card badge dialog input label select switch tabs accordion separator avatar toast
```

### Issue: Icons not showing
**Solution**: Check lucide-react is installed
```powershell
npm install lucide-react
```

### Issue: Routes not working
**Solution**: Verify App.jsx has all imports and routes configured

### Issue: Styles not applied
**Solution**: 
1. Check Tailwind CSS is configured
2. Verify `@/` path alias in vite.config.js
3. Clear cache and restart dev server

## 🔄 Interactive Features to Test

### 1. Navigation
- Click each sidebar menu item
- Verify active state changes
- Check URL updates correctly

### 2. Forms
- Edit profile information
- Add/edit addresses
- Test all input fields

### 3. Dialogs/Modals
- Open order details
- Add address dialog
- Logout confirmation
- Check backdrop click closes

### 4. Actions
- Copy promo codes
- Mark notifications as read
- Toggle switches
- Delete items

### 5. Responsive Behavior
- Resize browser window
- Test breakpoints (640px, 768px, 1024px)
- Check mobile menu

## 📸 Screenshot Test Points

Take screenshots at these breakpoints:
- 375px (Mobile)
- 768px (Tablet)
- 1024px (Desktop)
- 1920px (Large Desktop)

## ⚡ Performance Check

### Things to Monitor:
1. Page load time
2. Smooth animations
3. No console errors
4. Images load quickly
5. Transitions are smooth

## 🎯 Functionality Checklist

- [ ] All pages load without errors
- [ ] Navigation works smoothly
- [ ] Forms accept input
- [ ] Buttons respond to clicks
- [ ] Dialogs open and close
- [ ] Toast notifications appear
- [ ] Active states update
- [ ] Mobile menu works
- [ ] Logout confirmation shows
- [ ] No console errors

## 📝 Notes for Development

### Mock Data Locations:
- User info: localStorage (customerName, customerEmail)
- Orders: MyOrders.jsx (line 10-50)
- Addresses: ManageAddresses.jsx (line 30-50)
- Favorites: Favorites.jsx (line 10-40)
- Transactions: MyWallet.jsx (line 25-35)
- Offers: OffersRewards.jsx (line 10-50)

### To Add Real Data:
Replace mock data arrays with API calls using React Query or fetch/axios.

## 🔗 Next Steps After Testing

1. **Add Authentication**
   - Implement protected routes
   - Add login redirect
   - Handle token expiration

2. **Connect Backend APIs**
   - Profile endpoints
   - Order management
   - Address CRUD
   - Payment processing

3. **Add Real-time Features**
   - WebSocket for orders
   - Push notifications
   - Live chat

4. **Optimize Performance**
   - Lazy load components
   - Image optimization
   - Code splitting

## 🎉 Success Indicators

You'll know everything is working when:
- ✅ All pages load without errors
- ✅ Sidebar navigation works smoothly
- ✅ Mobile responsive menu functions
- ✅ Forms can be filled and "submitted"
- ✅ Modals open and close properly
- ✅ Toast notifications appear
- ✅ Active menu items are highlighted
- ✅ All icons display correctly
- ✅ Badges show on relevant items
- ✅ No console errors

## 🆘 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Verify all imports are correct
3. Ensure all dependencies are installed
4. Check that routes match exactly
5. Clear browser cache
6. Restart dev server

---

**Happy Testing! 🚀**

The customer dashboard is fully functional with mock data and ready for backend integration.
