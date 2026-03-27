import { notFound } from 'next/navigation';
import ProductDetailContent from './ProductDetailContent';

const productData: { [key: string]: any } = {
  "1": {
    id: "1",
    name: 'Peanut Butter',
    price: '$12.99',
    rating: 4.7,
    reviews: 156,
    image: '/peanutbutterdrops.png',
    hoverImage: '/peanut_bowl.png',
    category: 'Spreads',
    ingredients: '100% Roasted Peanuts, Sea Salt',
    features: ['100% Natural', 'High Protein', 'No Preservatives', 'Smooth Texture'],
    badge: 'Bestseller',
    description: 'Pure roasted peanuts ground to perfection, creating a smooth, creamy spread without any additives.',
    nutrition: {
      calories: 190,
      protein: '8g',
      carbs: '6g',
      fat: '16g',
      fiber: '2g'
    }
  },
  "2": {
    id: "2",
    name: 'Protein Bar - Normal',
    price: '$24.99',
    rating: 4.8,
    reviews: 203,
    image: '/bg_marvaproteinbar.png',
    hoverImage: '/proteinbar1.png',
    category: 'Protein Bars',
    ingredients: 'Whey Protein, Almonds, Dark Chocolate, Honey, Natural Flavors',
    features: ['High Protein', 'Gluten-Free', 'No Added Sugar', 'Keto-Friendly'],
    badge: 'Bestseller',
    description: 'Rich chocolate flavor with 20g of premium protein to fuel your workout and recovery.',
    nutrition: {
      calories: 200,
      protein: '20g',
      carbs: '12g',
      fat: '8g',
      fiber: '3g'
    }
  },
  "3": {
    id: "3",
    name: 'Biscuits',
    price: '$8.99',
    rating: 4.6,
    reviews: 89,
    image: '/bowl.png',
    hoverImage: '/bowl1.png',
    category: 'Biscuits',
    ingredients: 'Whole Grain Oats, Honey, Wheat Flour, Butter, Sea Salt, Natural Vanilla',
    features: ['Whole Grain', 'Honey Sweetened', 'Baked Fresh', 'No Preservatives'],
    badge: null,
    description: 'Whole grain oats sweetened with pure honey, perfect for a wholesome breakfast or snack.',
    nutrition: {
      calories: 120,
      protein: '3g',
      carbs: '18g',
      fat: '4g',
      fiber: '2g'
    }
  },
  "4": {
    id: "4",
    name: 'Protein Bar - Chocolate',
    price: '$26.99',
    rating: 4.9,
    reviews: 124,
    image: '/bg_marvaproteinbar.png',
    hoverImage: '/proteinbar1.png',
    category: 'Protein Bars',
    ingredients: 'Whey Protein, Almonds, Dark Chocolate, Honey, Natural Flavors',
    features: ['High Protein', 'Gluten-Free', 'No Added Sugar', 'Keto-Friendly'],
    badge: 'Premium',
    description: 'Rich dark chocolate with 20g of premium protein for ultimate indulgence.',
    nutrition: {
      calories: 210,
      protein: '20g',
      carbs: '14g',
      fat: '9g',
      fiber: '3g'
    }
  },
  "5": {
    id: "5",
    name: 'Protein Bar - Peanut Crunch',
    price: '$27.99',
    rating: 4.8,
    reviews: 167,
    image: '/bg_marvaproteinbar.png',
    hoverImage: '/proteinbar1.png',
    category: 'Protein Bars',
    ingredients: 'Whey Protein, Peanuts, Honey, Sea Salt, Natural Flavors',
    features: ['High Protein', 'Crunchy Texture', 'No Added Sugar', 'Keto-Friendly'],
    badge: 'New',
    description: 'Crunchy peanut pieces blended with smooth protein for perfect texture and taste.',
    nutrition: {
      calories: 220,
      protein: '20g',
      carbs: '13g',
      fat: '10g',
      fiber: '3g'
    }
  },
  "6": {
    id: "6",
    name: 'Protein Bar - Katora',
    price: '$25.99',
    rating: 4.7,
    reviews: 145,
    image: '/bg_marvaproteinbar.png',
    hoverImage: '/proteinbar1.png',
    category: 'Protein Bars',
    ingredients: 'Whey Protein, Nuts, Honey, Natural Flavors, Sea Salt',
    features: ['High Protein', 'Mixed Nuts', 'No Added Sugar', 'Keto-Friendly'],
    badge: null,
    description: 'Premium blend of nuts and protein for a satisfying, energy-boosting snack.',
    nutrition: {
      calories: 205,
      protein: '19g',
      carbs: '12g',
      fat: '9g',
      fiber: '3g'
    }
  }
};

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' }
  ];
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = productData[resolvedParams.id];
    
  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}
