import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface MenuCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
}

const MenuCard = ({ title, description, icon: Icon, to }: MenuCardProps) => {
  return (
    <Link
      to={to}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100"
    >
      <div className="flex items-center mb-4">
        <Icon className="h-8 w-8 text-primary mr-3" />
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};

export default MenuCard;