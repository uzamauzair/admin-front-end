"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Molecules/card";
import Sidebar from "@/components/Sidebar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ItemFormData, ItemSchema } from "@/validators/items";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { z } from "zod";
import { toast } from "react-toastify";

type Category = {
  name: "";
  _id: "";
};
const AddItem = () => {
  const [categories, setCategories] = useState([]);
  const [categorySelect, setCategorySelect] = useState("");

  const form = useForm<z.infer<typeof ItemSchema>>({
    // resolver: zodResolver(ItemSchema),
    defaultValues: {
      name: "",
      description: "",
      images: undefined,
      variants: [
        {
          size: "small",
          price: 0, // Default to 0 if price is undefined
          quantity: 0, // Default to 0 if quantity is undefined
        },
        {
          size: "medium",
          price: 0, // Default to 0 if price is undefined
          quantity: 0, // Default to 0 if quantity is undefined
        },
        {
          size: "large",
          price: 0, // Default to 0
          quantity: 0, // Default to 0 if
        },
      ],
      category: "",
    },
  });

  const fileRef = form.register("images");

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
      const response = await axios.post(
        "http://localhost:3333/items",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Item added successfully:", response.data);
      form.reset();
      toast.success("Item Created Successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Error adding item", {
        position: "top-right",
      });
      // Handle errors, such as displaying an error message to the user
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
                <CardTitle>Create Item</CardTitle>
                <CardDescription>Create a new Item</CardDescription>
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
                                required
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

export default AddItem;
