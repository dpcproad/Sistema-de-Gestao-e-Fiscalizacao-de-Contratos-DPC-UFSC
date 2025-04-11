
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings, User } from "lucide-react";

interface ContractInfo {
  number: string;
  company: string;
  object: string;
  validity: string;
}

interface HeaderProps {
  contractInfo: ContractInfo;
  userProfile: {
    name: string;
    role: string;
    unit: string;
  };
}

export function Header({ contractInfo, userProfile }: HeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Contract Information */}
          <div className="space-y-1">
            <p className="text-sm font-medium">
              <span className="text-gray-500">Contrato:</span>{" "}
              <span className="text-gray-900">{contractInfo.number}</span>
            </p>
            <p className="text-sm font-medium">
              <span className="text-gray-500">Contratada:</span>{" "}
              <span className="text-gray-900">{contractInfo.company}</span>
            </p>
            <p className="text-sm font-medium">
              <span className="text-gray-500">Objeto:</span>{" "}
              <span className="text-gray-900">{contractInfo.object}</span>
            </p>
            <p className="text-sm font-medium">
              <span className="text-gray-500">Vigência:</span>{" "}
              <span className="text-gray-900">{contractInfo.validity}</span>
            </p>
          </div>
          
          {/* User Profile and Settings */}
          <div className="flex items-center gap-4">
            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="text-right mr-2">
                <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                <p className="text-xs text-gray-500">{userProfile.role}</p>
                <p className="text-xs text-gray-500">{userProfile.unit}</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
            
            {/* Settings Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  Mudar de Contrato
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
