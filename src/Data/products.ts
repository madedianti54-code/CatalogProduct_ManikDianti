export type Product = {
  id: string;
  name: string;
  price: string;
  tint: string;
  category: string;
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Serum Cahaya',
    price: 'Rp 189.000',
    tint: '#E6D9C8',
    category: 'Serum',
    description: 'Serum ringan untuk membantu kulit tampak lebih cerah dan lembap.',
  },
  {
    id: '2',
    name: 'Krim Malam',
    price: 'Rp 245.000',
    tint: '#D5DCC8',
    category: 'Moisturizer',
    description: 'Krim malam bertekstur lembut yang menutrisi kulit saat tidur.',
  },
  {
    id: '3',
    name: 'Lip Tint Mawar',
    price: 'Rp 99.000',
    tint: '#EADBC8',
    category: 'Lip Care',
    description: 'Lip tint dengan warna mawar alami dan tekstur ringan di bibir.',
  },
  {
    id: '4',
    name: 'Body Butter',
    price: 'Rp 135.000',
    tint: '#DCCFBF',
    category: 'Body Care',
    description: 'Body butter kaya pelembap untuk kulit tubuh yang halus dan kenyal.',
  },
];