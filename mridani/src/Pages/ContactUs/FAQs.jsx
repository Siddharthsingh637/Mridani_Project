import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqsData = [
  {
    question: "What is Madhubani art?",
    answer:
      "Madhubani art is a centuries-old Indian art form from Bihar, characterized by intricate patterns, vibrant colors, and cultural motifs inspired by mythology, nature, and traditions.",
  },
  {
    question: "Are your products handmade?",
    answer: "Yes, all our products are 100% handmade. Each piece is meticulously handpainted by skilled artisans, ensuring no two items are exactly alike.    ",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use premium hand woven fabrics like cotton, silks and chanderi for apparel and home decor items. Eco-friendly, non-toxic paints are used for all handpainted designs",
  },
  {
    question: "Are these products sustainable ?",
    answer:
      "Yes, sustainability is at the heart of what we do. Our products are made using environmentally friendly paints and materials, promoting slow fashion and conscious living.",
  },
  {
    question: "What types of Madhubani apparel do you offer?    ",
    answer:
      "We offer handpainted sarees, suit sets, dupattas, and other customizable apparel that blend traditional art with contemporary fashion.      ",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use eco-friendly and sustainable materials including cotton, jute, and natural dyes.",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use eco-friendly and sustainable materials including cotton, jute, and natural dyes.",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use eco-friendly and sustainable materials including cotton, jute, and natural dyes.",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use eco-friendly and sustainable materials including cotton, jute, and natural dyes.",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use eco-friendly and sustainable materials including cotton, jute, and natural dyes.",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use eco-friendly and sustainable materials including cotton, jute, and natural dyes.",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use eco-friendly and sustainable materials including cotton, jute, and natural dyes.",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use eco-friendly and sustainable materials including cotton, jute, and natural dyes.",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use eco-friendly and sustainable materials including cotton, jute, and natural dyes.",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use eco-friendly and sustainable materials including cotton, jute, and natural dyes.",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use eco-friendly and sustainable materials including cotton, jute, and natural dyes.",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use eco-friendly and sustainable materials including cotton, jute, and natural dyes.",
  },
  {
    question: "What materials do you use for your products?",
    answer:
      "We use eco-friendly and sustainable materials including cotton, jute, and natural dyes.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-4xl font-semibold text-center mb-4">FAQs</h2>
      <p className="text-center text-gray-500 mb-12">
        Below are some of our common questions
      </p>

      <div className="space-y-2">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className="border-b transition-all duration-300 ease-in-out"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between w-full py-5 text-left focus:outline-none"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              {openIndex === index ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 pb-5 pr-4">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
