import { Handshake, Package, ShieldCheck, Truck } from 'lucide-react';

const reasons = [
  { icon: ShieldCheck, title: 'Quality assured', desc: 'Instruments chosen for ease of use and long life.' },
  { icon: Truck, title: 'Timely deliveries', desc: 'Shipped by road to buyers across India.' },
  { icon: Handshake, title: 'Transparent dealings', desc: 'GST-registered and trading since 2018.' },
  { icon: Package, title: 'Careful packing', desc: 'Packed in standard corrugated boxes.' },
];

const WhyUs = () => (
  <section id="why-us" className="relative py-14 md:py-16">
    <div className="container mx-auto px-4 md:px-8">
      <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6 md:mb-8">Why buy from us</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">
        {reasons.map((reason) => (
          <li key={reason.title} className="flex gap-3">
            <reason.icon className="w-6 h-6 mt-0.5 text-primary shrink-0" aria-hidden="true" />
            <div>
              <h3 className="font-display font-bold text-lg leading-snug text-foreground">{reason.title}</h3>
              <p className="font-barlow text-sm text-muted-foreground leading-relaxed mt-0.5">{reason.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default WhyUs;
