import {
 
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              Due<span className="text-blue-500">Mart</span>
            </h3>
            <p className="text-sm mb-4">
              Your trusted online marketplace for quality products at great
              prices. Shop with confidence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span>
                  123 Market Street, Suite 100
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>support@duemart.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2026 DueMart. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-blue-500 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
