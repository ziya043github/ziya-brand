/* Design Philosophy: Luxury Minimalism
   - Warm earth tones, elegant serif + modern sans
   - Glassmorphism navigation, generous whitespace
   - Smooth animations and hover transformations
   - Amazon/AliExpress inspired detailed product info
*/

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Search, 
  Heart, 
  Star,
  X,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  Shield
} from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: 'men' | 'women' | 'kids' | 'accessories';
  brand: string;
  image: string;
  imageAlt: string;
  rating: number;
  reviews: number;
  soldCount: number;
  description: string;
  inStock: boolean;
  discount?: number;
}

const products: Product[] = [
  // Men's Collection - 8 items
  { id: 'm1', title: 'Klassik Kişi Gödəkçəsi', price: 89, originalPrice: 120, category: 'men', brand: 'Ziya Essentials', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=85', rating: 4.8, reviews: 2847, soldCount: 12453, description: 'Yüksək keyfiyyətli pambıq parça, klassik dizayn. Gündəlik və iş üçün ideal. Maşında yuyula bilər.', inStock: true, discount: 26 },
  
  { id: 'm2', title: 'Premium Kişi Palto', price: 159, originalPrice: 210, category: 'men', brand: 'Ziya Premium', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop&q=85', rating: 4.9, reviews: 1203, soldCount: 5678, description: 'İtalyan parçadan hazırlanmış lüks palto. Su keçirməyən xüsusiyyət. Qış üçün ideal.', inStock: true, discount: 24 },
  
  { id: 'm3', title: 'Oversize Kişi Sviter', price: 79, originalPrice: 95, category: 'men', brand: 'Ziya Street', image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=600&h=800&fit=crop&q=85', rating: 4.7, reviews: 4521, soldCount: 18934, description: 'Rahat oversize kəsik, yumuşaq triko parça. Uniseks model. Premium keyfiyyət.', inStock: true, discount: 17 },
  
  { id: 'm4', title: 'Smart Casual Şalvar', price: 69, originalPrice: 89, category: 'men', brand: 'Ziya Basics', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop&q=85', rating: 4.6, reviews: 3892, soldCount: 15234, description: 'Chino üslubunda smart-casual şalvar. Çox rəng seçimi. Elastik parça.', inStock: true, discount: 22 },
  
  { id: 'm5', title: 'Dəri Kişi Kurtka', price: 249, originalPrice: 320, category: 'men', brand: 'Ziya Premium', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=800&fit=crop&q=85', rating: 4.9, reviews: 892, soldCount: 3456, description: 'Əsl dəri kurtka, klassik biker üslubu. Uzunömürlü və stil sahibi.', inStock: true, discount: 22 },
  
  { id: 'm6', title: 'Polo Köynək', price: 54, originalPrice: 70, category: 'men', brand: 'Ziya Sport', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop&q=85', rating: 4.7, reviews: 5643, soldCount: 22145, description: 'Klassik polo köynək, pambıq parça. İdman və gündəlik üçün.', inStock: true, discount: 23 },
  
  { id: 'm7', title: 'Kişi Jeans', price: 84, originalPrice: 110, category: 'men', brand: 'Ziya Denim', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&h=800&fit=crop&q=85', rating: 4.8, reviews: 6234, soldCount: 28567, description: 'Slim fit jeans, premium denim parça. Rahat və davamlı.', inStock: true, discount: 24 },
  
  { id: 'm8', title: 'Kişi Blazer', price: 139, originalPrice: 180, category: 'men', brand: 'Ziya Formal', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=800&fit=crop&q=85', rating: 4.9, reviews: 1456, soldCount: 6789, description: 'Formal blazer, yüksək keyfiyyətli parça. İş və xüsusi tədbirlər üçün.', inStock: true, discount: 23 },
  
  // Women's Collection - 8 items
  { id: 'w1', title: 'Zərif Parlaq Ətək', price: 119, originalPrice: 150, category: 'women', brand: 'Ziya Woman', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop&q=85', rating: 4.9, reviews: 2156, soldCount: 9876, description: 'Parlaq parça, xüsusi gecələr üçün. Əl ilə yuyulmalıdır.', inStock: true, discount: 21 },
  
  { id: 'w2', title: 'Kətan Qadın Bluzka', price: 64, originalPrice: 85, category: 'women', brand: 'Ziya Nature', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop&q=85', rating: 4.8, reviews: 5234, soldCount: 21345, description: 'Təbii kətan parça, yaz-yay üçün. Nəfəs alan material.', inStock: true, discount: 25 },
  
  { id: 'w3', title: 'Lüks Qadın Palto', price: 199, originalPrice: 260, category: 'women', brand: 'Ziya Premium', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop&q=85', rating: 5.0, reviews: 892, soldCount: 4567, description: 'İtalyan parçadan yüksək modelli palto. Çox illik istifadə.', inStock: true, discount: 23 },
  
  { id: 'w4', title: 'Rəngli Qadın Köynək', price: 54, originalPrice: 72, category: 'women', brand: 'Ziya Essentials', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop&q=85', rating: 4.7, reviews: 6781, soldCount: 29876, description: 'Yüngül parça, rəngli naxışlar. Gündəlik kombinasiya üçün.', inStock: true, discount: 25 },
  
  { id: 'w5', title: 'Qadın Abaya Libas', price: 139, originalPrice: 180, category: 'women', brand: 'Ziya Evening', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop&q=85', rating: 4.9, reviews: 1234, soldCount: 5432, description: 'Uzun abaya libas, xüsusi tədbirlər üçün. Zərif və şık.', inStock: true, discount: 23 },
  
  { id: 'w6', title: 'Qadın Triko Sviter', price: 74, originalPrice: 95, category: 'women', brand: 'Ziya Comfort', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop&q=85', rating: 4.8, reviews: 4567, soldCount: 18234, description: 'Yumuşaq triko sviter, qış üçün ideal. Rahat və isti.', inStock: true, discount: 22 },
  
  { id: 'w7', title: 'Qadın Jeans', price: 79, originalPrice: 105, category: 'women', brand: 'Ziya Denim', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=600&h=800&fit=crop&q=85', rating: 4.7, reviews: 7234, soldCount: 31234, description: 'Skinny fit jeans, elastik parça. Rahat və müasir.', inStock: true, discount: 25 },
  
  { id: 'w8', title: 'Qadın Blazer', price: 129, originalPrice: 170, category: 'women', brand: 'Ziya Formal', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=800&fit=crop&q=85', rating: 4.9, reviews: 2345, soldCount: 9876, description: 'Formal blazer, peşəkar görünüş. İş və görüşlər üçün.', inStock: true, discount: 24 },
  
  // Kids Collection - 6 items
  { id: 'k1', title: 'Uşaq Sviter', price: 39, originalPrice: 52, category: 'kids', brand: 'Ziya Kids', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&h=800&fit=crop&q=85', rating: 4.9, reviews: 3124, soldCount: 14567, description: 'Uşaq dərisi üçün yumşaq triko. Hipoallergenik material.', inStock: true, discount: 25 },
  
  { id: 'k2', title: 'Uşaq Köynək', price: 34, originalPrice: 45, category: 'kids', brand: 'Ziya Kids', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&h=800&fit=crop&q=85', rating: 4.8, reviews: 4567, soldCount: 19876, description: 'Rahat və davamlı. Tez quruyan parça. 2-10 yaş.', inStock: true, discount: 24 },
  
  { id: 'k3', title: 'Uşaq Palto', price: 79, originalPrice: 105, category: 'kids', brand: 'Ziya Kids', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&h=800&fit=crop&q=85', rating: 4.9, reviews: 1543, soldCount: 6789, description: 'Qış üçün isti və su keçirməyən. 2–8 yaş.', inStock: true, discount: 25 },
  
  { id: 'k4', title: 'Uşaq Jeans', price: 44, originalPrice: 58, category: 'kids', brand: 'Ziya Kids', image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&h=800&fit=crop&q=85', rating: 4.7, reviews: 5234, soldCount: 22345, description: 'Davamlı denim jeans, elastik bel. Aktiv uşaqlar üçün.', inStock: true, discount: 24 },
  
  { id: 'k5', title: 'Uşaq Dəsti', price: 64, originalPrice: 85, category: 'kids', brand: 'Ziya Kids', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&h=800&fit=crop&q=85', rating: 4.8, reviews: 2876, soldCount: 11234, description: 'Üst və alt dəst. Pambıq parça, rahat. 3-9 yaş.', inStock: true, discount: 25 },
  
  { id: 'k6', title: 'Uşaq Kurtka', price: 89, originalPrice: 115, category: 'kids', brand: 'Ziya Kids', image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=800&fit=crop&q=85', rating: 4.9, reviews: 1987, soldCount: 8765, description: 'Yüngül kurtka, külək keçirməyən. Yaz-payız üçün.', inStock: true, discount: 23 },
  
  // Accessories - 6 items
  { id: 'a1', title: 'Dəri Qolbaq', price: 59, originalPrice: 78, category: 'accessories', brand: 'Ziya Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1509941943102-10c232535736?w=600&h=800&fit=crop&q=85', rating: 4.7, reviews: 2890, soldCount: 12456, description: 'Əsl dəri, minimalist dizayn. Kişi və qadın üçün.', inStock: true, discount: 24 },
  
  { id: 'a2', title: 'Günəş Gözlüyü', price: 129, originalPrice: 165, category: 'accessories', brand: 'Ziya Premium', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop&q=85', rating: 4.8, reviews: 967, soldCount: 4567, description: 'UV qoruma, hafif çərçivə. Klassik və müasir.', inStock: true, discount: 22 },
  
  { id: 'a3', title: 'Dəri Çanta', price: 149, originalPrice: 195, category: 'accessories', brand: 'Ziya Premium', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&q=85', rating: 4.9, reviews: 1234, soldCount: 5678, description: 'Əsl dəri, laptop bölməli. İş və gündəlik üçün.', inStock: true, discount: 24 },
  
  { id: 'a4', title: 'Kaşmir Şal', price: 44, originalPrice: 60, category: 'accessories', brand: 'Ziya Basics', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=800&fit=crop&q=85', rating: 4.8, reviews: 5432, soldCount: 23456, description: 'Yun və kaşmir qarışığı. Qış aksesuarı.', inStock: true, discount: 27 },
  
  { id: 'a5', title: 'Dəri Kəmər', price: 39, originalPrice: 52, category: 'accessories', brand: 'Ziya Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=85', rating: 4.7, reviews: 4567, soldCount: 19876, description: 'Əsl dəri kəmər, klassik dizayn. Davamlı və stil sahibi.', inStock: true, discount: 25 },
  
  { id: 'a6', title: 'Qadın Əl Çantası', price: 94, originalPrice: 125, category: 'accessories', brand: 'Ziya Woman', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop&q=85', imageAlt: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&q=85', rating: 4.8, reviews: 3456, soldCount: 14567, description: 'Kompakt əl çantası, müxtəlif rənglər. Gündəlik üçün.', inStock: true, discount: 25 },
];

interface CartItem extends Product {
  quantity: number;
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.title} səbətə əlavə edildi`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
        toast.info('Sevimlilərdan çıxarıldı');
      } else {
        newSet.add(productId);
        toast.success('Sevimlilərə əlavə edildi');
      }
      return newSet;
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatNumber = (num: number) => {
    return num.toLocaleString('az-AZ');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Glassmorphism Navigation */}
      <header className="sticky top-0 z-50 glass border-b border-border/40 shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                Ziya Brand
              </h1>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                <button 
                  onClick={() => setActiveCategory('all')}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeCategory === 'all' ? 'text-accent' : 'text-muted-foreground'
                  }`}
                >
                  Hamısı
                </button>
                <button 
                  onClick={() => setActiveCategory('men')}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeCategory === 'men' ? 'text-accent' : 'text-muted-foreground'
                  }`}
                >
                  Kişi
                </button>
                <button 
                  onClick={() => setActiveCategory('women')}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeCategory === 'women' ? 'text-accent' : 'text-muted-foreground'
                  }`}
                >
                  Qadın
                </button>
                <button 
                  onClick={() => setActiveCategory('kids')}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeCategory === 'kids' ? 'text-accent' : 'text-muted-foreground'
                  }`}
                >
                  Uşaq
                </button>
                <button 
                  onClick={() => setActiveCategory('accessories')}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeCategory === 'accessories' ? 'text-accent' : 'text-muted-foreground'
                  }`}
                >
                  Aksesuar
                </button>
              </nav>
            </div>

            {/* Search and Cart */}
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Axtarış..."
                  className="pl-9 w-48 md:w-64 bg-background/60"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-main.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        </div>
        
        <div className="relative container h-full flex items-center">
          <div className="max-w-2xl space-y-6 animate-fade-up">
            <Badge variant="secondary" className="text-sm font-medium">
              Yeni Kolleksiya 2026
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Müasir Moda<br />Kolleksiyaları
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Lüks, zərif və müasir dizaynlar. Ziya Brand ilə stilinizi kəşf edin.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setActiveCategory('women')}
              >
                Qadın Kolleksiyası
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setActiveCategory('men')}
              >
                Kişi Kolleksiyası
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Banners */}
      <section className="container py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="group overflow-hidden cursor-pointer border-border/40 hover:shadow-xl transition-all duration-500"
            onClick={() => setActiveCategory('men')}
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src="/images/category-men.png" 
                alt="Kişi Kolleksiyası"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Kişi</h3>
                <p className="text-sm text-muted-foreground">Klassik və müasir</p>
              </div>
            </div>
          </Card>

          <Card 
            className="group overflow-hidden cursor-pointer border-border/40 hover:shadow-xl transition-all duration-500"
            onClick={() => setActiveCategory('women')}
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src="/images/category-women.png" 
                alt="Qadın Kolleksiyası"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Qadın</h3>
                <p className="text-sm text-muted-foreground">Zərif və şık</p>
              </div>
            </div>
          </Card>

          <Card 
            className="group overflow-hidden cursor-pointer border-border/40 hover:shadow-xl transition-all duration-500"
            onClick={() => setActiveCategory('kids')}
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src="/images/category-kids.png" 
                alt="Uşaq Kolleksiyası"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Uşaq</h3>
                <p className="text-sm text-muted-foreground">Rahat və şən</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container py-12 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            {activeCategory === 'all' ? 'Bütün Məhsullar' : 
             activeCategory === 'men' ? 'Kişi Kolleksiyası' :
             activeCategory === 'women' ? 'Qadın Kolleksiyası' :
             activeCategory === 'kids' ? 'Uşaq Kolleksiyası' : 'Aksesuarlar'}
          </h2>
          <p className="text-muted-foreground">{filteredProducts.length} məhsul</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id}
              className="group overflow-hidden border-border/40 hover:shadow-xl transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* Discount Badge */}
                {product.discount && (
                  <Badge className="absolute top-3 left-3 z-10 bg-destructive text-destructive-foreground">
                    -{product.discount}%
                  </Badge>
                )}
                
                <img 
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500"
                />
                <img 
                  src={product.imageAlt}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-9 w-9 rounded-full shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.has(product.id) ? 'fill-accent text-accent' : ''}`} 
                    />
                  </Button>
                </div>

                {/* Quick Add Button */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Səbətə at
                  </Button>
                </div>
              </div>

              <CardContent className="p-4 space-y-2" onClick={() => setSelectedProduct(product)}>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.brand}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground line-clamp-1">{product.title}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-foreground">{product.price.toFixed(2)} ₼</p>
                  {product.originalPrice && (
                    <p className="text-sm text-muted-foreground line-through">{product.originalPrice.toFixed(2)} ₼</p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{formatNumber(product.soldCount)}+ alınıb</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ziya Brand</h3>
              <p className="text-sm text-muted-foreground">
                Müasir və lüks moda kolleksiyaları. Azərbaycanda premium keyfiyyət.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kateqoriyalar</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => setActiveCategory('men')} className="hover:text-accent transition-colors">Kişi</button></li>
                <li><button onClick={() => setActiveCategory('women')} className="hover:text-accent transition-colors">Qadın</button></li>
                <li><button onClick={() => setActiveCategory('kids')} className="hover:text-accent transition-colors">Uşaq</button></li>
                <li><button onClick={() => setActiveCategory('accessories')} className="hover:text-accent transition-colors">Aksesuar</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Məlumat</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-accent transition-colors">Haqqımızda</button></li>
                <li><button className="hover:text-accent transition-colors">Çatdırılma</button></li>
                <li><button className="hover:text-accent transition-colors">Qaytarma</button></li>
                <li><button className="hover:text-accent transition-colors">Əlaqə</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Əlaqə</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Bakı, Azərbaycan</li>
                <li>info@ziyabrand.az</li>
                <li>+994 12 345 67 89</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            © 2026 Ziya Brand. Bütün hüquqlar qorunur.
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-full max-w-md h-full bg-card shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-border/40">
              <h3 className="text-xl font-bold">Səbət ({cartItemCount})</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                  <p className="text-muted-foreground">Səbət boşdur</p>
                </div>
              ) : (
                cart.map(item => (
                  <Card key={item.id} className="border-border/40">
                    <CardContent className="p-4 flex gap-4">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1 space-y-2">
                        <h4 className="font-semibold text-sm line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.brand}</p>
                        <p className="font-bold">{item.price.toFixed(2)} ₼</p>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 ml-auto"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-border/40 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Cəmi:</span>
                  <span>{cartTotal.toFixed(2)} ₼</span>
                </div>
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                  onClick={() => toast.info('Ödəniş funksiyası tezliklə əlavə ediləcək')}
                >
                  Ödənişə keç
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          />
          <Card className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto border-border/40 shadow-2xl animate-in zoom-in-95 duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10"
              onClick={() => setSelectedProduct(null)}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-[3/4] md:aspect-auto">
                  {selectedProduct.discount && (
                    <Badge className="absolute top-4 left-4 z-10 bg-destructive text-destructive-foreground text-base px-3 py-1">
                      -{selectedProduct.discount}% ENDIRIM
                    </Badge>
                  )}
                  <img 
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-8 space-y-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                      {selectedProduct.brand}
                    </p>
                    <h2 className="text-3xl font-bold mb-4">{selectedProduct.title}</h2>
                    
                    {/* Rating and Reviews - Amazon style */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-accent text-accent' : 'text-muted'}`} 
                          />
                        ))}
                        <span className="font-medium ml-1">{selectedProduct.rating}</span>
                      </div>
                      <span className="text-sm text-accent hover:text-accent/80 cursor-pointer">
                        {formatNumber(selectedProduct.reviews)} rəy
                      </span>
                    </div>

                    {/* Sold Count - AliExpress style */}
                    <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                      <ShoppingCart className="h-4 w-4" />
                      <span>{formatNumber(selectedProduct.soldCount)}+ alınıb</span>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                      <p className="text-4xl font-bold text-accent">
                        {selectedProduct.price.toFixed(2)} ₼
                      </p>
                      {selectedProduct.originalPrice && (
                        <div className="flex flex-col">
                          <span className="text-lg text-muted-foreground line-through">
                            {selectedProduct.originalPrice.toFixed(2)} ₼
                          </span>
                          <span className="text-sm text-destructive font-medium">
                            -{selectedProduct.discount}% endirim
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="space-y-3 pt-4">
                    <Button 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      size="lg"
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Səbətə əlavə et
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full"
                      size="lg"
                      onClick={() => toggleFavorite(selectedProduct.id)}
                    >
                      <Heart 
                        className={`h-5 w-5 mr-2 ${favorites.has(selectedProduct.id) ? 'fill-accent text-accent' : ''}`} 
                      />
                      {favorites.has(selectedProduct.id) ? 'Sevimlilərdə' : 'Sevimlilərə əlavə et'}
                    </Button>
                  </div>

                  {/* Amazon-style benefits */}
                  <div className="pt-6 border-t border-border/40 space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Truck className="h-5 w-5 text-accent" />
                      <span>Pulsuz çatdırılma (50₼-dən yuxarı sifarişlər)</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <RotateCcw className="h-5 w-5 text-accent" />
                      <span>14 gün ərzində pulsuz qaytarma</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Shield className="h-5 w-5 text-accent" />
                      <span>Orijinal məhsul zəmanəti</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
