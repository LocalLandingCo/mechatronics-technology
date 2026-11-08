import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Phone, MapPin, Mail, Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { catalogue } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
const WHATSAPP_NUMBER = '918237813940';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello, I would like to know more about your products.')}`;

const labelClass = 'font-barlow text-sm text-foreground';
const fieldClass = 'bg-card/50 border-border font-barlow';

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      toast({
        title: 'Form not configured',
        description: 'Please call or WhatsApp us directly — the online form is being set up.',
        variant: 'destructive',
      });
      return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: 'New quote request from mechtec.in',
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || 'Not provided',
      company: (formData.get('company') as string) || 'Not provided',
      product: formData.get('product') as string,
      capacity_or_range: (formData.get('range') as string) || 'Not provided',
      quantity: (formData.get('quantity') as string) || 'Not provided',
      required_by: (formData.get('requiredBy') as string) || 'Not provided',
      message: (formData.get('message') as string) || 'Not provided',
    };

    setLoading(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 200) {
        toast({ title: 'Quote request sent', description: 'We typically respond within one business day.' });
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      toast({ title: 'Error', description: 'Your request was not sent. Try again, or call +91 82378 13940.', variant: 'destructive' });
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
            Request a <span className="text-primary">Quote</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`space-y-5 ${isVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="quote-name" className={labelClass}>Name *</Label>
                <Input id="quote-name" name="name" autoComplete="name" required className={fieldClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-email" className={labelClass}>Work email *</Label>
                <Input id="quote-email" name="email" type="email" autoComplete="email" required className={fieldClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-company" className={labelClass}>Company</Label>
                <Input id="quote-company" name="company" autoComplete="organization" className={fieldClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-phone" className={labelClass}>Phone</Label>
                <Input id="quote-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-product" className={labelClass}>Product *</Label>
                <select
                  id="quote-product"
                  name="product"
                  required
                  defaultValue=""
                  className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm text-foreground ${fieldClass}`}
                >
                  <option value="" disabled>Select a product</option>
                  {catalogue.map((category) => (
                    <optgroup key={category.id} label={category.title}>
                      {category.products.map((product) => (
                        <option key={product.slug} value={product.title}>{product.title}</option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="Not sure, need advice">Not sure, need advice</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-range" className={labelClass}>Capacity or range</Label>
                <Input id="quote-range" name="range" placeholder="e.g. 500 Nm" className={fieldClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-quantity" className={labelClass}>Quantity</Label>
                <Input id="quote-quantity" name="quantity" inputMode="numeric" className={fieldClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-required-by" className={labelClass}>Needed by</Label>
                <Input id="quote-required-by" name="requiredBy" placeholder="e.g. within 4 weeks" className={fieldClass} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-message" className={labelClass}>Application details</Label>
              <Textarea id="quote-message" name="message" rows={4} className={`${fieldClass} resize-none`} />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="font-rajdhani font-semibold flex items-center gap-2 px-7 py-3 rounded bg-primary text-primary-foreground hover:brightness-110 transition-all cyan-glow disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {loading ? 'Sending...' : 'Request Quote'}
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
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <div>
                    <div className="font-barlow text-sm text-foreground">+91 82378 13940</div>
                    <div className="font-barlow text-xs text-muted-foreground">Chat on WhatsApp</div>
                  </div>
                </a>

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

                <a href="mailto:info@mechtec.in" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-barlow text-sm text-foreground">info@mechtec.in</div>
                    <div className="font-barlow text-xs text-muted-foreground">Email us</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
