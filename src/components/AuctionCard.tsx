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
      "group overflow-hidden transition-all duration-300 bg-white/[0.03] border-white/5 hover:border-white/10",
      isFeatured && "ring-2 ring-[#FFD700]",
      isEnding && "ring-2 ring-destructive",
      isSoldOut && "opacity-60",
      className
    )}>
      <div className="relative">
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge variant="verified" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Verified
          </Badge>
          {isFeatured && (
            <Badge className="bg-[#FFD700] text-black font-semibold">
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
          className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <Badge variant="outline" className="mb-2 border-white/20 text-white/70">
            {auction.category}
          </Badge>
          <Link to={`/auctions/${auction.id}`}>
            <h3 className="font-semibold text-lg text-white/90 hover:text-[#00FF85] transition-colors line-clamp-1">
              {auction.title}
            </h3>
          </Link>
          <p className="text-white/50 text-sm line-clamp-2 mt-1">
            {auction.description}
          </p>
        </div>

        <div className="space-y-3">
          {/* Trust Labels */}
          <div className="flex flex-wrap gap-2 text-xs text-white/50">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-[#3BAFDA]" />
              Free shipping included
            </span>
            <span>• Authenticity guaranteed</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-white/50">Current bid</p>
              <p className="text-2xl font-bold text-[#00FF85]">
                ${auction.currentBid.toLocaleString()}
              </p>
            </div>
            {auction.buyNowPrice && (
              <div className="text-right">
                <p className="text-sm text-white/50">Buy now</p>
                <p className="text-lg font-semibold text-white/90">
                  ${auction.buyNowPrice.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className={cn(
              "inline-flex items-center rounded-md px-2 py-1 text-xs bg-white/6 text-white/70 transition-all",
              isUrgent && "bg-[#FFD700]/15 text-[#FFD700] ring-1 ring-[#FFD700]/30 timer-pulse"
            )}>
              <Clock className={cn("h-4 w-4 mr-1", isUrgent ? "text-[#FFD700]" : "text-white/70")} />
              <span className="font-medium">{timeRemaining}</span>
            </div>
            <div className="flex items-center gap-1 text-white/50">
              <Users className="h-4 w-4" />
              <span>{auction.bidCount} bids</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              asChild 
              className="flex-1 bg-[#00FF85] text-black font-semibold hover:bg-[#00e676] transition-colors" 
              disabled={isSoldOut}
            >
              <Link to={`/auctions/${auction.id}`}>
                {isSoldOut ? 'View Details' : 'Bid Now'}
              </Link>
            </Button>
            {auction.buyNowPrice && !isSoldOut && (
              <Button variant="outline" asChild className="border-white/20 text-white/90 hover:bg-white/10">
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