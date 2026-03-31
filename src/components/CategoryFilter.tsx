import type { Category } from "@/data/products";

interface CategoryFilterProps {
  active: Category;
  onChange: (cat: Category) => void;
}

const categories: Category[] = ["All", "Solar", "Inverter", "Battery", "CCTV"];

const CategoryFilter = ({ active, onChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
            active === cat
              ? "gradient-accent text-accent-foreground shadow-accent"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
