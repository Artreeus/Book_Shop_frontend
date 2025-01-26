import React from 'react';
import { BookOpen, Users, Award, Clock, MapPin, PhoneCall, Mail, BookMarked, Bookmark, GraduationCap } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] hero3 flex justify-center items-center overflow-hidden">

        <div className="">
          <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 items-center">
            <h1 className="text-[70px] font-bold text-[#393280] mb-4">Our Story</h1>
            <p className="text-[18px] text-gray-500 max-w-2xl text-center">
              For over two decades, we've been more than just a bookstore - we're a sanctuary for book lovers, 
              a community hub for intellectuals, and a gateway to countless adventures through literature.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#393280] mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                We believe in the transformative power of reading. Our mission is to cultivate a love for literature,
                foster intellectual curiosity, and create a welcoming space where stories come alive.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-[#ED553B]" />
                  <span className="text-gray-700">50K+ Books</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#ED553B]" />
                  <span className="text-gray-700">20K+ Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#ED553B]" />
                  <span className="text-gray-700">Award Winning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#ED553B]" />
                  <span className="text-gray-700">Since 2000</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80" 
                alt="Books on shelves" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#ED553B] p-4 rounded-lg shadow-lg">
                <p className="text-white font-bold text-xl">23+ Years</p>
                <p className="text-white/90">of Literary Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 hero2 ">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#393280] mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8 text-[#ED553B]" />,
                title: "Literary Excellence",
                description: "Curating the finest collection of books across all genres and maintaining high standards in literary quality."
              },
              {
                icon: <Users className="w-8 h-8 text-[#ED553B]" />,
                title: "Community First",
                description: "Building and nurturing a vibrant community of readers, writers, and literary enthusiasts."
              },
              {
                icon: <GraduationCap className="w-8 h-8 text-[#ED553B]" />,
                title: "Continuous Learning",
                description: "Promoting lifelong learning through books, workshops, and educational programs."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#393280] mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#393280] mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
                name: "Sarah Johnson",
                role: "Founder & CEO"
              },
              {
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
                name: "David Chen",
                role: "Head Curator"
              },
              {
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
                name: "Emily Rodriguez",
                role: "Community Manager"
              },
              {
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
                name: "Michael Kim",
                role: "Events Director"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4 group">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[#393280]/0 group-hover:bg-[#393280]/20 transition-colors duration-300 rounded-lg" />
                </div>
                <h3 className="text-xl font-bold text-[#393280]">{member.name}</h3>
                <p className="text-[#ED553B]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 hero3 px-5 mb-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#393280] mb-6">Visit Our Store</h2>
              <p className="text-[#393280] mb-8">
                We'd love to help you discover your next favorite book. Visit us at our store
                or reach out through any of our contact channels.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <MapPin className="w-5 h-5 text-[#ED553B]" />
                  <span className='text-[#393280]' >123 Bookworm Lane, Literary District, LT 12345</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <PhoneCall className="w-5 h-5 text-[#ED553B]" />
                  <span className='text-[#393280]'>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Mail className="w-5 h-5 text-[#ED553B]" />
                  <span className='text-[#393280]'>hello@chapterandverse.com</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1529148482759-b35b25c5f217?auto=format&fit=crop&q=80" 
                alt="Store interior" 
                className="w-full h-[300px] object-cover rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-[#393280] mb-2">Opening Hours</h3>
                <div className="grid grid-cols-2 gap-2 text-gray-600">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 9:00 PM</span>
                  <span>Saturday</span>
                  <span>10:00 AM - 8:00 PM</span>
                  <span>Sunday</span>
                  <span>11:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}