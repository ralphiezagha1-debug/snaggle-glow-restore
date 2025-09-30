import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickBidModalProps {
  isOpen: boolean;
  onClose: () => void;
  lotId: string;
  lotTitle: string;
  currentBid: number;
  minIncrement?: number;
}

export default function QuickBidModal({
  isOpen,
  onClose,
  lotId,
  lotTitle,
  currentBid,
  minIncrement = 0.01
}: QuickBidModalProps) {
  const [bidAmount, setBidAmount] = useState((currentBid + minIncrement).toFixed(2));
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleBidChange = (value: string) => {
    setBidAmount(value);
    setError("");
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setError("Please enter a valid amount");
      return;
    }
    
    if (numValue <= currentBid) {
      setError("Bid must be higher than current bid");
      return;
    }
    
    const increment = numValue - currentBid;
    const validIncrement = Math.round(increment / minIncrement) * minIncrement;
    
    if (Math.abs(increment - validIncrement) > 0.001) {
      setError("Snaggle auctions move by exactly $0.01.");
      return;
    }
  };

  const addIncrement = (amount: number) => {
    const newAmount = currentBid + amount;
    setBidAmount(newAmount.toFixed(2));
    setError("");
  };

  const handleSubmit = () => {
    if (error) return;
    
    toast({
      title: "Demo mode",
      description: "Backend coming soon — bid functionality disabled",
      variant: "destructive",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Quick Bid</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Lot Info */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h3 className="font-semibold text-white mb-1 line-clamp-1">{lotTitle}</h3>
            <p className="text-sm text-white/70">
              Current bid: <span className="text-[var(--snag-neon)] font-semibold">${currentBid.toFixed(2)}</span>
            </p>
          </div>

          {/* Bid Amount */}
          <div className="space-y-2">
            <Label htmlFor="bid-amount" className="text-white">Your Bid</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">$</span>
              <Input
                id="bid-amount"
                type="number"
                step="0.01"
                value={bidAmount}
                onChange={(e) => handleBidChange(e.target.value)}
                className="pl-8 bg-white/5 border-white/20 text-white"
                placeholder="0.00"
              />
            </div>
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
          </div>

          {/* Quick Increment Buttons */}
          <div className="space-y-2">
            <Label className="text-white/80 text-sm">Quick Add</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addIncrement(0.01)}
                className="border-white/20 text-white/80 hover:bg-white/10"
              >
                <Plus className="h-3 w-3 mr-1" />
                $0.01
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addIncrement(0.10)}
                className="border-white/20 text-white/80 hover:bg-white/10"
              >
                <Plus className="h-3 w-3 mr-1" />
                $0.10
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addIncrement(1.00)}
                className="border-white/20 text-white/80 hover:bg-white/10"
              >
                <Plus className="h-3 w-3 mr-1" />
                $1.00
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Minimum increment:</span>
            <Badge variant="outline" className="border-white/30 text-white/80">
              ${minIncrement.toFixed(2)}
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button 
              variant="ghost-green" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              variant="primary"
              onClick={handleSubmit}
              disabled={!!error || !bidAmount}
              className="flex-1"
            >
              Place Bid
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}