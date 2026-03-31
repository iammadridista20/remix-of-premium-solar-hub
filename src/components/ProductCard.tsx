import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";
import { formatNaira } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <Badge className="absolute left-3 top-3 gradient-accent border-0 text-accent-foreground font-semibold text-xs">
            {product.badge}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </span>
        <h3 className="font-heading text-base font-semibold leading-snug text-card-foreground">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-heading text-lg font-bold text-secondary">
            {formatNaira(product.price)}
          </span>
          <Button
            size="sm"
            variant="default"
            onClick={() => onAddToCart(product)}
            className="gap-1.5"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
