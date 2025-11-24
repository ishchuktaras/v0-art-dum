"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Review {
  _id: string
  customerName: string
  rating: number
  reviewText: string
  location?: string
  date: string
  source?: string
}

interface ReviewsCarouselProps {
  reviews: Review[]
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  if (reviews.length === 0) {
    return null
  }

  const currentReview = reviews[currentIndex]

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-primary/10 min-h-[400px] flex flex-col justify-between">
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 opacity-10">
          <Quote className="w-24 h-24 text-primary" />
        </div>

        {/* Review Content */}
        <div className="relative z-10">
          {/* Rating Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 transition-all duration-300 ${
                  i < currentReview.rating ? "fill-gold text-gold animate-pulse" : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          {/* Review Text */}
          <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-8 leading-relaxed">
            "{currentReview.reviewText}"
          </blockquote>

          {/* Customer Info */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">{currentReview.customerName}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {currentReview.location && <span>{currentReview.location}</span>}
                {currentReview.location && currentReview.date && <span>•</span>}
                {currentReview.date && <span>{new Date(currentReview.date).toLocaleDateString("cs-CZ")}</span>}
              </div>
            </div>
            {currentReview.source && (
              <div className="bg-primary/10 px-3 py-1 rounded-full">
                <span className="text-xs font-semibold text-primary">
                  {currentReview.source === "firmy-cz" && "Firmy.cz"}
                  {currentReview.source === "google" && "Google"}
                  {currentReview.source !== "firmy-cz" && currentReview.source !== "google" && "Přímá reference"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            onClick={prevReview}
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 border-2 hover:scale-110 transition-transform bg-transparent"
            disabled={reviews.length <= 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Přejít na recenzi ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={nextReview}
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 border-2 hover:scale-110 transition-transform bg-transparent"
            disabled={reviews.length <= 1}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Review Counter */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Recenze {currentIndex + 1} z {reviews.length}
        </p>
      </div>
    </div>
  )
}
