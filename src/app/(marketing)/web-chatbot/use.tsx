"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function UseCasesTestimonials() {
  const useCases = [
    {
      id: 1,
      title: "Use Case 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ultrices odio.",
    },
    {
      id: 2,
      title: "Use Case 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      title: "Use Case 3",
      description:
        "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.",
    },
    {
      id: 4,
      title: "Use Case 4",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "CEO, Example Corp",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh.",
      image: "/avatars/person1.png", // transparent PNG or JPG in /public/avatars
    },
    {
      id: 2,
      name: "Sarah Lee",
      role: "Founder, Startup X",
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      image: "/avatars/person2.png",
    },
    {
      id: 3,
      name: "Michael Smith",
      role: "CTO, Innovate Ltd",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/avatars/person3.png",
    },
  ];

  return (
    <section
      id="section4"
      className="min-h-screen w-full flex flex-col justify-center bg-[hsl(60,30%,96%)] px-6 snap-start py-20"
    >
      <div className="max-w-6xl mx-auto text-center">

        {/* Use Cases Carousel */}
        <h3 className="text-2xl font-semibold mb-6 text-gray-900">Use Cases</h3>
        <p className="text-l mb-6 text-gray-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ratione sed quos temporibus</p>
        <Carousel className="w-full mb-20">
          <CarouselContent>
            {useCases.map((uc) => (
              <CarouselItem
                key={uc.id}
                className="md:basis-1/3 lg:basis-1/3"
              >
                <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 h-full">
                  <h4 className="font-semibold text-xl mb-4 text-gray-900">
                    {uc.title}
                  </h4>
                  <p className="text-gray-600">{uc.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Testimonials Carousel */}
        {/* <h3 className="text-2xl font-semibold mb-6 text-gray-900">
          Testimonials
        </h3>
        <p className="text-l mb-6 text-gray-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ratione sed quos temporibus</p>
        
        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 h-full flex flex-col items-center text-center">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={80}
                    height={80}
                    className="rounded-full mb-4 object-cover"
                  />
                  <p className="italic text-gray-700 mb-4">{`“${t.text}”`}</p>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> */}
      </div>
    </section>
  );
}
