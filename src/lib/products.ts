import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import saraswatiImage from "@/assets/saraswati.png";
import hanumanJiImage from "@/assets/Hanuman-ji.png";
import krishnaJiImage from "@/assets/Krishna-Ji.png";
import krishnaRadhaImage from "@/assets/Krishna-Radha.png";
import saraswatiMataImage from "@/assets/Saraswati-Mata.png";
import sherawaliMataImage from "@/assets/Sherawali-Mata.png";

export interface Product {
    id: number;
    name: string;
    slug: string; // SEO friendly URL slug
    category: string;
    subCategory?: string;
    price: string;
    image: string;
    tag: string;
    description: string;
    features: string[];
    dimensions: string;
    weight: string;
    depth: string;
    material: string;
    type: 'ready' | 'custom';
    stock?: number;

    // Rich Content Fields
    longDescription?: string; // HTML or Markdown supported string for the detailed description section
    aboutText?: string;
    careInstructions?: string;
    faqs?: { question: string; answer: string }[];
}

export const products: Product[] = [
    {
        id: 1,
        name: "Luxury Makrana Marble Mandir",
        slug: "luxury-makrana-marble-mandir",
        category: "Ghar Mandir",
        subCategory: "Home Mandir",
        price: "₹1,25,000",
        image: product1,
        tag: "Bestseller",
        description: "A masterpiece of spiritual architecture, featuring intricate hand-carved pillars and a majestic dome.",
        features: ["Hand-carved solid marble", "Gold leafing accents", "Built-in LED lighting points", "Spacious storage drawer"],
        dimensions: "5ft x 3ft",
        weight: "450 Kg",
        depth: "2.5ft",
        material: "Pure Makrana White Marble",
        type: 'custom',
        longDescription: `
            <p><strong>Exceptional Quality:</strong> This mandir is carefully handmade of best-quality Makrana marble rendering it to be extremely durable and long-lasting. The structure is in its purest form and the carvings done on the pillars and dome are completely defined and clear.</p>
            <br/>
            <p><strong>Indoor/Outdoor Decor:</strong> While primarily designed for indoor pooja rooms, the high-quality marble allows for placement in semi-outdoor covered areas. It will increase the aesthetic of the surrounding space. As these are heavy structures, they are sturdy and withstand environmental factors well.</p>
            <br/>
            <p><strong>No maintenance:</strong> No heavy maintenance is required in the long run, as these are completely natural stones. A simple wipe-down keeps it pristine.</p>
            <br/>
            <p><strong>increasing visual interest:</strong> Unique marble mandirs give a remarkable feature to your home while also being visually appealing. It serves as a focal point of spiritual energy in your residence.</p>
            <br/>
            <p><strong>Customizations:</strong> Any design and size can be done on a new piece of art. The Stone Studio works with a wide range of stones, thus any stone is an option for the sculpture. We are always available on WhatsApp if you need further assistance in choosing the right sculpture.</p>
        `,
        aboutText: `Experience the divine serenity with this intricately hand-carved Mandir, made from premium-quality Makrana white marble.
        
        Standing 5 feet tall, this sacred structure features a traditional dome design (Shikhar) and ornate pillars, symbolizing the gateway to the divine.
        
        The mandir features fine details, including floral motifs and Kalash designs, which emphasize its role as a sacred space for your deities.
        
        Ideal for daily worship and meditation, this mandir radiates a calm power, making it perfect for your home.
        
        Every aspect of the mandir—from its proportions to the carving style—reflects the symbolism and precision of Vastu Shastra in ancient Indian craftsmanship.`,
        careInstructions: `Due to its endurance, Makrana marble is ideal for furniture. The stone is resistant to heat and humidity. To prevent dust from accumulating, we advise wiping it with a soft, damp cloth at least once a week. 
        
        Avoid using harsh acidic cleaners like lemon or vinegar on the marble as it may damage the polish. Use mild soap water if necessary.
        
        If you have any questions concerning your Mandir please call us or message on WhatsApp.`,
        faqs: [
            {
                question: "Will this mandir resist yellowing over time?",
                answer: "Yes, we use premium Makrana marble which represents purity and does not yellow easily if maintained properly."
            },
            {
                question: "Do you provide installation services?",
                answer: "For large mandirs, we provide guidance for installation. Local masons can easily assemble the parts as they are pre-fitted and marked."
            },
            {
                question: "Can I customize the size?",
                answer: "Absolutely. This is a made-to-order piece, and we can adjust dimensions to fit your specific pooja room requirements."
            },
            {
                question: "How is it shipped?",
                answer: "It is shipped in wooden crates with foam padding to ensure zero damage during transit. Fully insured."
            }
        ]
    },
    {
        id: 2,
        name: "Pure White Ganesh Ji Idol",
        slug: "pure-white-ganesh-ji-idol",
        category: "Idols",
        subCategory: "Lord Ganesh",
        price: "₹15,500",
        image: product2,
        tag: "Most Popular",
        description: "Expertly carved from high-quality white marble, this Ganesh Ji idol radiates peace and prosperity.",
        features: ["Highly polished finish", "Traditional iconography", "Stable base", "Weather resistant"],
        dimensions: "1.5ft Height",
        weight: "25 Kg",
        depth: "8 inches",
        material: "Alwar White Marble",
        type: 'ready',
        stock: 5,
        longDescription: "<p><strong>Divine Presence:</strong> A stunning representation of Lord Ganesha, the remover of obstacles. Hand-carved from a single block of pristine white marble.</p>",
        aboutText: "Lord Ganesha, the patron of arts and sciences and the deva of intellect and wisdom.",
        careInstructions: "Dust gently with a soft brush. Wash with water occasionally.",
        faqs: [
            { question: "Is this washable?", answer: "Yes, it is made of solid stone and can be washed." },
            { question: "Can I place it outdoors?", answer: "Yes, marble withstands outdoor weather well." }
        ]
    },
    {
        id: 3,
        name: "Traditional Temple Wall Panel",
        slug: "traditional-temple-wall-panel",
        category: "Wall Panels",
        subCategory: "Wall Murals",
        price: "₹45,000",
        image: product3,
        tag: "New Arrival",
        description: "Transform your walls into a work of art with our hand-carved marble panels.",
        features: ["Deep relief carving", "Modular design", "Easy installation", "Customizable patterns"],
        dimensions: "4ft x 2ft",
        weight: "60 Kg",
        depth: "2 inches",
        material: "Pink Marble / White Marble",
        type: 'custom'
    },
    {
        id: 4,
        name: "Custom Bespoke Pooja Mandir",
        slug: "custom-bespoke-pooja-mandir",
        category: "Ghar Mandir",
        subCategory: "Pooja Mandir",
        price: "₹2,50,000",
        image: product1,
        tag: "Premium",
        description: "Our flagship custom mandir service tailored to your vision.",
        features: ["Fully customizable", "Premium material selection", "Artisan consultation", "Priority shipping"],
        dimensions: "Customizable",
        weight: "Varies",
        depth: "Customizable",
        material: "Choice of Premium Marble",
        type: 'custom'
    },
    {
        id: 5,
        name: "Radha Krishna Eternal Love Idol",
        slug: "radha-krishna-eternal-love-idol",
        category: "Idols",
        subCategory: "Lord Krishna",
        price: "₹28,000",
        image: krishnaRadhaImage,
        tag: "Featured",
        description: "A beautiful representation of eternal love carved with exceptional detail.",
        features: ["Detailed facial features", "Gold polish highlights", "One-piece carving", "Collector's edition"],
        dimensions: "2ft x 1.5ft",
        weight: "45 Kg",
        depth: "10 inches",
        material: "White Marble",
        type: 'ready',
        stock: 3
    },
    {
        id: 6,
        name: "Modern Marble Diya Stand",
        slug: "modern-marble-diya-stand",
        category: "Decor Items",
        subCategory: "Decor Items",
        price: "₹4,500",
        image: product3,
        tag: "Popular",
        description: "A minimalist yet elegant addition to your pooja room.",
        features: ["Heat resistant", "Polished surface", "Compact design", "Set of 2"],
        dimensions: "6in x 6in",
        weight: "2 Kg",
        depth: "6in",
        material: "Black / White Marble mix",
        type: 'ready',
        stock: 20
    },
    {
        id: 7,
        name: "Makrana Lakshmi Murti",
        slug: "makrana-lakshmi-murti",
        category: "Goddess Lakshmi",
        subCategory: "Statue Goddess",
        price: "Rs. 18,500",
        image: product2,
        tag: "Festive Pick",
        description: "Graceful Lakshmi murti carved in smooth Makrana marble with polished lotus detailing.",
        features: ["Hand-finished crown", "Gloss polish", "Compact pooja size", "Ideal for gifting"],
        dimensions: "18in Height",
        weight: "18 Kg",
        depth: "9 inches",
        material: "Makrana White Marble",
        type: "ready",
        stock: 8
    },
    {
        id: 8,
        name: "Designer Wall Mounted Mandir",
        slug: "designer-wall-mounted-mandir",
        category: "Wall Mounted Mandir",
        subCategory: "Temple & Mandir",
        price: "Rs. 32,000",
        image: product1,
        tag: "Urban Favorite",
        description: "Space-saving marble mandir designed for modern apartments and compact prayer corners.",
        features: ["Wall-ready format", "Drawer storage", "LED slot support", "Elegant arch carving"],
        dimensions: "3ft x 2ft",
        weight: "70 Kg",
        depth: "14 inches",
        material: "Vietnam White Marble",
        type: "ready",
        stock: 4
    },
    {
        id: 9,
        name: "Premium Hanuman Ji Idol",
        slug: "premium-hanuman-ji-idol",
        category: "Lord Hanuman",
        subCategory: "Statue Gods",
        price: "Rs. 24,000",
        image: hanumanJiImage,
        tag: "Top Rated",
        description: "Detailed Hanuman idol with expressive carving and durable marble finish for temple and home use.",
        features: ["Fine facial carving", "Balanced pedestal", "Weather resistant", "Temple-grade polish"],
        dimensions: "2ft Height",
        weight: "36 Kg",
        depth: "11 inches",
        material: "Alwar White Marble",
        type: "ready",
        stock: 6
    },
    {
        id: 10,
        name: "Custom Krishna Jhula Mandap",
        slug: "custom-krishna-jhula-mandap",
        category: "Lord Krishna",
        subCategory: "Statue Gods",
        price: "Rs. 68,000",
        image: product1,
        tag: "Custom",
        description: "A bespoke marble mandap designed for Krishna idols, festive decoration, and devotional display.",
        features: ["Custom sizes", "Jhula-ready frame", "Lotus motifs", "Consultation included"],
        dimensions: "Customizable",
        weight: "Varies",
        depth: "Customizable",
        material: "Makrana / Vietnam Marble",
        type: "custom"
    },
    {
        id: 11,
        name: "Lotus Marble Fountain",
        slug: "lotus-marble-fountain",
        category: "Fountains",
        subCategory: "Decor Items",
        price: "Rs. 54,000",
        image: product3,
        tag: "Garden Luxury",
        description: "Statement marble fountain with lotus-inspired carving for courtyards, entrances, and temple exteriors.",
        features: ["Outdoor friendly", "Pump-ready layout", "Deep hand carving", "Custom stone choice"],
        dimensions: "4ft Diameter",
        weight: "120 Kg",
        depth: "4ft",
        material: "Pink Marble",
        type: "custom"
    },
    {
        id: 12,
        name: "Carved Marble Tulsi Planter",
        slug: "carved-marble-tulsi-planter",
        category: "Planters",
        subCategory: "Decor Items",
        price: "Rs. 12,500",
        image: product3,
        tag: "New",
        description: "Traditional tulsi planter in carved marble, suitable for balconies, courtyards, and temple entrances.",
        features: ["Drainage support", "Classic floral motif", "Polished edges", "Indoor/outdoor use"],
        dimensions: "24in Height",
        weight: "28 Kg",
        depth: "16 inches",
        material: "White Marble",
        type: "ready",
        stock: 10
    },
    {
        id: 13,
        name: "Heritage Saraswati Idol",
        slug: "heritage-saraswati-idol",
        category: "Goddess Saraswati",
        subCategory: "Statue Goddess",
        price: "Rs. 29,500",
        image: saraswatiMataImage,
        tag: "Featured",
        description: "Elegant Saraswati idol with veena detailing and refined sculpture work for study rooms and temples.",
        features: ["Detailed instrument carving", "Premium finish", "Sturdy base", "Ideal for institutions"],
        dimensions: "2.2ft Height",
        weight: "42 Kg",
        depth: "12 inches",
        material: "Pure White Marble",
        type: "ready",
        stock: 2
    },
    {
        id: 14,
        name: "Temple Entrance Wall Mural",
        slug: "temple-entrance-wall-mural",
        category: "Wall Murals",
        subCategory: "Decor Items",
        price: "Rs. 85,000",
        image: product3,
        tag: "Architect Choice",
        description: "Large-format hand-carved mural panel created for temple entrances, reception spaces, and feature walls.",
        features: ["Large scale carving", "Custom motifs", "Site-specific sizing", "Premium relief work"],
        dimensions: "6ft x 4ft",
        weight: "180 Kg",
        depth: "3 inches",
        material: "White and Pink Marble",
        type: "custom"
    },
    {
        id: 15,
        name: "Pristine Marble Krishna Ji Idol",
        slug: "pristine-marble-krishna-ji-idol",
        category: "Lord Krishna",
        subCategory: "Statue Gods",
        price: "Rs. 32,500",
        image: krishnaJiImage,
        tag: "Divine Choice",
        description: "Beautifully carved marble Krishna Ji idol playing flute, handcrafted from pure white marble.",
        features: ["Flute-playing posture", "Detailed crown design", "Smooth marble polish", "Solid base"],
        dimensions: "2.5ft Height",
        weight: "48 Kg",
        depth: "12 inches",
        material: "Vietnam White Marble",
        type: "ready",
        stock: 3
    },
    {
        id: 16,
        name: "Divine Sherawali Mata (Durga) Murti",
        slug: "divine-sherawali-mata-durga-murti",
        category: "Goddess Durga",
        subCategory: "Statue Goddess",
        price: "Rs. 45,000",
        image: sherawaliMataImage,
        tag: "Festive Special",
        description: "Magnificent Durga Maa statue sitting on her lion vehicle, carved out of single-block premium marble.",
        features: ["Detailed multi-arm carving", "Intricate lion sculpture", "Gold leaf highlights", "Mirror polished finish"],
        dimensions: "3ft Height",
        weight: "85 Kg",
        depth: "18 inches",
        material: "Pure White Alwar Marble",
        type: "ready",
        stock: 1
    }
];
