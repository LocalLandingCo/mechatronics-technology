import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Phone, MapPin, Mail, Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || 'Not provided',
      message: formData.get('message') as string,
    };

    setLoading(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 200) {
        toast({ title: 'Message Sent!', description: "We'll get back to you shortly." });
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to send message. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-14 md:py-20 noise-bg overflow-hidden" ref={ref}>
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="font-barlow text-xs tracking-widest text-primary uppercase">Get In Touch</span>
          <h2 className="font-rajdhani font-bold text-3xl md:text-4xl lg:text-5xl mt-3 text-foreground">
            Contact <span className="text-primary">Us</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`space-y-5 ${isVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Input name="name" placeholder="Your Name" required className="bg-card/50 border-border font-barlow" />
              <Input name="email" type="email" placeholder="Email Address" required className="bg-card/50 border-border font-barlow" />
            </div>
            <Input name="phone" type="tel" placeholder="Phone Number" className="bg-card/50 border-border font-barlow" />
            <Textarea name="message" placeholder="Your Message" rows={5} required className="bg-card/50 border-border font-barlow resize-none" />
            <button
              type="submit"
              disabled={loading}
              className="font-rajdhani font-semibold flex items-center gap-2 px-7 py-3 rounded bg-primary text-primary-foreground hover:brightness-110 transition-all cyan-glow disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>

          {/* Info */}
          <div className={`space-y-6 ${isVisible ? 'animate-fade-up delay-400' : 'opacity-0'}`}>
            <div className="bg-card/50 backdrop-blur border border-border rounded-lg p-6 space-y-5">
              <h3 className="font-rajdhani font-bold text-xl text-foreground">Mechatronics Technology</h3>
              <p className="font-barlow text-sm text-muted-foreground">
                Wholesale distributor & trader of precision sensing and measurement instruments for Indian industry.
              </p>

              <div className="space-y-4 pt-2">
                <a href="tel:+918237813940" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-barlow text-sm text-foreground">+91 82378 13940</div>
                    <div className="font-barlow text-xs text-muted-foreground">Call us anytime</div>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-barlow text-sm text-foreground">Kolhapur, Maharashtra</div>
                    <div className="font-barlow text-xs text-muted-foreground">India</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-barlow text-sm text-foreground">info@mechtec.in</div>
                    <div className="font-barlow text-xs text-muted-foreground">Email us</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
