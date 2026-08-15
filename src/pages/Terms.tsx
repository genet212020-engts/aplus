import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - AplusHustler</title>
        <meta name="description" content="Terms and conditions for using AplusHustler website and services." />
      </Helmet>

      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Terms & <span className="text-gradient-gold">Conditions</span>
            </h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

            <div className="prose prose-invert prose-lg space-y-8">
              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using AplusHustler.com, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Educational Purpose</h2>
                <p className="text-muted-foreground">
                  All content on this website is provided for educational and informational purposes only. Nothing on this website should be construed as financial, investment, or trading advice.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">No Financial Advice</h2>
                <p className="text-muted-foreground">
                  AplusHustler.com does not provide personalized financial advice. You should always conduct your own research and consult with qualified professionals before making any financial decisions.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content on this website, including text, graphics, logos, and images, is the property of AplusHustler.com and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">User Conduct</h2>
                <p className="text-muted-foreground">
                  You agree to use this website only for lawful purposes and in a way that does not infringe upon the rights of others or restrict or inhibit their use of the website.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  AplusHustler.com shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of this website or reliance on any information provided.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Your continued use of the website after any changes constitutes acceptance of the new terms.
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

export default Terms;
