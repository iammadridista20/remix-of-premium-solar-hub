import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DBProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge: string | null;
  is_active: boolean;
  display_order: number;
}

export const formatNaira = (amount: number): string => {
  return "₦" + amount.toLocaleString("en-NG");
};

export type Category = "Solar" | "Inverter" | "CCTV" | "Battery" | "All";

export const useProducts = () => {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setProducts(data as unknown as DBProduct[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, refetch: fetchProducts };
};
