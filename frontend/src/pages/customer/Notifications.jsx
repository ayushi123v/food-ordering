import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  ShoppingBag, 
  Gift, 
  Star,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      icon: ShoppingBag,
      title: 'Order Delivered',
      description: 'Your order #ORD-001 has been delivered successfully',
      time: '2 hours ago',
      isRead: false,
    },
    {
      id: 2,
      icon: Gift,
      title: 'New Offer Available',
      description: 'Get 50% off on your next order. Use code: SAVE50',
      time: '5 hours ago',
      isRead: false,
    },
    {
      id: 3,
      icon: Star,
      title: 'Rate Your Order',
      description: 'How was your experience with Pizza Palace?',
      time: '1 day ago',
      isRead: true,
    },
    {
      id: 4,
      icon: TrendingUp,
      title: 'Trending Now',
      description: 'Check out the most popular items this week',
      time: '2 days ago',
      isRead: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
        <p className="text-muted-foreground">Manage your notification preferences</p>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose what notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <Label htmlFor="push">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
              </div>
            </div>
            <Switch id="push" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <Label htmlFor="email">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
            </div>
            <Switch id="email" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <div>
                <Label htmlFor="sms">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
              </div>
            </div>
            <Switch id="sms" />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Notification Types</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="orders">Order Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about your order status</p>
              </div>
              <Switch id="orders" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="offers">Offers & Promotions</Label>
                <p className="text-sm text-muted-foreground">Receive special offers and discounts</p>
              </div>
              <Switch id="offers" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reviews">Review Reminders</Label>
                <p className="text-sm text-muted-foreground">Reminders to review your orders</p>
              </div>
              <Switch id="reviews" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="recommendations">Recommendations</Label>
                <p className="text-sm text-muted-foreground">Get personalized food recommendations</p>
              </div>
              <Switch id="recommendations" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Your latest notifications</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div 
                  key={notification.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg transition-colors ${
                    notification.isRead ? 'bg-muted/50' : 'bg-primary/5 border border-primary/20'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    notification.isRead ? 'bg-muted' : 'bg-primary/10'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      notification.isRead ? 'text-muted-foreground' : 'text-primary'
                    }`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold">{notification.title}</h4>
                      {!notification.isRead && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
