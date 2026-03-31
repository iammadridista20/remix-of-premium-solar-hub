import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

const Index = () => {
  const featured = products.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={0} onCartOpen={() => {}} />
      <HeroSection />

      <section id="products" className="container py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Our Products
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Browse our range of premium solar, inverter, battery and CCTV products
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="gap-2">
              View All Products <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((product, i) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              <ProductCard product={product} showPrice={false} />
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="bg-muted/50">
        <div className="container py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl mb-4">
              About Premium Solar
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">PREMIUM SOLAR</span> is a green energy company dedicated to the sales and professional installation of solar panels, inverters, batteries, and CCTV security systems. We are committed to providing affordable, reliable, and sustainable energy and security solutions across Nigeria.
            </p>
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground text-center mb-6">Why Choose Us?</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Quality Guaranteed", desc: "All products come with manufacturer warranty and our satisfaction guarantee." },
              { title: "Expert Installation", desc: "Our certified engineers handle professional installation of solar, inverter, and CCTV systems across Nigeria." },
              { title: "24/7 Support", desc: "Round-the-clock customer support and after-sales service." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg bg-card p-6 shadow-card">
                <h4 className="font-heading text-lg font-semibold text-card-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
