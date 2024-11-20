import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import catImage from '../components/Images/dog.png';


export default function BenefitSection() {
  const benefits = [
    {
      title: 'Quality toys & food for your pets',
      description: "Please be aware that you will be charged for the rest of your pet's meals up to $5/meal. If you do not bring your pet's own food, we offer our Fromm's house cuisine.",
    },
    { 
      title: 'Premium pet care for your friend', 
      description: 'High-quality care and attention for your beloved pet.' 
    },
    { 
      title: 'Incredible salon pet services', 
      description: 'A range of salon services to pamper your pet.' 
    },
    { 
      title: 'Indoor & outdoor activities for pets', 
      description: 'Fun and engaging activities for pets of all kinds.' 
    },
  ]

  return (
    <section className="flex flex-col md:flex-row items-start md:justify-evenly bg-[#FFF7ED] p-8 md:p-16 gap-10 font-sans">
      <div className="md:w-1/3">
        <Badge variant="secondary" className="mb-4 text-lg font-semibold">
          BENEFITS
        </Badge>
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Why Choose Our Pet Care Company?
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {benefits.map((benefit, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="mt-2 px-5 rounded-md shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-gray-800 no-underline">
                {benefit.title}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {benefit.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="md:w-1/4 relative justify-center hidden md:block">
        <img
          src={catImage}
          alt="Pet with toy"
          className="w-full max-w-md h-auto object-cover rounded-lg"
        />
      </div>
    </section>
  )
}