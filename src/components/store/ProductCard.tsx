import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import QuickBuyModal from "@/components/modals/QuickBuyModal";
import { flags } from "@/mocks/sellerStore";

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  seller: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const [isQuickBuyModalOpen, setIsQuickBuyModalOpen] = useState(false);

  const handleQuickBuy = () => {
    if (!flags.quickBuyUI) return;
    setIsQuickBuyModalOpen(true);
  };

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 rounded-2xl",
      "bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/10",
      "shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]",
      "hover:border-[#00FF80] hover:shadow-[0_0_20px_rgba(0,255,128,0.4),inset_0_1px_2px_rgba(255,255,255,0.05)]",
      "hover:-translate-y-2",
      className
    )}>
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-56 object-cover rounded-t-2xl"
        />
        
        {/* Buy Now Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-[var(--snag-neon)] text-black font-semibold">
            Buy Now
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-xl text-white hover:text-[#00FF80] transition-colors line-clamp-2 leading-tight">
            {product.title}
          </h3>
          {product.description && (
            <p className="text-white/60 text-sm mt-2 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {/* Price Section */}
          <div className="pt-2">
            <div className="flex items-baseline gap-2">
              <p className="text-sm text-white/60 font-medium">Price</p>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold text-[#00FF80]">
                  ${product.price.toLocaleString()}
                </p>
                <p className="text-xs text-white/40 mt-1">Fixed price • instant purchase</p>
              </div>
              
              {/* Quick Buy - Desktop */}
              <div className="hidden sm:flex flex-col items-end gap-2">
                <Button
                  variant="quick-bid"
                  onClick={handleQuickBuy}
                  className="px-4 py-2"
                  aria-label={`Quick buy ${product.title}`}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Quick Buy
                </Button>
              </div>
            </div>
            
            {/* Quick Buy - Mobile */}
            <div className="sm:hidden mt-3">
              <Button
                variant="quick-bid"
                onClick={handleQuickBuy}
                className="w-full"
                aria-label={`Quick buy ${product.title}`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Quick Buy
              </Button>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="flex gap-2">
            <Button 
              variant="ghost-green"
              className="flex-1 h-11" 
            >
              View Details
            </Button>
            <Button 
              variant="ghost-green"
              className="flex-1 h-11" 
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Quick Buy Modal */}
      {isQuickBuyModalOpen && (
        <QuickBuyModal
          isOpen={isQuickBuyModalOpen}
          onClose={() => setIsQuickBuyModalOpen(false)}
          productId={product.id}
          productTitle={product.title}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      )}
    </Card>
  );
};