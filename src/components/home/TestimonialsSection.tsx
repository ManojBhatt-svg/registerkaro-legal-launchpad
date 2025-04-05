
const testimonials = [
  {
    id: 1,
    content: "RegisterKaro made trademark registration incredibly simple. Their team guided me through the entire process, and I received my trademark in record time. Highly recommended!",
    author: "Priya Sharma",
    role: "Founder, DesignCraft Studio",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    id: 2,
    content: "As a first-time entrepreneur, I was unsure about the legal requirements. RegisterKaro not only helped with my company registration but also provided valuable advice on protecting my brand.",
    author: "Rahul Mehta",
    role: "CEO, TechInnovate Solutions",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    content: "The attention to detail and personalized service from RegisterKaro was exceptional. They made the complex process of trademark registration feel effortless.",
    author: "Anjali Desai",
    role: "Creative Director, Artisan Foods",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-brand-blue text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-blue-100">
            We've helped thousands of businesses protect their brands and comply with regulations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg hover:bg-opacity-20 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-blue-200">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4 text-blue-50">
                <svg className="h-6 w-6 text-brand-orange mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
                <p>{testimonial.content}</p>
              </div>
              <div className="flex text-brand-orange">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
