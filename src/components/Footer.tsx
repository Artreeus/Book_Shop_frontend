import React from 'react';
import { Facebook, Linkedin, Twitter, Youtube,  } from 'lucide-react';

const Footer = () => {
  return (
    <footer className=" py-16 px-6 md:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img src="bLogo.png" alt="" />
            </div>
            <p className="text-gray-600 max-w-sm">
             BookSHopBd is a Bangladeshi Book shop Where Users can Buy Books and Ebooks. <br /> We have a wide range of books and ebooks.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div> */}
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-600">COMPANY</h3>
            <ul className="space-y-4 ">
              {['HOME', 'ABOUT US', 'BOOKS', 'EBOOKS', 'NEW RELEASE', 'CONTACT US', 'BLOG'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:font-bold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest News */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-600">LATEST NEWS</h3>
            <div className="space-y-6">
              {[
                {
                  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
                  title: 'Nostrud exercitation',
                  date: '15 April 2022',
                  description: 'Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                },
                {
                  image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
                  title: 'Nostrud exercitation',
                  date: '15 April 2022',
                  description: 'Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                }
              ].map((news, index) => (
                <div key={index} className="flex space-x-4">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-red-500">{news.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{news.description}</p>
                    <span className="text-sm text-orange-400 mt-2 block">{news.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2025 BookShopBd. All Rights Reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-red-500 hover:text-red-600 text-sm">
                Privacy
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;