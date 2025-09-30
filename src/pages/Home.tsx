import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Trophy, Zap, Shield, Users, TrendingUp } from "lucide-react";

const Home = () => {
  // Mock featured auctions
  const featuredAuctions = [
    {
      id: "1",
      title: "Vintage 1965 Gibson Les Paul",
      currentBid: 8750,
      endTime: "2h 34m",
      bidCount: 23,
      image: "/api/placeholder/300/200",
      featured: true,
    },
    {
      id: "2", 
      title: "Original Banksy Street Art",
      currentBid: 15420,
      endTime: "1d 5h",
      bidCount: 67,
      image: "/api/placeholder/300/200",
      featured: true,
    },
    {
      id: "3",
      title: "Rolex Submariner (1970)",
      currentBid: 12300,
      endTime: "4h 12m", 
      bidCount: 45,
      image: "/api/placeholder/300/200",
      featured: false,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Real-Time Bidding",
      description: "Lightning-fast bid processing with instant updates and no delays."
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Bank-level security with verified sellers and protected payments."
    },
    {
      icon: Users,
      title: "Curated Community",
      description: "Join thousands of collectors and enthusiasts worldwide."
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Get real-time market data and price trends for informed bidding."
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-12 pb-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-[#00FF85] hero-glow">
            Snag Deals in Live Auctions
          </h1>
          <p className="text-white/70 mb-8 max-w-3xl">
            The premium live auction platform where collectors, enthusiasts, and investors 
            compete for exclusive items in real-time. Authenticity guaranteed, every bid counts.
          </p>
          <div className="flex flex-wrap gap-4 mb-5">
            <Button 
              size="lg" 
              asChild
              className="bg-[#00FF85] text-black font-semibold hover:bg-[#00e676] ring-1 ring-[rgba(0,255,133,0.35)] hover:shadow-[0_8px_24px_rgba(0,255,133,0.25)] transition-all"
            >
              <Link to="/auctions">Shop Now</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild
              className="bg-white/8 text-white hover:bg-white/12 border-white/10"
            >
              <Link to="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
          {/* Trust row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
            <span className="inline-flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-[#3BAFDA]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified sellers
            </span>
            <span className="inline-flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-[#3BAFDA]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Buyer protection
            </span>
            <span className="inline-flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-[#3BAFDA]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              Free shipping on wins
            </span>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Auctions
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover exceptional items ending soon
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredAuctions.map((auction) => (
              <Card key={auction.id} className="bg-gradient-card border-card-border hover:border-primary/50 transition-all duration-300 group">
                <div className="relative">
                  <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Image Placeholder</span>
                  </div>
                  {auction.featured && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1 gold-glow">
                    <Clock className="h-3 w-3 text-snaggle-gold" />
                    <span className="text-xs font-medium text-snaggle-gold">{auction.endTime}</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {auction.title}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span>Current Bid</span>
                    <span className="text-snaggle-green font-bold text-lg">
                      ${auction.currentBid.toLocaleString()}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {auction.bidCount} bids
                    </span>
                    <Button asChild variant="secondary" size="sm">
                      <Link to={`/auctions/${auction.id}`}>
                        View Auction
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/auctions">
                View All Auctions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Snaggle?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of online auctions with cutting-edge technology 
              and unmatched reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="text-center border-card-border bg-card/50">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-white/[0.03] border-white/5 text-center p-12">
            <CardHeader>
              <div className="flex justify-center mb-6">
                <Trophy className="h-16 w-16 text-[#00FF85]" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Start Winning?
              </CardTitle>
              <CardDescription className="text-lg text-white/70 max-w-2xl mx-auto">
                Join thousands of successful bidders who trust Snaggle for their most important purchases.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button 
                asChild 
                size="lg" 
                className="text-lg px-8 bg-[#00FF85] text-black font-semibold hover:bg-[#00e676] ring-1 ring-[rgba(0,255,133,0.35)] hover:shadow-[0_8px_24px_rgba(0,255,133,0.25)] transition-all"
              >
                <Link to="/signup">
                  Create Your Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 border-white/20 text-white/90 hover:bg-white/10">
                <Link to="/waitlist">Join Our Waitlist</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;