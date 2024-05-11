"use client";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const DeleteClientComponent: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3333/items/${id}`);
      toast.success("Item deleted successfully", { position: "top-right" });
      router.refresh();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting item", { position: "top-right" });
    }
  };

  return (
    <Button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded-md"
    >
      Delete Item
    </Button>
  );
};

export default DeleteClientComponent;
