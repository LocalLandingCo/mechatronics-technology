// Company data taken from the Mechatronics Technology IndiaMART profile.

export const INDIAMART_URL = 'https://www.indiamart.com/mechatronics-technology/';
export const INDIAMART_REVIEWS_URL = 'https://www.indiamart.com/mechatronics-technology/testimonial.html';

export const GST_NUMBER = '27DKOPK1004F1ZF';

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
};

// Surnames are shortened to an initial: these are private buyers.
export const buyerReviews: BuyerReview[] = [
  { name: 'Vishal K.', location: 'Bilaspur, Himachal Pradesh', date: 'August 2024', product: 'Digital Tilt Sensor', comment: 'Good' },
  { name: 'Ritesh V.', location: 'Verna, Goa', date: 'February 2024', product: 'Tilt Sensors' },
  { name: 'Sukanto', location: 'Gurgaon, Haryana', date: 'December 2023', product: 'Shock Watch Label' },
  { name: 'Arumugam', location: 'Chennai, Tamil Nadu', date: 'March 2022', product: 'Shock Watch Label' },
  { name: 'Kamleshkumar P.', location: 'Ahmedabad, Gujarat', date: 'June 2021', product: 'Inclinometer' },
  { name: 'Satish C.', location: 'Nagpur, Maharashtra', date: 'October 2020', product: 'Load Cell' },
  { name: 'C K C.', location: 'Greater Noida, Uttar Pradesh', date: 'February 2020', product: 'Shock Watch Label' },
  { name: 'Sagar R.', location: 'Pune, Maharashtra', date: 'August 2019' },
  { name: 'Sandip S.', location: 'Rajkot, Gujarat', date: 'March 2019' },
];
