import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Mehta",
      location: "Mumbai",
      rating: 5,
      text: "Amazing craftsmanship! The marble mandir exceeded our expectations. The attention to detail is remarkable, and it has become the centerpiece of our pooja room.",
    },
    {
      id: 2,
      name: "Rajesh Agarwal",
      location: "Delhi",
      rating: 5,
      text: "We ordered a custom Ganesh idol for our new home. The quality is outstanding, and the delivery was safe and on time. Highly recommend StoneAura Studio!",
    },
    {
      id: 3,
      name: "Sunita Sharma",
      location: "Bangalore",
      rating: 5,
      text: "Beautiful work! The temple design team understood exactly what we wanted. The final piece is absolutely stunning. Will definitely order again.",
    },
    {
      id: 4,
      name: "Vikram Patel",
      location: "Ahmedabad",
      rating: 5,
      text: "Professional service from start to finish. The marble quality is exceptional, and the gold polish finish looks luxurious. Perfect addition to our home.",
    },
    {
      id: 5,
      name: "Anita Reddy",
      location: "Hyderabad",
      rating: 5,
      text: "Ordered wall murals for our temple room. The craftsmanship speaks for itself. Truly a work of art that our family will treasure for generations.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-medium tracking-widest text-primary uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-serif mt-4 mb-4">
            What Our <span className="text-gradient-gold">Customers Say</span>
          </h2>
          <p className="text-muted-foreground">
            Trusted by families across India for their sacred spaces
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground/80 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional testimonials in smaller format */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {testimonials.slice(3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card/50 rounded-xl p-4 border border-border flex gap-4 items-start"
            >
              <div className="flex gap-0.5 flex-shrink-0">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                ))}
              </div>
              <div>
                <p className="text-sm text-foreground/80 mb-2">"{testimonial.text}"</p>
                <p className="text-xs text-muted-foreground">
                  — {testimonial.name}, {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
