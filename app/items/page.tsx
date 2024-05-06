import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Molecules/card";
import { buttonVariants } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Molecules/table";
import { LinkIcon } from "lucide-react";
import axios from "axios"; // Import Axios for API calls
import Image from "next/image";
import { getAccessToken } from "@auth0/nextjs-auth0";

type ItemType = {
  _id: string;
  name: string;
  description: string;
  category: string;
  categoryId: string; // Add categoryId field
  images: string[];
  variants: {
    size: string;
    price: number;
    quantity: number;
  }[];
};

const Items = async () => {
  // Function to fetch items data from API
  let items: any[] = [];
  const token = await getAccessToken();

  console.log("Items", token);
  const data: any = await axios.get<ItemType[]>("http://localhost:3333/items", {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  items = data.data;
  console.log("Items", items);

  // Function to handle item update onClick
  const handleUpdate = (itemId: string) => {
    // Handle update logic here, using itemId to identify the item to be updated
    console.log("Updating item with ID:", itemId);
  };

  // Function to get category name by ID
  const getCategoryName = async (categoryId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3333/categories/${categoryId}`
      );
      return response.data.name; // Assuming the response contains the category name
    } catch (error) {
      console.error("Error fetching category name:", error);
      return ""; // Return empty string if there's an error
    }
  };

  return (
    <>
      <Head>
        <title>Quick Eats: Items</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen bg-gray-100">
        <div className="z-10 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-grow flex flex-col bg-white">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h1 className="text-2xl text-brand-blue font-semibold">Items</h1>
            <Link href="/items/add">
              <Button
                variant="outline"
                className="flex items-center px-4 py-2 bg-brand-blue text-white rounded-md"
              >
                <MdAdd size={30} />
                <span className="ml-2">Add Item</span>
              </Button>
            </Link>
          </div>
          <div className="p-4 flex-grow">
            <Card className="text-black">
              <CardHeader>
                <CardTitle>Items</CardTitle>
                <CardDescription>A list of all Items.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Name</TableHead>
                      <TableHead className="text-center">Description</TableHead>
                      <TableHead className="text-center">Category</TableHead>
                      <TableHead className="text-center">Image</TableHead>
                      <TableHead className="text-center">Small</TableHead>
                      <TableHead className="text-center">Medium</TableHead>
                      <TableHead className="text-center">Large</TableHead>
                      <TableHead className="text-center">Update</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.length !== 0 ? (
                      items.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className="text-center">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.description}
                            </TableCell>
                            <TableCell className="text-center">
                              {/* Display category name */}
                              {item.category}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.images && item.images.length > 0 && (
                                <Image
                                  src={item.images[0]}
                                  alt="Item Image"
                                  className="w-25 h-20"
                                  width={100}
                                  height={80}
                                />
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              Price : {item.variants[0].price}
                              <br /> Quantity : {item.variants[0].quantity}
                            </TableCell>
                            <TableCell className="text-center">
                              Price : {item.variants[1].price} <br /> Quantity :{" "}
                              {item.variants[1].quantity}
                            </TableCell>
                            <TableCell className="text-center">
                              Price : {item.variants[2].price} <br /> Quantity :{" "}
                              {item.variants[2].quantity}
                            </TableCell>
                            <TableCell className="text-center">
                              <Link
                                className={buttonVariants({
                                  variant: "outline",
                                })}
                                href={`items/update/${item._id}`}
                              >
                                Update
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                          No records.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Items;
