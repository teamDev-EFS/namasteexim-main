import React from "react";
import { Link } from "react-router-dom";
import {
  Handshake,
  Globe,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import GlobalFoodsImage from "../assets/images/globalfoods.jpg";
import MiddleEastMapImage from "../assets/images/Middle-East-Map.jpg";
import AsiaPacificImage from "../assets/images/asia-pacific.png";
import { motion } from "framer-motion";

const PartnershipsPage: React.FC = () => {
  const benefits = [
    {
      icon: Globe,
      title: "Global Network Access",
      description:
        "Join our network of 500+ partners worldwide and access new markets",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Market Growth Support",
      description:
        "Expert guidance for market expansion and business development",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Users,
      title: "Dedicated Account Management",
      description: "Personal relationship manager for your business needs",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Guaranteed premium quality with every shipment",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const partnershipTypes = [
    {
      title: "Distributor Partnership",
      description: "Become our authorized distributor in your region",
      features: [
        "Exclusive territory rights",
        "Marketing support and materials",
        "Training and product knowledge",
        "Competitive pricing structure",
      ],
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Joint Venture",
      description: "Collaborate on large-scale projects and market development",
      features: [
        "Shared investment opportunities",
        "Risk and reward sharing",
        "Joint marketing initiatives",
        "Long-term strategic planning",
      ],
      icon: Handshake,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Supply Chain Partnership",
      description: "Integrate into our global supply chain network",
      features: [
        "Reliable sourcing solutions",
        "Quality control integration",
        "Logistics optimization",
        "Cost-effective operations",
      ],
      icon: TrendingUp,
      color: "from-amber-500 to-amber-600",
    },
  ];

  const successStories = [
    {
      company: "Global Foods Ltd.",
      country: "United Kingdom",
      partnership: "Distributor Partnership",
      story:
        "Increased market share by 40% in 2 years through our premium rice portfolio",
      image: GlobalFoodsImage,
    },
    {
      company: "Middle East Trading Co.",
      country: "UAE",
      partnership: "Joint Venture",
      story: "Successfully launched 15 new products in the GCC market",
      image: MiddleEastMapImage,
    },
    {
      company: "Asia Pacific Imports",
      country: "Singapore",
      partnership: "Supply Chain Partnership",
      story:
        "Reduced operational costs by 25% while improving quality standards",
      image: AsiaPacificImage,
    },
  ];

  const stats = [
    { icon: Users, value: "10+", label: "Global Partners" },
    { icon: Globe, value: "1+", label: "Countries" },
    { icon: TrendingUp, value: "40%", label: "Average Growth" },
    { icon: Star, value: "4.9/5", label: "Partner Rating" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
            Build Global <span className="text-amber-400">Partnerships</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Let's create lasting business relationships that drive mutual growth
            and success. Join our network of successful global partners.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10 text-emerald-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Why Partner With <span className="text-emerald-600">Us?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a network of successful global partners and discover the
              opportunities that await in India's agricultural export market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Partnership <span className="text-emerald-600">Models</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the partnership model that best fits your business goals
              and market strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partnershipTypes.map((type, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 mb-6 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {type.description}
                </p>
                <ul className="space-y-3">
                  {type.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Success <span className="text-emerald-600">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our partners have achieved remarkable growth and
              success through strategic partnerships with Namaste EXIM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.company}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {story.company}
                    </h3>
                    <p className="text-amber-300 text-sm">{story.country}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {story.partnership}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{story.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Partnership <span className="text-emerald-600">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to start your partnership journey with Namaste EXIM.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                step: 1,
                title: "Initial Contact",
                desc: "Reach out to discuss partnership opportunities",
              },
              {
                step: 2,
                title: "Assessment",
                desc: "We evaluate mutual fit and opportunities",
              },
              {
                step: 3,
                title: "Agreement",
                desc: "Finalize partnership terms and conditions",
              },
              {
                step: 4,
                title: "Launch",
                desc: "Begin your successful partnership journey",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-sm">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Ready to Start Your{" "}
            <span className="text-amber-400">Partnership?</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Let's discuss how we can work together to achieve mutual success and
            expand your business in the global agricultural market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="mailto:namasteeximventures@gmail.com?subject=Partnership Inquiry - Namaste EXIM Ventures&body=Dear Namaste EXIM Ventures Team,%0D%0A%0D%0AI hope this email finds you well. I am interested in exploring partnership opportunities with your company.%0D%0A%0D%0ACompany Information:%0D%0A- Company Name: [Your Company Name]%0D%0A- Industry: [Your Industry]%0D%0A- Location: [Your Location]%0D%0A- Website: [Your Website]%0D%0A%0D%0APartnership Interest:%0D%0A- Type of Partnership: [Distributor/Supplier/Agent/Other]%0D%0A- Products of Interest: [Specific products you're interested in]%0D%0A- Target Markets: [Your target markets]%0D%0A- Expected Volume: [Monthly/Annual volume requirements]%0D%0A%0D%0AAdditional Information:%0D%0A[Please provide any additional details about your business, experience, or specific requirements]%0D%0A%0D%0AThank you for your time and consideration. I look forward to hearing from you soon.%0D%0A%0D%0ABest regards,%0D%0A[Your Name]%0D%0A[Your Title]%0D%0A[Your Company]%0D%0A[Your Contact Information]"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Send Email</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnershipsPage;
