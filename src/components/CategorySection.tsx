import { Button } from '@/components/ui/button';

const CategorySection = () => {
  const categories = [
    {
      name: "CHAINS",
      image: "https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/chains//infinitylink.webp"
    },
    {
      name: "BRACELETS", 
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "CUSTOM",
      image: "https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/6ACB04DC-1C32-49D1-996D-DFF4B862DA7D.webp"
    },
    {
      name: "EARRINGS",
      image: "https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/earrings//dart.webp"
    },
    {
      name: "WATCHES",
      image: "https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/watches//rolexoysterperpetuasl.webp"
    },
    {
      name: "GRILLZ",
      image: "https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/grillz//IMG_5019%20(1).webp"
    },
    {
      name: "RINGS",
      image: "https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/Fat_Fuq.webp"
    },
    {
      name: "PENDANTS",
      image: "https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/earrings//skullpendanyt.webp"
    },
    {
      name: "GLASSES",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gray-600 text-sm font-medium mb-2">SHOP BY</p>
          <h2 className="text-4xl font-bold text-gray-900">CATEGORY</h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 mb-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group cursor-pointer text-center"
            >
              <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm font-semibold text-gray-900 uppercase">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
