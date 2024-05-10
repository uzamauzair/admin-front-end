import * as z from "zod";

// Common validators if needed
const nameValidator = z.string().nonempty("required");
const textValidator = z.string().nonempty("required");

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const ItemSchema = z.object({
    name: nameValidator,
    description: textValidator,
    category: z.string().nonempty("required"),
    images: z
        .any()
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    variants: z.array(
        z.object({
            size: z.string().nonempty(),
            price: z.coerce.number().positive(),
            quantity: z.coerce.number().positive(),
        })
    ),
});

export type ItemFormData = z.infer<typeof ItemSchema>;


