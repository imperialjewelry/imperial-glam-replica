
import { Checkbox } from '@/components/ui/checkbox';

interface FilterSectionProps {
  title: string;
  items: Array<{ name: string; count: number }>;
  selectedItems: string[];
  onToggle: (item: string) => void;
}

const FilterSection = ({ title, items, selectedItems, onToggle }: FilterSectionProps) => {
  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="font-medium text-gray-900 mb-4 uppercase">{title}</h3>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={`desktop-${item.name}`}
                checked={selectedItems.includes(item.name)}
                onCheckedChange={() => onToggle(item.name)}
              />
              <label htmlFor={`desktop-${item.name}`} className="text-sm text-gray-700">
                {item.name}
              </label>
            </div>
            <span className="text-sm text-gray-500">({item.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
