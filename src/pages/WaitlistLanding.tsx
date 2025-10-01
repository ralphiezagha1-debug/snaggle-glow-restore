import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WaitlistLanding = () => {
  const [email, setEmail] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const [position, setPosition] = useState(0);
  const [copied, setCopied] = useState(false);

  const referralLink = `https://snaggle.fun/ref/${Math.random().toString(36).substring(7)}`;

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    // Mock signup - generate random position
    const mockPosition = Math.floor(Math.random() * 1000) + 1;
    setPosition(mockPosition);
    setHasJoined(true);
    
    toast({
      title: "Welcome to Snaggle!",
      description: `You're #${mockPosition} in line`,
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Share with friends to move up in line",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const text = encodeURIComponent("Join me on Snaggle - The Penny Auction Reinvented! 🎯");
    const url = encodeURIComponent(referralLink);
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      tiktok: `https://www.tiktok.com/upload?text=${text}`,
      instagram: `https://www.instagram.com/`,
    };

    window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
  };

  const mockLeaderboard = [
    { rank: 1, name: "Alex M.", referrals: 47 },
    { rank: 2, name: "Sarah K.", referrals: 38 },
    { rank: 3, name: "Mike D.", referrals: 32 },
    { rank: 4, name: "Emma L.", referrals: 28 },
    { rank: 5, name: "Chris P.", referrals: 24 },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-black text-[#00FF80] hero-glow">
              ⚡ Snaggle
            </div>
            <div className="hidden sm:block text-sm text-white/60">
              The Penny Auction Reinvented
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/home">View Auctions</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-[#00FF80] hero-glow animate-fade-in">
            Snaggle — The Penny Auction Reinvented
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 animate-fade-in">
            Join the waitlist and be first to win.
          </p>

          {!hasJoined ? (
            <form onSubmit={handleJoinWaitlist} className="max-w-xl mx-auto space-y-4 animate-scale-in">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-14 bg-neutral-900 border-white/20 text-white placeholder:text-white/40 text-lg"
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg font-semibold animate-pulse hover:animate-none shadow-[0_0_20px_rgba(60,255,107,0.4)]"
                >
                  Join Waitlist
                </Button>
              </div>
              <p className="text-sm text-white/50">
                No spam. Early access for the first 1,000 members.
              </p>
            </form>
          ) : (
            <div className="max-w-2xl mx-auto space-y-8 animate-scale-in">
              {/* Position Card */}
              <Card className="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 border border-emerald-400/30 shadow-[0_0_30px_rgba(60,255,107,0.3)]">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl font-black text-[#00FF80] mb-2 hero-glow">
                    #{position}
                  </div>
                  <p className="text-xl text-white/80 mb-6">
                    You're in line!
                  </p>
                  <div className="neon-divider my-6" />
                  <p className="text-lg font-semibold text-white mb-4">
                    Invite friends to move up!
                  </p>
                </CardContent>
              </Card>

              {/* Referral Section */}
              <Card className="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 border border-white/10">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={referralLink}
                      readOnly
                      className="flex-1 bg-neutral-800 border-white/20 text-white/60"
                    />
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-[#00FF80]" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Share Buttons */}
                  <div className="space-y-2">
                    <p className="text-sm text-white/60 text-center">Share on:</p>
                    <div className="flex justify-center gap-3">
                      <Button
                        onClick={() => handleShare("twitter")}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        X
                      </Button>
                      <Button
                        onClick={() => handleShare("tiktok")}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                        TikTok
                      </Button>
                      <Button
                        onClick={() => handleShare("instagram")}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        Instagram
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Rewards Section */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Referral Rewards
            </h2>
            <p className="text-xl text-[#00FF80] font-semibold">
              Top 100 referrers get early access
            </p>
          </div>

          {/* Leaderboard */}
          <Card className="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 border border-white/10">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 pb-3 border-b border-white/10 text-sm font-semibold text-white/60">
                  <div>Rank</div>
                  <div>Name</div>
                  <div className="text-right">Referrals</div>
                </div>
                {mockLeaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className="grid grid-cols-3 gap-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-lg font-bold ${
                          entry.rank === 1
                            ? "text-[#FFD700]"
                            : entry.rank === 2
                            ? "text-[#C0C0C0]"
                            : entry.rank === 3
                            ? "text-[#CD7F32]"
                            : "text-white/60"
                        }`}
                      >
                        #{entry.rank}
                      </span>
                    </div>
                    <div className="text-white font-medium">{entry.name}</div>
                    <div className="text-right text-[#00FF80] font-semibold">
                      {entry.referrals}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center text-sm text-white/50">
                Leaderboard updates in real-time
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-12 border-t border-white/10">
        <div className="text-center text-white/50 text-sm">
          © {new Date().getFullYear()} Snaggle. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default WaitlistLanding;
