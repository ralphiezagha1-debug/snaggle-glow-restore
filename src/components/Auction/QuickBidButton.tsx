import { useState } from 'react';
import { Button } from '../ui/button';

interface QuickBidButtonProps {
  auctionId: string;
  creditCost?: number;
  onSuccess?: () => void;
}

export default function QuickBidButton({ 
  auctionId, 
  creditCost = 1, 
  onSuccess 
}: QuickBidButtonProps) {
  const [busy, setBusy] = useState(false);
  
  async function handleClick() {
    if (busy) return;
    setBusy(true);
    
    try {
      // optimistic: local event for UI can be dispatched here if needed
      const res = await fetch(`/api/bid/quick`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auctionId, creditCost })
      });
      
      if (!res.ok) throw new Error(await res.text());
      
      onSuccess?.();
      // toast success (app's toast util if present)
    } catch (e: any) {
      // toast error
      console.error('Quick bid failed:', e);
    } finally {
      setTimeout(() => setBusy(false), 1000); // spam guard ~1s
    }
  }
  
  return (
    <div className="flex flex-col items-end gap-1">
      <Button 
        variant="quick-bid" 
        onClick={handleClick} 
        disabled={busy} 
        className="px-4 py-2"
      >
        {busy ? 'Bidding…' : 'Quick Bid'}
      </Button>
      <span className="text-xs text-white/70">uses {creditCost} credit</span>
    </div>
  );
}