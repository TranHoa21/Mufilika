// components/ContactSection.tsx

import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
    return (
        <div className="bg-[#fdfaf4] px-4 py-10 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-[#e7dbc6] bg-[#f8f0e3] p-6 rounded-md flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Phone</h3>
                        <p className="text-gray-700">(474) 937 8270</p>
                    </div>
                    <Phone className="w-8 h-8 text-[#a37d5e]" />
                </div>

                <div className="border border-[#e7dbc6] bg-[#f8f0e3] p-6 rounded-md flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Email</h3>
                        <p className="text-gray-700">contact@sandtrail.com</p>
                    </div>
                    <Mail className="w-8 h-8 text-[#a37d5e]" />
                </div>

                <div className="border border-[#e7dbc6] bg-[#f8f0e3] p-6 rounded-md flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Address</h3>
                        <p className="text-gray-700">123 Tech District, Metro City</p>
                    </div>
                    <MapPin className="w-8 h-8 text-[#a37d5e]" />
                </div>
            </div>

            <div className="w-full h-[400px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19800.08944674364!2d-0.1277584!3d51.5073509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1683061553103!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}
