import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - AplusHustler</title>
        <meta name="description" content="AplusHustler's privacy policy explains how we collect, use, and protect your personal information." />
      </Helmet>

      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Privacy <span className="text-gradient-gold">Policy</span>
            </h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

            <div className="prose prose-invert prose-lg space-y-8">
              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Information We Collect</h2>
                <p className="text-muted-foreground">
                  We collect information you provide directly to us, such as when you subscribe to our newsletter, contact us, or interact with our content. This may include your name, email address, and any other information you choose to provide.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground">
                  We use the information we collect to provide, maintain, and improve our services, send you updates and educational content, respond to your comments and questions, and analyze how our website is used.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Cookies and Analytics</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. We also use Google Analytics to help us understand how visitors interact with our website.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground">
                  We may use third-party services such as Google AdSense to display advertisements. These services may use cookies to serve ads based on your prior visits to our website or other websites.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Data Security</h2>
                <p className="text-muted-foreground">
                  We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us via Telegram at @Aplus_info or email at contact@aplushustler.com.
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

export default Privacy;
