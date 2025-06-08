"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useShopContext } from "@/contexts/ShopContext"
import { Star, Shield, Truck, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import FadeIn from "@/components/animations/FadeIn"
import type { Product } from "@/types"

interface ProductContentProps {
  productId: string
}

const ProductContent = ({ productId }: ProductContentProps) => {
  const { products, currency, addToCart, navigate, token } = useShopContext()
  const [productData, setProductData] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState("")
  const [activeTab, setActiveTab] = useState("description")
  const [quantity, setQuantity] = useState(1)

  const fetchProductData = async () => {
    const product = products.find((item) => item._id === productId)
    if (product) {
      setProductData(product)
      setSelectedImage(product.image[0])
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  const handleAddToCart = () => {
    if (productData) {
      for (let i = 0; i < quantity; i++) {
        addToCart(productData._id)
      }
    }
  }

  const handleBuyNow = () => {
    if (!token) {
      // If not logged in, redirect to login page once
      navigate("/login")
      return
    }

    if (productData) {
      // User is logged in, add to cart
      for (let i = 0; i < quantity; i++) {
        addToCart(productData._id)
      }
      // Navigate to cart
      setTimeout(() => {
        navigate("/cart")
      }, 500)
    }
  }

  const features = [
    "100% Original product",
    "Cash on delivery available",
    "6-month warranty included",
    "Free shipping on orders above ₹500",
    "Hassle-free replacement guarantee",
  ]

  const specifications = [
    { label: "Filtration Technology", value: "8-Stage Advanced Filtration" },
    { label: "Capacity", value: "Unlimited (Direct Connection)" },
    { label: "Power Requirement", value: "Zero Electricity" },
    { label: "Installation", value: "Plug & Play" },
    { label: "Warranty", value: "6 Months" },
    { label: "Certification", value: "NABL Certified" },
  ]

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader" />
      </div>
    )
  }

  return (
    <section className="section bg-gradient-to-b from-neutral-50 to-white pt-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              layoutId="main-image"
              className="relative aspect-square bg-neutral-50 rounded-2xl overflow-hidden"
            >
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={productData.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4 overflow-x-auto">
              {productData.image.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 bg-neutral-50 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    selectedImage === img ? "border-primary-600" : "border-transparent"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${productData.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-9">
            <FadeIn>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-medium text-neutral-900">{productData.name}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-500">(4.8 out of 5)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-medium text-primary-600">
                    {currency}
                    {productData.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-neutral-500 line-through">
                    {currency}
                    {(productData.price * 1.2).toLocaleString()}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">Save 20%</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-neutral-600 leading-relaxed">{productData.description}</p>
            </FadeIn>

            {/* Quantity and Add to Cart */}
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleAddToCart} size="lg" className="flex-1">
                    Add to Cart
                  </Button>
                  <Button onClick={handleBuyNow} variant="outline" size="lg" className="flex-1">
                    Buy Now
                  </Button>
                </div>
              </div>
            </FadeIn>

            {/* Features */}
            <FadeIn delay={0.3}>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check size={16} className="text-green-600" />
                    <span className="text-sm text-neutral-600">{feature}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Trust Badges */}
            <FadeIn delay={0.4}>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-100">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs text-neutral-600">Secure Payment</p>
                </div>
                <div className="text-center">
                  <Truck className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs text-neutral-600">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs text-neutral-600">Free Replacement</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-neutral-200">
            <nav className="flex space-x-8">
              {[
                { id: "description", label: "Description" },
                { id: "specifications", label: "Specifications" },
                { id: "reviews", label: "Reviews" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="prose max-w-none"
                >
                  <h3 className="text-xl font-medium mb-4">Product Description</h3>
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    IMPACTPURE is a highly advanced, eco-friendly water purification solution that ensures safe and
                    clean drinking water from any source. With its unique 8-stage filtration process, it guarantees
                    99.9999% bacteria and virus removal, retains essential minerals, and ensures zero water wastage.
                  </p>

                  <h4 className="text-lg font-medium mb-3">8-Stage Purification Process</h4>
                  <ol className="list-decimal list-inside space-y-2 text-neutral-600">
                    <li>S.S 304 Strainer for Filtering Suspended Impurities</li>
                    <li>Hi-IV Activated Carbon for Chlorine and Bad Odour Removal</li>
                    <li>Silver Impregnation for Bacteria Removal and Sterilization</li>
                    <li>Pyramid Energy of Life for Healing Effects</li>
                    <li>KDF (Kinetic Degradation Fluxion) for Heavy Metals and Toxic Removal</li>
                    <li>Constant Sterilization & Traditionally Proven Copper Benefits</li>
                    <li>0.01 Micron UF Membrane for Effective Purification</li>
                    <li>Magnetized Water</li>
                  </ol>
                </motion.div>
              )}

              {activeTab === "specifications" && (
                <motion.div
                  key="specifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-medium mb-6">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between py-3 border-b border-neutral-100">
                        <span className="font-medium text-neutral-700">{spec.label}</span>
                        <span className="text-neutral-600">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-medium mb-6">Customer Reviews</h3>
                  <div className="text-center py-12 text-neutral-500">
                    <p>Reviews will be displayed here once available.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductContent
