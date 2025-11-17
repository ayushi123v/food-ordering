import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin, Package, CheckCircle, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const VendorOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Sample orders data
  const orders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      customerPhone: '+1 234 567 8900',
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 169 },
        { name: 'Garlic Bread', quantity: 1, price: 89 },
      ],
      total: 427,
      status: 'pending',
      orderTime: '2024-11-11 10:30 AM',
      address: '123 Main Street, New York, NY 10001',
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      customerPhone: '+1 234 567 8901',
      items: [
        { name: 'Pepperoni Pizza', quantity: 1, price: 219 },
        { name: 'Coke', quantity: 2, price: 59 },
      ],
      total: 337,
      status: 'preparing',
      orderTime: '2024-11-11 11:00 AM',
      address: '456 Oak Avenue, New York, NY 10002',
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      customerPhone: '+1 234 567 8902',
      items: [
        { name: 'Veggie Pizza', quantity: 1, price: 199 },
      ],
      total: 199,
      status: 'ready',
      orderTime: '2024-11-11 11:30 AM',
      address: '789 Elm Street, New York, NY 10003',
    },
    {
      id: 'ORD-004',
      customer: 'Sarah Wilson',
      customerPhone: '+1 234 567 8903',
      items: [
        { name: 'Hawaiian Pizza', quantity: 2, price: 249 },
      ],
      total: 498,
      status: 'completed',
      orderTime: '2024-11-11 09:00 AM',
      address: '321 Pine Road, New York, NY 10004',
    },
  ];

  const statusConfig = {
    pending: {
      icon: Clock,
      text: 'Pending',
      badge: 'secondary',
      actions: ['Accept', 'Reject'],
    },
    preparing: {
      icon: Package,
      text: 'Preparing',
      badge: 'default',
      actions: ['Mark Ready'],
    },
    ready: {
      icon: CheckCircle,
      text: 'Ready for Pickup',
      badge: 'default',
      actions: ['Mark Delivered'],
    },
    completed: {
      icon: CheckCircle,
      text: 'Completed',
      badge: 'success',
      actions: [],
    },
  };

  const filterOrders = (status) => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const OrderCard = ({ order }) => {
    const config = statusConfig[order.status];
    const StatusIcon = config.icon;

    return (
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">Order #{order.id}</CardTitle>
              <CardDescription>{order.customer} • {order.customerPhone}</CardDescription>
            </div>
            <Badge variant={config.badge}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {config.text}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {order.items.length} item(s) • ₹{order.total.toFixed(2)}
            </p>
            <div className="flex items-start space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{order.address}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {order.orderTime}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => viewOrderDetails(order)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            {config.actions.map((action) => (
              <Button key={action} size="sm">
                {action}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">Manage your incoming orders</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="ready">Ready</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filterOrders('all').map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterOrders('pending').map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="preparing" className="space-y-4">
          {filterOrders('preparing').map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="ready" className="space-y-4">
          {filterOrders('ready').map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {filterOrders('completed').map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>
      </Tabs>

      {/* Order Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Order #{selectedOrder?.id}</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Status</h3>
                <Badge variant={statusConfig[selectedOrder.status].badge}>
                  {statusConfig[selectedOrder.status].text}
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Customer</h3>
                <p className="text-muted-foreground">{selectedOrder.customer}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.customerPhone}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <h3 className="font-semibold text-lg">Total</h3>
                <p className="font-bold text-lg">₹{selectedOrder.total.toFixed(2)}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Delivery Address</h3>
                <div className="flex items-start space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{selectedOrder.address}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Order Time</h3>
                <p className="text-muted-foreground">{selectedOrder.orderTime}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorOrders;
