
export default function OurServicesSection() {
    const services = [
      {
        icon: "🚐",
        title: "Hire a vehicle",
        description:
          "Book a land cruiser for tough terrains or a safari van to cruise in a game drive.",
      },
      {
        icon: "👰‍♀️",
        title: "The Best Weddings",
        description:
          "Need a venue for your wedding? Don't worry we've got your back.",
      },
      {
        icon: "🛌",
        title: "Accommodation",
        description:
          "Choose among the best suites. We have both budgeted and luxury options.",
      },
      {
        icon: "📝",
        title: "Make Your Own Trip",
        description:
          "Build your own adventure by specifying your preferences. We'll make it happen",
      },
    ];
  
    
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-lightmode-bg-color dark:bg-darkmode-bg-color">
        {/* <div className="absolute inset-0 bg-[url('')] bg-cover bg-center opacity-20"></div> */}
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-lightmode-heading-color dark:text-darkmode-heading-color mb-4">
              Traveling Services You Can Rely On
            </h2>
          
            
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                
                className={`
                  p-6 rounded-xl border overflow-hidden  
                  bg-lightmode-glass-card-bg-color      
                  dark:bg-darkmode-glass-card-bg-color  
                  border-lightmode-glass-card-border-color 
                  dark:border-darkmode-glass-card-border-color
                  backdrop-blur-lg                     
                  shadow-[var(--lightmodeglassoutershadow)]
                  dark:shadow-[var(--darkmodeglassoutershadow)]
                  transition-transform duration-300 transform hover:-translate-y-2
                `}
                >
                
                <div className="text-4xl mb-4 text-green-500">{service.icon}</div>
  
                <h3 className="text-xl font-semibold text-lightmode-heading-color dark:text-darkmode-heading-color mb-2">
                  {service.title}
                </h3>
  
                <p className="text-lightmode-text-color dark:text-darkmode-text-color text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }