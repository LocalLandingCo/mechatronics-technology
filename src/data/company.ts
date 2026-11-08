// Company data taken from the Mechatronics Technology IndiaMART profile.

export const INDIAMART_URL = 'https://www.indiamart.com/mechatronics-technology/';
export const INDIAMART_REVIEWS_URL = 'https://www.indiamart.com/mechatronics-technology/testimonial.html';

export const GST_NUMBER = '27DKOPK1004F1ZF';

const WHATSAPP_NUMBER = '918237813940';

export const whatsappQuoteUrl = (productTitle: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I'm interested in *${productTitle}*. Please share pricing and availability details.`,
  )}`;

export const companyFacts = [
  { label: 'Established', value: '2018' },
  { label: 'Nature of business', value: 'Trader, wholesaler and distributor' },
  { label: 'GST number', value: GST_NUMBER },
  { label: 'Legal status', value: 'Proprietorship' },
  { label: 'Company CEO', value: 'A Kulkarni' },
  { label: 'Team size', value: 'Up to 10 people' },
  { label: 'Payment modes', value: 'Cash, credit card, cheque, DD' },
  { label: 'Shipment mode', value: 'By road' },
];

export const buyerRating = {
  score: 4.7,
  count: 9,
  breakdown: [
    { label: 'Quality', percent: 100 },
    { label: 'Delivery', percent: 100 },
    { label: 'Response', percent: 100 },
  ],
  stars: [
    { label: '5 star', percent: 89 },
    { label: '2 star', percent: 11 },
  ],
};

export type BuyerReview = {
  name: string;
  location: string;
  date: string;
  product?: string;
  comment?: string;
  /** Map position of the buyer's city, with the map region it falls in. */
  coords: [latitude: number, longitude: number];
  region: string;
};

// Surnames are shortened to an initial: these are private buyers.
export const buyerReviews: BuyerReview[] = [
  { name: 'Vishal K.', location: 'Bilaspur, Himachal Pradesh', date: 'August 2024', product: 'Digital Tilt Sensor', comment: 'Good', coords: [31.33, 76.76], region: 'hp' },
  { name: 'Ritesh V.', location: 'Verna, Goa', date: 'February 2024', product: 'Tilt Sensors', coords: [15.36, 73.93], region: 'ga' },
  { name: 'Sukanto', location: 'Gurgaon, Haryana', date: 'December 2023', product: 'Shock Watch Label', coords: [28.46, 77.03], region: 'hr' },
  { name: 'Arumugam', location: 'Chennai, Tamil Nadu', date: 'March 2022', product: 'Shock Watch Label', coords: [13.08, 80.2], region: 'tn' },
  { name: 'Kamleshkumar P.', location: 'Ahmedabad, Gujarat', date: 'June 2021', product: 'Inclinometer', coords: [23.03, 72.57], region: 'gj' },
  { name: 'Satish C.', location: 'Nagpur, Maharashtra', date: 'October 2020', product: 'Load Cell', coords: [21.15, 79.09], region: 'mh' },
  { name: 'C K C.', location: 'Greater Noida, Uttar Pradesh', date: 'February 2020', product: 'Shock Watch Label', coords: [28.47, 77.5], region: 'up' },
  { name: 'Sagar R.', location: 'Pune, Maharashtra', date: 'August 2019', coords: [18.52, 73.86], region: 'mh' },
  { name: 'Sandip S.', location: 'Rajkot, Gujarat', date: 'March 2019', coords: [22.3, 70.8], region: 'gj' },
];

export const HOME_COORDS: [number, number] = [16.7, 74.24];
