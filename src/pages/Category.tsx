import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import CategoryFilter from '@/components/CategoryFilter';
import { getPostsByCategory, categories } from '@/data/blogData';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const posts = getPostsByCategory(categoryId || 'all');
  const category = categories.find(c => c.id === categoryId);

  return (
    <>
      <Helmet>
        <title>{category ? `${category.name} Guides` : 'All Posts'} - AplusHustler</title>
        <meta name="description" content={`Browse our ${category?.name || 'complete'} collection of no investment guides and tutorials for smart hustlers.`} />
      </Helmet>

      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {category ? (
                <>
                  {category.icon} <span className="text-gradient-gold">{category.name}</span> Guides
                </>
              ) : (
                'All Articles'
              )}
            </h1>
            <p className="text-muted-foreground text-lg">
              {category ? `Explore our ${category.name.toLowerCase()} education resources` : 'Browse all our free educational content'}
            </p>
          </div>

          <CategoryFilter activeCategory={categoryId || 'all'} />

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No posts found in this category yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Category;
