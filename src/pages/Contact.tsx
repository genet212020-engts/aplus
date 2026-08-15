import { Helmet } from 'react-helmet-async';
import { Mail, Send, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - AplusHustler</title>
        <meta name="description" content="Get in touch with AplusHustler. We'd love to hear from you about collaborations, questions, or feedback." />
      </Helmet>

      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get in <span className="text-gradient-gold">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions, feedback, or collaboration ideas? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Info</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Telegram</h3>
                    <a href="https://t.me/Aplus_info" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      @Aplus_info
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">contact@aplushustler.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground">Ethiopia & Worldwide</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-card border border-border rounded-xl">
                <h3 className="font-display font-bold text-foreground mb-2">Fastest Response</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  For the quickest response, reach out to us directly on Telegram.
                </p>
                <a href="https://t.me/Aplus_info" target="_blank" rel="noopener noreferrer">
                  <Button variant="gold" className="w-full">Open Telegram</Button>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <Input id="name" placeholder="Your name" required className="bg-card border-border" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input id="email" type="email" placeholder="your@email.com" required className="bg-card border-border" />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <Input id="subject" placeholder="What's this about?" required className="bg-card border-border" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <Textarea id="message" placeholder="Your message..." rows={5} required className="bg-card border-border" />
                </div>

                <Button type="submit" variant="gold" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
