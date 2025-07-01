
import { useIsMobile } from "@/hooks/use-mobile";

const CategoryNavigation = () => {
  const isMobile = useIsMobile();

  // Only show on mobile
  if (!isMobile) return null;

  const categories = [
    {
      id: 1,
      name: "CHAINS",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80"
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
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80"
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
