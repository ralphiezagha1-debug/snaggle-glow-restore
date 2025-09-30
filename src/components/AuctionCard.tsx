import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface AuctionItem {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  buyNowPrice?: number;
  imageUrl: string;
  endTime: Date;
  bidCount: number;
  category: string;
  seller: string;
  isEnding?: boolean;
  isFeatured?: boolean;
  isSoldOut?: boolean;
}

interface AuctionCardProps {
  auction: AuctionItem;
  variant?: 'default' | 'ending-soon' | 'featured' | 'sold-out';
  className?: string;
}

export const AuctionCard = ({ auction, variant = 'default', className }: AuctionCardProps) => {
  const getTimeRemaining = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    
    return `${hours}h ${minutes}m`;
  };

  const timeRemaining = getTimeRemaining(auction.endTime);
  const isEnding = variant === 'ending-soon' || auction.isEnding;
  const isFeatured = variant === 'featured' || auction.isFeatured;
  const isSoldOut = variant === 'sold-out' || auction.isSoldOut;
  
  // Check if timer is under 1 minute for pulse effect
  const isUrgent = timeRemaining.includes('m') && !timeRemaining.includes('h') && !timeRemaining.includes('d') && parseInt(timeRemaining) < 1;

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300",
      "hover:shadow-card hover:-translate-y-1",
      isFeatured && "ring-2 ring-snaggle-gold snaggle-glow-sm",
      isEnding && "ring-2 ring-destructive",
      isSoldOut && "opacity-60",
      className
    )}>
      <div className="relative">
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge variant="verified" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Verified
          </Badge>
          {isFeatured && (
            <Badge className="bg-snaggle-gold text-black font-semibold">
              Featured
            </Badge>
          )}
          {isEnding && (
            <Badge variant="destructive">
              Ending Soon
            </Badge>
          )}
          {isSoldOut && (
            <Badge variant="secondary">
              Sold Out
            </Badge>
          )}
        </div>

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <Badge variant="outline" className="mb-2">
            {auction.category}
          </Badge>
          <Link to={`/auctions/${auction.id}`}>
            <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
              {auction.title}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
            {auction.description}
          </p>
        </div>

        <div className="space-y-3">
          {/* Trust Labels */}
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-[hsl(196,73%,53%)]" />
              Free shipping included
            </span>
            <span>• Authenticity guaranteed</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Current bid</p>
              <p className="text-2xl font-bold text-snaggle-green">
                ${auction.currentBid.toLocaleString()}
              </p>
            </div>
            {auction.buyNowPrice && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Buy now</p>
                <p className="text-lg font-semibold">
                  ${auction.buyNowPrice.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded gold-glow",
              isUrgent && "timer-pulse"
            )}>
              <Clock className="h-4 w-4 text-snaggle-gold" />
              <span className="font-medium text-snaggle-gold">{timeRemaining}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{auction.bidCount} bids</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="primary-action" className="flex-1" disabled={isSoldOut}>
              <Link to={`/auctions/${auction.id}`}>
                {isSoldOut ? 'View Details' : 'Bid Now'}
              </Link>
            </Button>
            {auction.buyNowPrice && !isSoldOut && (
              <Button variant="outline" asChild>
                <Link to={`/auctions/${auction.id}?action=buy-now`}>
                  Buy Now
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};