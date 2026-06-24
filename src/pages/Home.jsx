import { ArrowRight, ShoppingBag, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Welcome to ShopHub
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Discover an amazing collection of products at unbeatable prices.
            Shop with confidence, save with style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            {/* {
              <Link
                to="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition"
              >
                Create Account
              </Link>
            } */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card border-y border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Wide Selection
              </h3>
              <p className="text-muted-foreground">
                Browse hundreds of products across multiple categories
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Fast Checkout
              </h3>
              <p className="text-muted-foreground">
                Quick and easy purchasing process
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Star className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Quality Products
              </h3>
              <p className="text-muted-foreground">
                Carefully curated selection of premium items
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to start shopping?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {`Welcome back,! Check out our latest products.`}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
          >
            Browse Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
