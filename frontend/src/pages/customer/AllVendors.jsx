import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Star, Clock, MapPin, ArrowRight } from "lucide-react";

// Sample vendor data - replace this with actual API data later
const vendors = [
  {
    id: 1,
    name: "Pizza Palace",
    description: "Authentic Italian pizzas made with love",
    rating: 4.5,
    deliveryTime: "25-35 min",
    cuisine: "Italian",
    location: "Downtown",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Burger Hub",
    description: "Juicy burgers and crispy fries",
    rating: 4.3,
    deliveryTime: "20-30 min",
    cuisine: "American",
    location: "City Center",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Sweet Treats",
    description: "Desserts that melt in your mouth",
    rating: 4.7,
    deliveryTime: "30-40 min",
    cuisine: "Desserts",
    location: "Westside",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Sushi Express",
    description: "Fresh sushi and Japanese delicacies",
    rating: 4.6,
    deliveryTime: "35-45 min",
    cuisine: "Japanese",
    location: "Eastside",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Taco Fiesta",
    description: "Authentic Mexican street food",
    rating: 4.4,
    deliveryTime: "25-35 min",
    cuisine: "Mexican",
    location: "South District",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Curry House",
    description: "Spicy and flavorful Indian cuisine",
    rating: 4.5,
    deliveryTime: "30-40 min",
    cuisine: "Indian",
    location: "North Quarter",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=300&fit=crop",
  },
];

const AllVendors = () => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          All Vendors
        </h1>
        <p className="text-muted-foreground">
          Browse through our amazing selection of restaurants and food vendors. 
          Order from your favorite or discover something new!
        </p>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
            <Card 
              key={vendor.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
            >
              {/* Vendor Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-white/90 text-black hover:bg-white">
                  {vendor.cuisine}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-2xl">{vendor.name}</CardTitle>
                <CardDescription className="text-base">
                  {vendor.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{vendor.rating}</span>
                  <span className="text-muted-foreground text-sm">(100+ reviews)</span>
                </div>

                {/* Delivery Time */}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>{vendor.deliveryTime}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>{vendor.location}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Link to={`/menu/pizza`} className="w-full">
                  <Button className="w-full group/btn">
                    View Menu
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>

      {/* Empty State (if no vendors) */}
      {vendors.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">
            No vendors available at the moment. Please check back later!
          </p>
        </div>
      )}
    </div>
  );
};

export default AllVendors;
