import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { RatingSummary, ReviewCard } from '@/components/Reviews';
import { useSEO } from '@/hooks/useSEO';
import { buyerRating, buyerReviews } from '@/data/company';

const ReviewsPage = () => {
  useSEO({
    title: 'Buyer Reviews & Ratings | Mechatronics Technology',
    description: `Mechatronics Technology is rated ${buyerRating.score}/5 by ${buyerRating.count} buyers on IndiaMART. Read ratings and reviews from buyers across India.`,
    path: '/reviews',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="Buyer reviews"
        subtitle="Ratings and reviews left by our buyers on IndiaMART."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Reviews' }]}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="sr-only">All buyer reviews</h2>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-5 items-start">
            <RatingSummary />
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {buyerReviews.map((review) => (
                <ReviewCard key={`${review.name}-${review.date}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReviewsPage;
