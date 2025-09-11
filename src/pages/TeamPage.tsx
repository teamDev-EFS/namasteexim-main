import React from "react";
import {
  Linkedin,
  Mail,
  Phone,
  Award,
  Users,
  Globe,
  TrendingUp,
  Instagram,
  Youtube,
} from "lucide-react";

const TeamPage: React.FC = () => {
  const leadership = [
    {
      name: "Dr. Deepali Meshram",
      position: "Managing Director",
      image: "/images/deepali-meshram.jpg",
      bio: "Leading expert in agricultural exports with extensive experience in international trade and quality management. Dr. Deepali brings strategic vision and deep industry knowledge to drive Namaste EXIM's global expansion.",
      expertise: [
        "Strategic Leadership",
        "International Trade",
        "Quality Management",
      ],
      contact: {
        email: "deepali@namasteeximventures.com",
        phone: "+91-7806070556",
        linkedin:
          "https://www.linkedin.com/in/namaste-exim-ventures-1b1667377/",
        instagram:
          "https://www.instagram.com/namaste_exim_ventures?igsh=dm9hanFhMmhsNWR1",
        youtube: "https://www.youtube.com/@NamasteEximVentures",
      },
    },
    {
      name: "Dr. Ankit Meshram",
      position: "Managing Director",
      image: "/images/ankit-meshram.jpg",
      bio: "Specialist in supply chain optimization and business development. Dr. Ankit oversees operations and ensures seamless delivery across global markets while maintaining the highest quality standards.",
      expertise: ["Supply Chain", "Business Development", "Operations"],
      contact: {
        email: "ankit@namasteeximventures.com",
        phone: "+91-7806070556",
        linkedin:
          "https://www.linkedin.com/in/namaste-exim-ventures-1b1667377/",
        instagram:
          "https://www.instagram.com/namaste_exim_ventures?igsh=dm9hanFhMmhsNWR1",
        youtube: "https://www.youtube.com/@NamasteEximVentures",
      },
    },
    {
      name: "Ananya Meshram",
      position: "Managing Director",
      image: "/images/anaya-meshram.jpg",
      bio: "Expert in customer relations and market expansion. Ananya leads our customer success initiatives and drives partnerships that create lasting value for our global clients and partners.",
      expertise: ["Customer Relations", "Market Expansion", "Partnerships"],
      contact: {
        email: "ananya@namasteeximventures.com",
        phone: "+91-7806070556",
        linkedin:
          "https://www.linkedin.com/in/namaste-exim-ventures-1b1667377/",
        instagram:
          "https://www.instagram.com/namaste_exim_ventures?igsh=dm9hanFhMmhsNWR1",
        youtube: "https://www.youtube.com/@NamasteEximVentures",
      },
    },
  ];

  const departments = [
    {
      name: "Export Operations",
      icon: Globe,
      description: "Managing international shipments and trade compliance",
      teamSize: "15+ professionals",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Quality Control",
      icon: Award,
      description: "Ensuring product quality and safety standards",
      teamSize: "12+ specialists",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      name: "Business Development",
      icon: TrendingUp,
      description: "Expanding global partnerships and market reach",
      teamSize: "10+ executives",
      color: "from-amber-500 to-amber-600",
    },
    {
      name: "Customer Support",
      icon: Users,
      description: "Providing exceptional service to global clients",
      teamSize: "20+ representatives",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const stats = [
    { icon: Users, value: "15+", label: "Team Members" },
    { icon: Globe, value: "1+", label: "Countries Served" },
    { icon: Award, value: "25+", label: "Years Combined Experience" },
    { icon: TrendingUp, value: "95%", label: "Customer Satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
            Meet Our <span className="text-amber-400">Team</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            The passionate professionals behind Namaste EXIM's success,
            dedicated to connecting India's finest agricultural products with
            global markets.
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

      {/* Leadership Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Leadership <span className="text-emerald-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the visionary leaders who guide our company's growth and
              shape our mission to become the world's most trusted agricultural
              export partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-amber-300 font-semibold text-lg">
                      {leader.position}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {leader.bio}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Expertise:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <a
                          href={`mailto:${leader.contact.email}?subject=Business Inquiry - ${leader.name}&body=Dear ${leader.name},%0D%0A%0D%0AI hope this email finds you well. I am reaching out regarding a potential business opportunity with Namaste EXIM Ventures.%0D%0A%0D%0A[Please provide details about your inquiry, requirements, or partnership interest]%0D%0A%0D%0AThank you for your time and consideration.%0D%0A%0D%0ABest regards,%0D%0A[Your Name]%0D%0A[Your Company]%0D%0A[Your Contact Information]`}
                          className="text-emerald-600 hover:text-emerald-700 transition-colors group relative"
                          title="Send email to this team member"
                        >
                          <Mail className="w-5 h-5" />
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Email {leader.name}
                          </div>
                        </a>
                        <a
                          href={`tel:${leader.contact.phone}`}
                          className="text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          <Phone className="w-5 h-5" />
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <a
                          href={leader.contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                          href={leader.contact.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-pink-600 transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a
                          href={leader.contact.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Youtube className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Our <span className="text-emerald-600">Departments</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized teams working together to deliver excellence in every
              aspect of our agricultural export operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${dept.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <dept.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {dept.name}
                </h3>
                <p className="text-gray-600 mb-3 leading-relaxed">
                  {dept.description}
                </p>
                <div className="text-sm font-semibold text-emerald-600">
                  {dept.teamSize}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                Our <span className="text-emerald-600">Culture</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  At Namaste EXIM, we foster a culture of excellence,
                  innovation, and collaboration. Our team members are passionate
                  about agriculture and committed to delivering the highest
                  quality products to our global clients.
                </p>
                <p>
                  We believe in continuous learning and professional
                  development, encouraging our team to stay updated with the
                  latest industry trends and best practices in international
                  trade.
                </p>
                <p>
                  Our inclusive work environment celebrates diversity and
                  promotes teamwork, ensuring that every voice is heard and
                  valued in our journey towards global success.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-2xl">
                <div
                  className="w-full h-full bg-cover bg-center rounded-2xl opacity-80"
                  style={{
                    backgroundImage:
                      'url("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Join Our <span className="text-amber-400">Team</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Are you passionate about agriculture and global trade? We're always
            looking for talented professionals to join our growing team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careers@namasteeximventures.com"
              className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
            >
              Send Your Resume
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300"
            >
              Contact HR Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
