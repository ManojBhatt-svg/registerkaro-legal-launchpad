
const stats = [
  {
    id: 1,
    label: 'Trademarks Registered',
    value: '10,000+',
  },
  {
    id: 2,
    label: 'Satisfied Clients',
    value: '8,500+',
  },
  {
    id: 3,
    label: 'Success Rate',
    value: '97%',
  },
  {
    id: 4,
    label: 'Years of Experience',
    value: '10+',
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-brand-orange">{stat.value}</p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
