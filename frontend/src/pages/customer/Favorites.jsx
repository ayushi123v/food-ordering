import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const Favorites = () => {
  const { addToCart, toggleLike } = useCart();
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Margherita Pizza',
      vendor: 'Pizza Palace',
      price: 169,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop',
      category: 'Italian',
    },
    {
      id: 2,
      name: 'Classic Burger',
      vendor: 'Burger Hub',
      price: 149,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
      category: 'American',
    },
    {
      id: 3,
      name: 'Chocolate Cake',
      vendor: 'Sweet Treats',
      price: 199,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop',
      category: 'Desserts',
    },
    {
      id: 4,
      name: 'California Roll',
      vendor: 'Sushi Express',
      price: 179,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop',
      category: 'Japanese',
    },
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
    toggleLike(id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Favorites</h1>
        <p className="text-muted-foreground">Your favorite food items</p>
      </div>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start adding your favorite items to see them here
            </p>
            <Button>Browse Menu</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => removeFavorite(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.vendor}</CardDescription>
                  </div>
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <p className="text-lg font-bold text-primary">₹{item.price}</p>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => addToCart(item)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
