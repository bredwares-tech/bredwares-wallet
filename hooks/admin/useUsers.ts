import { useEffect, useState } from "react";

const fetchUsers = async () => {
  const res = await fetch("/api/users/get-users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  remaining_amount: string;
}

const useUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const users = await fetchUsers();
        setData(users);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchUsers,
  };
};

export default useUsers;
