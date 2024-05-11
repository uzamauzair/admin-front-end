"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ItemFormData, ItemSchema } from "@/validators/items";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Molecules/card";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Sidebar from "@/components/Sidebar";

const UpdateItem = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("_id");
  const name = searchParams.get("name");
  const description = searchParams.get("description");
  const category = searchParams.get("category");
  let variants = searchParams.get("variants");
  const images = searchParams.get("images");

  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [categorySelect, setCategorySelect] = useState(category);

  variants = JSON.parse(variants);

  const defaultVariants = variants || [
    { size: "small", price: 0, quantity: 0 },
    { size: "medium", price: 0, quantity: 0 },
    { size: "large", price: 0, quantity: 0 },
  ];

  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      name: name || "",
      description: description || "",
      images: undefined,
      variants: defaultVariants,
      category: category || "",
    }, // Set default values based on item data
  });

  type Category = {
    name: "";
    _id: "";
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3333/categories");
        // Update the categories state with category names
        console.log("Respons", response.data);

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories(); // Call the fetchCategories function
  }, []); // Empty dependency array means this effect runs once on component mount

  const fileRef = form.register("images");
  const onSubmit = async (data: z.infer<typeof ItemSchema>) => {
    console.log("Data", data);

    const selectedCategory = categories.find(
      (category: Category) => category.name === categorySelect
    );
    console.log("Selected", selectedCategory);

    if (selectedCategory) {
      // Set the category ID in the formData
      data.category = selectedCategory._id;
    }
    console.log("FormData", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("categoryId", data.category);
    formData.append("images", data.images[0]); // Assuming images is an array of File objects
    formData.append("variants", JSON.stringify(data.variants));

    console.log("Final", formData);

    try {
      const response = await axios.put(
        `http://localhost:3333/items/${id}`,
        formData
      );
      console.log("Item updated successfully:", response.data);
      toast.success("Item Updated Successfully", {
        position: "top-right",
      });
      router.push("/items");
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Error updating item", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <div className="z-10 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-grow flex flex-col bg-white">
          <div className="flex items-center  text-center h-16 px-4 border-b">
            <h1 className="text-2xl  text-brand-blue font-semibold">
              Add Items
            </h1>
          </div>
          <div className="text-black p-4 flex-grow w-2/3 ">
            <Card>
              <CardHeader>
                <CardTitle>Update Item</CardTitle>
                <CardDescription>Update an existing Item</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    encType="multipart/form-data"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="pb-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Item Name</FormLabel>
                            <FormControl>
                              <Input
                                required
                                id="name"
                                placeholder="Enter Name of the Item"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="pb-3">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input
                                required
                                id="description"
                                placeholder="Description of the Item"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="pb-3">
                      <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Item Image</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Image of the Item"
                                type="file"
                                {...fileRef}
                                // onChange={handleImageChange}
                                onChange={(event) => {
                                  field.onChange(
                                    event.target?.files?.[0] ?? undefined
                                  );
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Variants */}
                    <div className="flex items-center space-x-4 p-3">
                      <Label>Small Size</Label>
                      <div className="flex flex-col space-y-2">
                        <FormField
                          control={form.control}
                          name={`variants.0.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  id="price"
                                  placeholder="Price"
                                  {...field}
                                  type="number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`variants.0.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  id="description"
                                  placeholder="Quantity "
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* Medium Size */}
                      <label htmlFor="mediumSize" className="mb-2">
                        Medium Size
                      </label>
                      <div className="flex flex-col space-y-2">
                        <FormField
                          control={form.control}
                          name={`variants.1.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  id="price"
                                  placeholder="Price"
                                  {...field}
                                  type="number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`variants.1.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  id="description"
                                  placeholder="Quantity "
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* Large Size */}
                      <label htmlFor="smallSize" className="mb-2">
                        Large Size
                      </label>
                      <div className="flex flex-col space-y-2">
                        <FormField
                          control={form.control}
                          name={`variants.2.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  id="price"
                                  placeholder="Price"
                                  {...field}
                                  type="number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`variants.2.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  id="description"
                                  placeholder="Quantity "
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="py-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            Select Category : {categorySelect}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 m-4 bg-black">
                          <DropdownMenuRadioGroup
                            value={categorySelect}
                            onValueChange={setCategorySelect}
                            // {...field}
                          >
                            {categories.map((category: Category) => (
                              <DropdownMenuRadioItem
                                key={category._id}
                                value={category.name}
                              >
                                {category.name}
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <Button
                      type="submit"
                      className="flex items-center pt-2 px-4 py-2 bg-brand-blue text-white rounded-md"
                      variant={"outline"}
                    >
                      Submit
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateItem;
