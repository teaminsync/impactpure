"use client"

import { motion } from "framer-motion"
import { Truck, Clock, MapPin, Package } from "lucide-react"
import FadeIn from "@/components/animations/FadeIn"

const ShippingContent = () => {
  const shippingInfo = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Processing Time",
      content: [
        "Orders are processed within 1-2 business days after payment confirmation",
        "Processing time may vary during peak seasons or promotional periods",
        "You will receive a confirmation email once your order is processed",
      ],
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Delivery Timeline",
      content: [
        "Metro Cities: 3-7 business days",
        "Non-Metro Cities: 5-9 business days",
        "Remote Areas: 7-15 business days",
        "Expedited shipping options may be available at additional cost",
      ],
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Delivery Process",
      content: [
        "We partner with reputed courier services for safe and reliable delivery",
        "Tracking number provided once the order is shipped",
        "Re-attempts made if recipient is unavailable at delivery address",
        "Signature required for delivery confirmation",
      ],
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Coverage Areas",
      content: [
        "Currently serving all major cities and towns across India",
        "International shipping not available at this time",
        "For bulk export orders, please contact our support team",
        "Remote area delivery subject to courier partner availability",
      ],
    },
  ]

  const deliveryZones = [
    {
      zone: "Zone 1 - Metro Cities",
      cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"],
      timeline: "3-7 business days",
      color: "bg-green-100 text-green-800",
    },
    {
      zone: "Zone 2 - Major Cities",
      cities: ["Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam"],
      timeline: "5-9 business days",
      color: "bg-blue-100 text-blue-800",
    },
    {
      zone: "Zone 3 - Other Areas",
      cities: ["All other serviceable locations across India"],
      timeline: "7-15 business days",
      color: "bg-orange-100 text-orange-800",
    },
  ]

  return (
    <div className="overflow-hidden pt-12 md:pt-16 lg:pt-12 pb-0">
      {/* Hero Section */}
      <section className="section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center">
            <h1 className="section-title">Shipping & Delivery</h1>
            <p className="section-subtitle mx-auto">
              PRO-WIN Healthcare Pvt. Ltd is committed to delivering your orders in a timely and secure manner.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Shipping Information */}
      <section className="bg-white pt-4 pb-16 md:pt-6 md:pb-20 lg:pt-4 lg:pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {shippingInfo.map((info, index) => (
              <FadeIn key={info.title} delay={index * 0.1}>
                <div className="bg-neutral-50 rounded-2xl p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3 text-primary-600">
                      {info.icon}
                    </div>
                    <h3 className="text-xl font-medium text-neutral-900">{info.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {info.content.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-neutral-600 text-sm leading-relaxed">{item}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="section bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-medium text-neutral-900 mb-4">Delivery Zones & Timeline</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Check the estimated delivery time for your location based on our delivery zones.
            </p>
          </FadeIn>

          <div className="space-y-6">
            {deliveryZones.map((zone, index) => (
              <FadeIn key={zone.zone} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-neutral-900 mb-2 md:mb-0">{zone.zone}</h3>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${zone.color}`}
                    >
                      {zone.timeline}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {zone.cities.map((city, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-sm"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

     
      {/* Contact Information */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-neutral-50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-medium text-neutral-900 mb-4">Need Help with Shipping?</h2>
              <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                For any queries related to shipping and delivery, or if your order is delayed beyond the expected
                timeframe, please contact our support team.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-neutral-900 mb-2">PRO-WIN Healthcare Pvt. Ltd</h3>
                  <p className="text-neutral-600 text-sm">
                    Enath Ghadi Marg Ambekar Nagar Parel Village G/13 Mumbai, Maharashtra 400012
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8">
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-500">Phone:</span>
                    <a href="tel:+917738490103" className="text-primary-600 font-medium hover:underline">
                      +91 77384 90103
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-500">Email:</span>
                    <a href="mailto:contact@impactpure.com" className="text-primary-600 font-medium hover:underline">
                      contact@impactpure.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

export default ShippingContent
