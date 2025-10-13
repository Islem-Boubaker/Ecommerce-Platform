import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer free returns within 30 days of delivery. Items must be unused and in their original packaging.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3–7 business days. Express options are available at checkout.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes! We ship worldwide. Delivery times and costs vary by location and will be calculated at checkout.",
    },
    {
      question: "How can I track my order?",
      answer:
        "After your order ships, you’ll receive an email with a tracking link so you can follow your package in real time.",
    },
    {
      question: "How can I choose the right size?",
      answer:
        "Check our detailed size guide available on each product page. If unsure, you can contact our support team for advice.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === i && (
              <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-12 text-gray-700">
        <p>
          Still have questions?{" "}
          <a href="/contact" className="text-black font-semibold underline">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}
