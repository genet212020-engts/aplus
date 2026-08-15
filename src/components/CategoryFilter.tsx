import { Link } from 'react-router-dom';
import { categories } from '@/data/blogData';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory?: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8 rounded-2xl border border-border/60 bg-card/40 p-2 backdrop-blur-md w-fit mx-auto">
      {onSelectCategory ? (
        <button
          onClick={() => onSelectCategory('all')}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
            activeCategory === 'all'
              ? "bg-primary text-primary-foreground shadow-[0_8px_24px_-12px_hsl(var(--primary))]"
              : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
          )}
        >
          All Posts
        </button>
      ) : (
        <Link
          to="/blog"
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
            activeCategory === 'all'
              ? "bg-primary text-primary-foreground shadow-[0_8px_24px_-12px_hsl(var(--primary))]"
              : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
          )}
        >
          All Posts
        </Link>
      )}

      {categories.map((category) =>
        onSelectCategory ? (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground shadow-[0_8px_24px_-12px_hsl(var(--primary))]"
                : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
            )}
          >
            {category.icon} {category.name}
          </button>
        ) : (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground shadow-[0_8px_24px_-12px_hsl(var(--primary))]"
                : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
            )}
          >
            {category.icon} {category.name}
          </Link>
        )
      )}
    </div>
  );
};

export default CategoryFilter;
