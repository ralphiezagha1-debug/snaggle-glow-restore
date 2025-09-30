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
      "group overflow-hidden transition-all duration-300 rounded-2xl",
      "bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/10",
      "shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]",
      "hover:border-[#00FF80] hover:shadow-[0_0_20px_rgba(0,255,128,0.4),inset_0_1px_2px_rgba(255,255,255,0.05)]",
      "hover:-translate-y-2",
      isFeatured && "ring-2 ring-[#FFD700]",
      isEnding && "ring-2 ring-destructive",
      isSoldOut && "opacity-60",
      className
    )}>
      <div className="relative">
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-56 object-cover rounded-t-2xl"
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

      <CardContent className="p-5 space-y-4">
        <div>
          <Badge variant="outline" className="mb-3 border-white/30 text-white/80 text-xs">
            {auction.category}
          </Badge>
          <Link to={`/auctions/${auction.id}`}>
            <h3 className="font-bold text-xl text-white hover:text-[#00FF80] transition-colors line-clamp-2 leading-tight">
              {auction.title}
            </h3>
          </Link>
        </div>

        <div className="space-y-4">
          {/* Trust Labels */}
          <div className="flex flex-wrap gap-2 text-xs font-medium text-white/70">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[#5DBAFF]" />
              Free shipping
            </span>
            <span>• Authenticity guaranteed</span>
          </div>
          
          {/* Price Section - Lower Third */}
          <div className="pt-2 space-y-1">
            <div className="flex items-baseline gap-2">
              <p className="text-sm text-white/60 font-medium">Current bid</p>
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <Users className="h-3.5 w-3.5" />
                <span>{auction.bidCount} bids</span>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-3xl font-bold text-[#00FF80]">
                ${auction.currentBid.toLocaleString()}
              </p>
              {auction.buyNowPrice && (
                <div className="text-right">
                  <p className="text-xs text-white/50">Buy now</p>
                  <p className="text-lg font-semibold text-white/90">
                    ${auction.buyNowPrice.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Timer */}
          <div className={cn(
            "inline-flex items-center rounded-lg px-3 py-1.5 text-sm bg-white/5 text-white/70 transition-all border border-white/10",
            isUrgent && "bg-[#FFD700]/15 text-[#FFD700] border-[#FFD700]/30 timer-pulse"
          )}>
            <Clock className={cn("h-4 w-4 mr-1.5", isUrgent ? "text-[#FFD700]" : "text-white/70")} />
            <span className="font-semibold">{timeRemaining}</span>
          </div>

          {/* CTA Button */}
          <Button 
            asChild 
            className="w-full glass-effect bg-[#007BFF] text-white font-bold hover:shadow-[0_0_20px_rgba(0,255,128,0.6)] transition-all h-11" 
            disabled={isSoldOut}
          >
            <Link to={`/auctions/${auction.id}`}>
              {isSoldOut ? 'View Details' : 'View Auction'}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};