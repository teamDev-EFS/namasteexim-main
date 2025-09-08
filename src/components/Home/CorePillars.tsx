import React, { useRef, useEffect, useState } from "react";
import { Award, Clock, Globe } from "lucide-react";

const CorePillars: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      icon: Award,
      title: "Superior Quality",
      description:
        "Hand-selected premium products meeting international standards",
      animation: "translate-y-0",
      delay: "delay-0",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description:
        "Global logistics network ensuring on-time worldwide delivery",
      animation: "translate-y-0",
      delay: "delay-200",
    },
    {
      icon: Globe,
      title: "Global Satisfaction",
      description: "Trusted by importers across 1+ countries worldwide",
      animation: "translate-y-0",
      delay: "delay-400",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Why Choose <span className="text-amber-600">Namaste EXIM</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Three decades of excellence in agricultural exports, built on trust,
            quality, and global partnerships
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                isVisible ? pillar.animation : "translate-y-12 opacity-0"
              } ${pillar.delay}`}
            >
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <pillar.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorePillars;
