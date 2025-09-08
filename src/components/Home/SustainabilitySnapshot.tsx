import React, { useRef, useEffect, useState } from 'react';
import { Leaf, Users, Award, Shield } from 'lucide-react';

const SustainabilitySnapshot: React.FC = () => {
  const [counters, setCounters] = useState({
    farmers: 0,
    chemicals: 0,
    certifications: 0,
    years: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const targetValues = {
    farmers: 5000,
    chemicals: 100,
    certifications: 15,
    years: 30
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounters({
        farmers: Math.floor(targetValues.farmers * progress),
        chemicals: Math.floor(targetValues.chemicals * progress),
        certifications: Math.floor(targetValues.certifications * progress),
        years: Math.floor(targetValues.years * progress)
      });

      if (step >= steps) {
        clearInterval(interval);
        setCounters(targetValues);
      }
    }, stepDuration);
  };

  const stats = [
    {
      icon: Users,
      value: counters.farmers.toLocaleString(),
      label: 'Farmers Supported',
      suffix: '+'
    },
    {
      icon: Shield,
      value: counters.chemicals,
      label: 'Chemical-Free Sourcing',
      suffix: '%'
    },
    {
      icon: Award,
      value: counters.certifications,
      label: 'Global Certifications',
      suffix: '+'
    },
    {
      icon: Leaf,
      value: counters.years,
      label: 'Years of Excellence',
      suffix: '+'
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1920")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Sustainability & <span className="text-amber-400">Ethics</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Committed to ethical sourcing, environmental responsibility, and supporting farming communities
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}{stat.suffix}
              </div>
              <p className="text-gray-300 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">100% Ethical Sourcing</h3>
            <p className="text-gray-300">Direct partnerships with farmers ensuring fair trade practices</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Zero Harmful Chemicals</h3>
            <p className="text-gray-300">Natural farming methods preserving soil and water quality</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Fair Trade Certified</h3>
            <p className="text-gray-300">Supporting sustainable livelihoods in rural communities</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySnapshot;