import { Contact } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e : any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8 hero2">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-[#393280] text-5xl items-center flex justify-center gap-4">
            <Contact className="w-12 h-12" /> Contact Us
          </h1>
          <p className="mt-4 text-lg leading-6 text-gray-600">Have questions? We're here to help!</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 bg-[#EA580C]/10 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-[#EA580C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#393280]">Address</h3>
                <p className="mt-1 text-gray-600">1/11 Allenbari Staff Quater<br />Dhaka, Bangadesh</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 bg-[#EA580C]/10 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-[#EA580C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#393280]">Phone</h3>
                <p className="mt-1 text-gray-600">+1 (+880) 017-1716-0829</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 bg-[#EA580C]/10 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-[#EA580C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#393280]">Email</h3>
                <p className="mt-1 text-gray-600">contact@hasaninfo.com</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white py-8 px-6 shadow-lg rounded-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#393280]">Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#393280] focus:ring-[#393280]" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#393280]">Email</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#393280] focus:ring-[#393280]" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#393280]">Subject</label>
                <input type="text" id="subject" value={formData.subject} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#393280] focus:ring-[#393280]" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#393280]">Message</label>
                <textarea id="message" rows={4} value={formData.message} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#393280] focus:ring-[#393280]" />
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#EA580C] hover:bg-[#c44b0a] transition-colors">Send Message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
