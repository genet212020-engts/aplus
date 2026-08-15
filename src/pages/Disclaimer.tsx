import { Helmet } from 'react-helmet-async';
import { AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Disclaimer = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer - AplusHustler</title>
        <meta name="description" content="Important disclaimer regarding the educational content on AplusHustler website." />
      </Helmet>

      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                <span className="text-gradient-gold">Disclaimer</span>
              </h1>
            </div>
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

            <div className="bg-card border border-primary/30 rounded-xl p-6 mb-8">
              <p className="text-foreground font-semibold">
                ⚠️ IMPORTANT: All content on AplusHustler.com is for educational purposes only and should NOT be considered financial advice.
              </p>
            </div>

            <div className="prose prose-invert prose-lg space-y-8">
              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">No Financial Guarantees</h2>
                <p className="text-muted-foreground">
                  AplusHustler.com makes no guarantees of income, success, or financial gains. Results from implementing any strategies or information found on this website will vary based on individual circumstances, market conditions, and many other factors.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Investment Risks</h2>
                <p className="text-muted-foreground">
                  Cryptocurrency, stocks, and other investments carry inherent risks including the potential loss of principal. You should never invest money you cannot afford to lose. Past performance does not guarantee future results.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Do Your Own Research</h2>
                <p className="text-muted-foreground">
                  Before making any financial decisions, always conduct your own thorough research. Verify information from multiple sources and consider consulting with a licensed financial advisor who can provide personalized advice based on your specific situation.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Third-Party Links</h2>
                <p className="text-muted-foreground">
                  Our website may contain links to third-party websites or services. We are not responsible for the content, accuracy, or practices of these external sites. Accessing them is at your own risk.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Personal Responsibility</h2>
                <p className="text-muted-foreground">
                  You are solely responsible for any decisions or actions you take based on the information provided on this website. AplusHustler.com and its creators are not liable for any losses or damages resulting from the use of this information.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Content Accuracy</h2>
                <p className="text-muted-foreground">
                  While we strive to provide accurate and up-to-date information, we cannot guarantee that all content is free from errors or omissions. Markets change rapidly, and information may become outdated quickly.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Disclaimer;
