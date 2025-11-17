import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Wallet, CreditCard, Plus, Trash2, DollarSign, History } from 'lucide-react';

const MyWallet = () => {
  const walletBalance = 125.50;
  const paymentMethods = [
    {
      id: 1,
      type: 'Credit Card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Credit Card',
      last4: '8888',
      brand: 'Mastercard',
      isDefault: false,
    },
  ];

  const transactions = [
    { id: 1, type: 'debit', amount: 30.97, description: 'Order #ORD-001', date: '2024-11-10' },
    { id: 2, type: 'credit', amount: 50.00, description: 'Wallet Recharge', date: '2024-11-09' },
    { id: 3, type: 'debit', amount: 16.97, description: 'Order #ORD-002', date: '2024-11-08' },
    { id: 4, type: 'credit', amount: 100.00, description: 'Wallet Recharge', date: '2024-11-05' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Wallet</h1>
        <p className="text-muted-foreground">Manage your wallet and payment methods</p>
      </div>

      {/* Wallet Balance */}
      <Card className="bg-gradient-to-br from-primary to-secondary text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Wallet className="h-6 w-6 mr-2" />
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">₹{walletBalance.toFixed(2)}</p>
              <p className="text-white/80 mt-1">Available Balance</p>
            </div>
            <Button variant="secondary">
              <Plus className="h-4 w-4 mr-2" />
              Add Money
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your saved payment methods</CardDescription>
            </div>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Card
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center space-x-4">
                <CreditCard className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">
                    {method.brand} •••• {method.last4}
                  </p>
                  <p className="text-sm text-muted-foreground">{method.type}</p>
                </div>
                {method.isDefault && (
                  <Badge variant="default">Default</Badge>
                )}
              </div>
              <div className="flex space-x-2">
                {!method.isDefault && (
                  <Button variant="outline" size="sm">
                    Set Default
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="h-5 w-5 mr-2" />
            Transaction History
          </CardTitle>
          <CardDescription>Your recent wallet transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'credit' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className={`font-semibold ${
                  transaction.type === 'credit' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyWallet;
