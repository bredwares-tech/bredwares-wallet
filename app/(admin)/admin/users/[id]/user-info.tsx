import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserInfoProps {
  user: {
    full_name: string;
    email: string;
    total_amount: number;
  };
}

export function UserInfo({ user }: UserInfoProps) {
  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="text-2xl">
            {getInitials(user.full_name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{user.full_name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Total Amount</h3>
        <p className="text-3xl font-bold">${user.total_amount}</p>
      </div>
    </div>
  );
}
