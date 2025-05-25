import { Contact, MapPin, Phone, Mail, Send, Clock, MessageSquare, User, Sparkles } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.", {
        duration: 4000,
        style: {
          background: '#10b981',
          color: 'white',
        },
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: ["1/11 Allenbari Staff Quarter", "Dhaka, Bangladesh"],
      color: "from-purple-500 to-blue-500",
      bgColor: "from-purple-500/10 to-blue-500/10",
      delay: "0ms"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: ["+880 017-1716-0829", "Mon-Sat 9AM-8PM"],
      color: "from-green-500 to-teal-500",
      bgColor: "from-green-500/10 to-teal-500/10",
      delay: "100ms"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: ["contact@bookshopbd.com", "We reply within 24 hours"],
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/10 to-red-500/10",
      delay: "200ms"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-bounce">
                <Contact className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Get in Touch
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our books or services? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  We're Here to Help
                </h2>
                <p className="text-gray-600">
                  Reach out to us through any of these channels and we'll respond as quickly as possible.
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={`group flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1`}
                  style={{ animationDelay: info.delay }}
                >
                  <div className={`flex-shrink-0 p-4 bg-gradient-to-r ${info.bgColor} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className={`w-6 h-6 bg-gradient-to-r ${info.color} bg-clip-text text-transparent`} 
                      style={{ WebkitTextStroke: '1.5px', WebkitTextStrokeColor: info.color.includes('purple') ? '#9333ea' : info.color.includes('green') ? '#10b981' : '#f97316' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
                      {info.title}
                    </h3>
                    {info.content.map((line, i) => (
                      <p key={i} className="mt-1 text-gray-600">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Business Hours Card */}
              <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Business Hours</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">11:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                  Send us a Message
                </h2>
              </div>

              <div className="space-y-5">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className={`h-5 w-5 transition-colors duration-200 ${focusedField === 'name' ? 'text-purple-600' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 transition-colors duration-200 ${focusedField === 'email' ? 'text-purple-600' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {formData.message.length}/500
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-[1.02] hover:shadow-lg active:scale-95'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Map Section */}
            <div className="mt-16">
            <div className="bg-white p-6 rounded-2xl shadow-2xl">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-purple-600" />
                  Find Our Location
                </h3>
                <p className="text-gray-600 mt-2">Visit our bookshop at Allenbari Staff Quarter, Dhaka</p>
              </div>
              
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden h-96 border-2 border-gray-200">
                {/* Demo Map with Interactive Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50">
                  {/* Street Grid */}
                  <svg className="absolute inset-0 w-full h-full opacity-30">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#9CA3AF" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                  
                  {/* Roads */}
                  <div className="absolute top-1/2 left-0 w-full h-3 bg-gray-300 transform -translate-y-1/2"></div>
                  <div className="absolute left-1/2 top-0 w-3 h-full bg-gray-300 transform -translate-x-1/2"></div>
                  
                  {/* Buildings */}
                  <div className="absolute top-16 left-16 w-12 h-12 bg-blue-200 rounded shadow-md border border-blue-300"></div>
                  <div className="absolute top-32 left-32 w-16 h-10 bg-green-200 rounded shadow-md border border-green-300"></div>
                  <div className="absolute bottom-20 right-20 w-14 h-14 bg-yellow-200 rounded shadow-md border border-yellow-300"></div>
                  <div className="absolute bottom-32 left-20 w-10 h-16 bg-red-200 rounded shadow-md border border-red-300"></div>
                  
                  {/* Our Bookshop Location - Animated Marker */}
                  <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      {/* Pulsing circle */}
                      <div className="absolute inset-0 w-12 h-12 bg-purple-500 rounded-full animate-ping opacity-20"></div>
                      <div className="absolute inset-0 w-8 h-8 bg-purple-500 rounded-full animate-pulse opacity-40 top-2 left-2"></div>
                      
                      {/* Main marker */}
                      <div className="relative bg-purple-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-200 cursor-pointer">
                        <MapPin className="w-6 h-6" />
                      </div>
                      
                      {/* Info popup */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-3 rounded-lg shadow-lg border-2 border-purple-200 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <div className="text-sm font-semibold text-gray-900">BookShop BD</div>
                        <div className="text-xs text-gray-600">1/11 Allenbari Staff Quarter</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-200"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Nearby landmarks */}
                  <div className="absolute top-1/4 left-1/4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="text-xs text-green-700 mt-1 font-medium">Park</div>
                  </div>
                  
                  <div className="absolute bottom-1/4 right-1/4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="text-xs text-blue-700 mt-1 font-medium">School</div>
                  </div>
                  
                  {/* Navigation Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button className="bg-white p-2 rounded shadow-md hover:bg-gray-50 transition-colors">
                      <div className="w-4 h-4 flex items-center justify-center text-gray-600 font-bold">+</div>
                    </button>
                    <button className="bg-white p-2 rounded shadow-md hover:bg-gray-50 transition-colors">
                      <div className="w-4 h-4 flex items-center justify-center text-gray-600 font-bold">−</div>
                    </button>
                  </div>
                  
                  {/* Map attribution */}
                  <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white bg-opacity-80 px-2 py-1 rounded">
                    Demo Map - Dhaka, Bangladesh
                  </div>
                </div>
                
                {/* Interactive overlay message */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg text-center max-w-sm mx-4">
                    <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Interactive Demo Map</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      This is a demo representation of our location in Dhaka. 
                    </p>
                    <div className="text-xs text-gray-500 border-t pt-2">
                      <div className="font-medium">📍 1/11 Allenbari Staff Quarter</div>
                      <div>Dhaka, Bangladesh</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ContactUs;