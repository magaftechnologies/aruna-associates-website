// Central business data — edit here to update contact details everywhere on the site.
export const business = {
  name: "Aruna Associates",
  tagline: "Loans • Construction • Interiors",
  phone: "9030086081",
  phoneDisplay: "+91 90300 86081",
  whatsapp: "919030086081",
  email: "", // Add official email when provided by the client
  address: "30-55/1A Moghul Colony, Old Safilguda, Malkajgiri",
  city: "Hyderabad, Telangana",
  // Replace with the client's exact Google Maps share link when available.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("30-55/1A Moghul Colony, Old Safilguda, Malkajgiri, Hyderabad"),
  hours: "Mon – Sat, 10:00 AM – 7:00 PM", // DEMO — confirm with client
  serviceArea: "Hyderabad & surrounding areas",
};

export const whatsappMessages = {
  general: "Hi Aruna Associates, I would like to enquire about your services.",
  homeLoan: "I would like to enquire about a Home Loan.",
  construction: "I would like to enquire about Construction.",
  interiors: "I would like to enquire about Interiors.",
};

export function whatsappLink(message: string = whatsappMessages.general) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:+91${business.phone}`;

// DEMO metrics — replace with figures confirmed by the client.
export const trustMetrics = [
  { value: "15+", label: "Years of experience", demo: false },
  { value: "55+", label: "Banking & financial connections", demo: false },
  { value: "Multiple", label: "Loan solutions", demo: false },
  { value: "Hyderabad", label: "& surrounding areas", demo: false },
];

export const disclaimer =
  "Loan approval, interest rates, eligibility, documentation and other terms are subject to applicable lender policies, applicant eligibility and applicable terms and conditions. Aruna Associates does not guarantee loan approval.";
