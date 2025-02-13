import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  user: {
    id: string;
    full_name: string;
    email: string;
    total_amount: number | null;
    created_at: string;
    is_Admin: boolean;
    remaining_amount: string | null;
  };
}

export function UserInfo({ user }: UserInfoProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const totalCredits = user.total_amount ?? 0; // Default to 0 if null/undefined
  const remainingCredits = Number(user.remaining_amount) || 0; // Convert string to number & default to 0

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32 mb-4 sm:mb-0">
            <AvatarFallback className="text-2xl sm:text-4xl">
              {getInitials(user.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h2 className="text-2xl sm:text-3xl font-bold mb-1">
              {user.full_name}
            </h2>
            <p className="text-gray-500 mb-2">{user.email}</p>
            <div className="flex items-center space-x-2">
              <Badge variant={user.is_Admin ? "default" : "secondary"}>
                {user.is_Admin ? "Admin" : "User"}
              </Badge>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-400">
                Member since {formatDate(user.created_at)}
              </span>
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Credits */}
          <div className="bg-card p-4 rounded-lg border flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Credits</h3>
            <div className="flex items-center space-x-2">
              <Image src="/coin.png" alt="Coin Icon" width={24} height={24} />
              <span className="text-2xl font-bold">{totalCredits}</span>
            </div>
          </div>

          {/* Remaining Credits */}
          <div className="bg-card p-4 rounded-lg border flex items-center justify-between">
            <h3 className="text-lg font-semibold">Remaining Credits</h3>
            <div className="flex items-center space-x-2">
              <Image src="/coin.png" alt="Coin Icon" width={24} height={24} />
              <span className="text-2xl font-bold">{remainingCredits}</span>
            </div>
          </div>

          {/* Account Created */}
          <div className="bg-card p-4 rounded-lg border sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-2">Account Created</h3>
            <p className="text-xl">{formatDate(user.created_at)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}