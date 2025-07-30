
import { useIsMobile } from "@/hooks/use-mobile";

const CategoryNavigation = () => {
  const isMobile = useIsMobile();

  // Don't show on mobile - only show on desktop if needed
  if (isMobile) return null;

  const categories = [
    {
      id: 1,
      name: "CHAINS",
      image: "https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/chains//infinitylink.webp"
    },
    {
      id: 2,
      name: "BRACELETS", 
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "CUSTOM",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "EARRINGS",
      image: "https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/earrings//dart.webp"
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="overflow-x-auto">
        <div className="flex space-x-4 px-4 pb-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0 w-32 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg mb-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center text-sm font-medium text-gray-900">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryNavigation;
