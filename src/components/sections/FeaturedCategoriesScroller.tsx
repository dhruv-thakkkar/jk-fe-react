import { listCategories } from '@/lib/api';
import { SectionHeader } from '../ui/SectionHeader';
import { HorizontalScroller } from '../ui/HorizontalScroller';
import { ScrollCard } from '../ui/ScrollCard';

export async function FeaturedCategoriesScroller() {
  const categories = await listCategories({ isFeatured: true });

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-light">
      <div className="container">
        <SectionHeader eyebrow="Browse by categories" title="Featured Categories" subtitle="Find a holiday style that fits you" />
        <HorizontalScroller>
          {categories.map((category) => (
            <ScrollCard
              key={category.id}
              href={`/packages?categoryId=${category.id}`}
              imageUrl={category.imageUrl}
              title={category.name}
            />
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}
