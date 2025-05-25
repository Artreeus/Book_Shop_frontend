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
            <div className="bg-white p-2 rounded-2xl shadow-2xl">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center h-96">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Interactive Map Coming Soon</p>
                  <p className="text-sm text-gray-500 mt-2">Find us at 1/11 Allenbari Staff Quarter, Dhaka</p>
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