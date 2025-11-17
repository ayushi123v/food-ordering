import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin, Package, CheckCircle, XCircle, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Sample orders data
  const orders = [
    {
      id: 'ORD-001',
      vendor: 'Pizza Palace',
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 169 },
        { name: 'Garlic Bread', quantity: 1, price: 89 },
      ],
      total: 427,
      status: 'delivered',
      orderDate: '2024-11-10',
      deliveryDate: '2024-11-10',
      address: '123 Main Street, New York, NY 10001',
    },
    {
      id: 'ORD-002',
      vendor: 'Burger Hub',
      items: [
        { name: 'Classic Burger', quantity: 1, price: 149 },
        { name: 'French Fries', quantity: 2, price: 79 },
      ],
      total: 307,
      status: 'in-progress',
      orderDate: '2024-11-11',
      address: '123 Main Street, New York, NY 10001',
    },
    {
      id: 'ORD-003',
      vendor: 'Sweet Treats',
      items: [
        { name: 'Chocolate Cake', quantity: 1, price: 199 },
      ],
      total: 199,
      status: 'pending',
      orderDate: '2024-11-11',
      address: '456 Business Ave, New York, NY 10002',
    },
    {
      id: 'ORD-004',
      vendor: 'Sushi Express',
      items: [
        { name: 'California Roll', quantity: 2, price: 179 },
        { name: 'Miso Soup', quantity: 1, price: 59 },
      ],
      total: 417,
      status: 'cancelled',
      orderDate: '2024-11-09',
      address: '123 Main Street, New York, NY 10001',
    },
  ];

  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'bg-yellow-500',
      text: 'Pending',
      badge: 'secondary',
    },
    'in-progress': {
      icon: Package,
      color: 'bg-blue-500',
      text: 'In Progress',
      badge: 'default',
    },
    delivered: {
      icon: CheckCircle,
      color: 'bg-green-500',
      text: 'Delivered',
      badge: 'success',
    },
    cancelled: {
      icon: XCircle,
      color: 'bg-red-500',
      text: 'Cancelled',
      badge: 'destructive',
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
              <CardTitle className="text-lg">{order.vendor}</CardTitle>
              <CardDescription>Order #{order.id}</CardDescription>
            </div>
            <Badge variant={config.badge}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {config.text}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {order.items.length} item(s) • ₹{order.total.toFixed(2)}
            </p>
            <div className="flex items-start space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{order.address}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Ordered on {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>

          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => viewOrderDetails(order)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            {order.status === 'delivered' && (
              <Button variant="outline" size="sm">
                Reorder
              </Button>
            )}
            {order.status === 'delivered' && (
              <Button variant="outline" size="sm">
                Rate Order
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
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

        <TabsContent value="in-progress" className="space-y-4">
          {filterOrders('in-progress').map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          {filterOrders('delivered').map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {filterOrders('cancelled').map(order => (
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
              {/* Status */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Status</h3>
                <Badge variant={statusConfig[selectedOrder.status].badge}>
                  {statusConfig[selectedOrder.status].text}
                </Badge>
              </div>

              {/* Vendor Info */}
              <div>
                <h3 className="font-semibold mb-2">Restaurant</h3>
                <p className="text-muted-foreground">{selectedOrder.vendor}</p>
              </div>

              {/* Items */}
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

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t">
                <h3 className="font-semibold text-lg">Total</h3>
                <p className="font-bold text-lg">₹{selectedOrder.total.toFixed(2)}</p>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="font-semibold mb-2">Delivery Address</h3>
                <div className="flex items-start space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{selectedOrder.address}</span>
                </div>
              </div>

              {/* Order Date */}
              <div>
                <h3 className="font-semibold mb-2">Order Date</h3>
                <p className="text-muted-foreground">
                  {new Date(selectedOrder.orderDate).toLocaleString()}
                </p>
              </div>

              {selectedOrder.deliveryDate && (
                <div>
                  <h3 className="font-semibold mb-2">Delivery Date</h3>
                  <p className="text-muted-foreground">
                    {new Date(selectedOrder.deliveryDate).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyOrders;
