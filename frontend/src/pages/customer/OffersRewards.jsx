import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gift, Tag, Percent, Clock, ArrowRight } from 'lucide-react';

const OffersRewards = () => {
  const offers = [
    {
      id: 1,
      title: '50% OFF on First Order',
      description: 'Get 50% off on your first order. Maximum discount ₹150.',
      code: 'FIRST50',
      discount: '50%',
      validUntil: '2024-12-31',
      minOrder: 299,
      isNew: true,
    },
    {
      id: 2,
      title: 'Free Delivery',
      description: 'Free delivery on orders above ₹499.',
      code: 'FREEDEL',
      discount: 'Free Delivery',
      validUntil: '2024-11-30',
      minOrder: 499,
      isNew: false,
    },
    {
      id: 3,
      title: 'Weekend Special',
      description: '20% off on all orders during weekends.',
      code: 'WEEKEND20',
      discount: '20%',
      validUntil: '2024-11-30',
      minOrder: 249,
      isNew: true,
    },
    {
      id: 4,
      title: 'Loyalty Bonus',
      description: '₹100 off on your next 5 orders.',
      code: 'LOYAL5',
      discount: '₹100',
      validUntil: '2024-12-15',
      minOrder: 399,
      isNew: false,
    },
  ];

  const rewardPoints = 450;
  const nextReward = 500;

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Offers & Rewards</h1>
        <p className="text-muted-foreground">Save more with exclusive offers</p>
      </div>

      {/* Rewards Card */}
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Gift className="h-6 w-6 mr-2" />
            Your Reward Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold">{rewardPoints}</p>
                <p className="text-white/80 mt-1">Available Points</p>
              </div>
              <Button variant="secondary">
                Redeem Points
              </Button>
            </div>
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-full transition-all"
                style={{ width: `${(rewardPoints / nextReward) * 100}%` }}
              />
            </div>
            <p className="text-sm text-white/80">
              {nextReward - rewardPoints} more points to next reward
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Available Offers */}
      <div>
        <h2 className="text-xl font-bold mb-4">Available Offers</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {offers.map((offer) => (
            <Card key={offer.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {offer.isNew && (
                <Badge className="absolute top-4 right-4" variant="default">
                  New
                </Badge>
              )}
              
              <CardHeader>
                <div className="flex items-start space-x-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Tag className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{offer.title}</CardTitle>
                    <CardDescription>{offer.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Promo Code</p>
                    <p className="font-mono font-bold text-lg">{offer.code}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyCode(offer.code)}
                  >
                    Copy
                  </Button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Percent className="h-4 w-4" />
                    <span>Discount: {offer.discount}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Valid until: {new Date(offer.validUntil).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <ArrowRight className="h-4 w-4" />
                    <span>Min order: ₹{offer.minOrder}</span>
                  </div>
                </div>

                <Button className="w-full">
                  Apply Offer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersRewards;
