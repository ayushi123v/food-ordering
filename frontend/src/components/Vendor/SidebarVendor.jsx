import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SidebarVendor = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Get vendor info from localStorage or context
  const vendorName = localStorage.getItem('vendorName') || 'Restaurant Owner';
  const vendorEmail = localStorage.getItem('vendorEmail') || 'vendor@example.com';

  const menuItems = [
    {
      section: 'Main',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
          path: '/vendor/dashboard',
          description: 'Overview & analytics',
        },
        {
          id: 'orders',
          label: 'Orders',
          icon: ShoppingBag,
          path: '/vendor/orders',
          description: 'Manage incoming orders',
          badge: '5', // This could be dynamic based on pending orders
        },
      ]
    },
    {
      section: 'Restaurant',
      items: [
        {
          id: 'menu',
          label: 'Menu Items',
          icon: UtensilsCrossed,
          path: '/vendor/menu',
          description: 'Manage your menu',
        },
        {
          id: 'restaurant',
          label: 'Restaurant Profile',
          icon: Store,
          path: '/vendor/restaurant',
          description: 'Update restaurant info',
        },
      ]
    }
  ];

  const handleLogout = () => {
    // Clear localStorage or perform logout logic
    localStorage.removeItem('vendorToken');
    localStorage.removeItem('vendorName');
    localStorage.removeItem('vendorEmail');
    navigate('/');
    if (onClose) onClose();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-card border-r border-border z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-80 flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🍔</span>
              <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FoodHub
              </span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Vendor Info */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
              {vendorName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{vendorName}</p>
              <p className="text-sm text-muted-foreground truncate">{vendorEmail}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {menuItems.map((section) => (
            <div key={section.section}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                {section.section}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={onClose}
                      className={`
                        flex items-center space-x-3 px-3 py-2.5 rounded-lg 
                        transition-all duration-200 group
                        ${active 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md' 
                          : 'hover:bg-muted text-foreground'
                        }
                      `}
                    >
                      <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${active ? 'text-white' : ''}`}>
                          {item.label}
                        </p>
                        <p className={`text-xs ${active ? 'text-white/80' : 'text-muted-foreground'}`}>
                          {item.description}
                        </p>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant={active ? "secondary" : "default"}
                          className="ml-auto"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className={`h-4 w-4 flex-shrink-0 ${active ? 'text-white' : 'text-muted-foreground'}`} />
                    </Link>
                  );
                })}
              </div>
              {section.section !== 'Restaurant' && <Separator className="mt-4" />}
            </div>
          ))}
        </nav>

        {/* Footer - Logout Button */}
        <div className="p-4 border-t border-border">
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will need to login again to access your vendor dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SidebarVendor;
