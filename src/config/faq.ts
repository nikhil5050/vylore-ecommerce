export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "orders",
    title: "Orders",
    items: [
      {
        id: "orders-1",
        question: "How do I place an order?",
        answer:
          "Add a piece to your bag from any product page and follow the checkout steps — contact details, shipping address, delivery, and payment.",
      },
      {
        id: "orders-2",
        question: "Can I change or cancel my order?",
        answer:
          "Contact us as soon as possible after placing your order. Once an order has been processed, changes may not be possible.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping",
    items: [
      {
        id: "shipping-1",
        question: "Where does Vylore ship?",
        answer: "Vylore currently ships within India only.",
      },
      {
        id: "shipping-2",
        question: "How long does delivery take?",
        answer:
          "Orders are typically dispatched within 2–4 business days. Exact delivery timelines are confirmed after your order is placed.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns",
    items: [
      {
        id: "returns-1",
        question: "What is Vylore's return policy?",
        answer: "For questions about returns or exchanges on a specific order, please contact our support team directly.",
      },
      {
        id: "returns-2",
        question: "How do I start a return?",
        answer: "Reach out via our Contact page with your order ID and we'll guide you through the next steps.",
      },
    ],
  },
  {
    id: "jewellery-care",
    title: "Jewellery Care",
    items: [
      {
        id: "care-1",
        question: "How should I store my Vylore jewellery?",
        answer: "Store pieces separately in a dry place, away from direct sunlight and moisture, to help preserve their finish.",
      },
      {
        id: "care-2",
        question: "Can I wear my jewellery every day?",
        answer:
          "Many Vylore pieces are designed for everyday wear, but avoiding contact with water, perfume, and harsh chemicals will help keep them looking their best.",
      },
    ],
  },
  {
    id: "purity",
    title: "Purity",
    items: [
      {
        id: "purity-1",
        question: "What metal is used in Vylore jewellery?",
        answer: "Metal and purity information is listed on each product page where available.",
      },
      {
        id: "purity-2",
        question: "How can I verify the purity of a piece?",
        answer: "If you have questions about the purity of a specific piece, please contact us before purchasing.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    items: [
      {
        id: "payments-1",
        question: "What payment methods are accepted?",
        answer: "Vylore accepts payments via PayU, supporting cards, UPI, and netbanking.",
      },
      {
        id: "payments-2",
        question: "Is it safe to pay on the Vylore website?",
        answer: "Payments are processed through PayU's secure, hosted checkout. Vylore does not store your card or payment details.",
      },
    ],
  },
  {
    id: "custom-jewellery",
    title: "Custom Jewellery",
    items: [
      {
        id: "custom-1",
        question: "Does Vylore make custom pieces?",
        answer:
          'Yes. Reach out via our Contact page and select "Custom Jewellery" as your reason for contact to start the conversation.',
      },
      {
        id: "custom-2",
        question: "How long does a custom order take?",
        answer: "Timelines depend on the design. Our team will share an estimate once your requirements are discussed.",
      },
    ],
  },
  {
    id: "tracking",
    title: "Tracking",
    items: [
      {
        id: "tracking-1",
        question: "How do I track my order?",
        answer: "Visit our Track Order page and enter your order ID along with the email or phone number used at checkout.",
      },
      {
        id: "tracking-2",
        question: "I can't find my order. What should I do?",
        answer: "Double-check your order ID and contact details. If you're still having trouble, reach out via our Contact page.",
      },
    ],
  },
];
