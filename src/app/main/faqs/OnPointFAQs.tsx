"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import Link from "next/link";

type FAQItem = {
  id: string;
  icon: IconName;
  question: string;
  answer: string;
};

export default function OnPointFAQs() {
  const faqItems: FAQItem[] = [
    {
      id: "item-1",
      icon: "clock",
      question: "What are your business hours?",
      answer:
        "Our customer service team is available Monday through Friday from 9:00 AM to 8:00 PM EST, and weekends from 10:00 AM to 6:00 PM EST. During holidays, we are closed. However, during holidays in which we'll be open, the hours may vary and will be posted on our website.",
    },
    {
      id: "item-2",
      icon: "credit-card",
      question: "How do payments work?",
      answer:
        "All payments are handled by our customer service representatives. This is to ensure accuracy and to allow payments to only be done upon confirmation from the customer. Your payment history is available in your dashboard under the payments section.",
    },
    {
      id: "item-3",
      icon: "truck",
      question:
        "Do all trips to national parks and game reserves come with a gamne drive?",
      answer:
        "No. The animals inside government protected sanctuaries and game reseves are a beauty to behold. We would wish everyone to enjoy their sight. You can add a vehicle when booking to enjoy a game drive around the parks and reserves.",
    },
    {
      id: "item-4",
      icon: "globe",
      question: "Can you facilitate travel to other countries?",
      answer:
        "Yes. We offer services that allow you to meet all the requirements for entering different countries around the world. Our agents can assist customers achieve this via email, phone calls, and in person standard business hours.",
    },
  ];

  return (
    <section className="bg-transparent py-20 pt-10">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div className="md:w-1/3">
            <div className="sticky top-20">
              <h2 className="mt-4 text-3xl font-bold text-lightmode-heading-color dark:text-darkmode-heading-color">
                Frequently Asked Questions
              </h2>
              <p className="text-lightmode-text-color dark:text-darkmode-text-color mt-4">
                Can't find what you're looking for? Contact our{" "}
                <Link href="/contact" className="font-medium hover:underline">
                  customer support team
                </Link>
              </p>
            </div>
          </div>
          <div className="md:w-2/3">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="bg-white/50 dark:bg-green-900/50 backdrop-blur-[4px] shadow-sm rounded-lg border px-4 last:border-b"
                >
                  <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="flex size-6">
                        <DynamicIcon
                          name={item.icon}
                          className="m-auto size-4"
                        />
                      </div>
                      <span className="text-base text-green-800 dark:text-green-200">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="px-9">
                      <p className="text-base text-green-600 dark:text-green-300">
                        {item.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
