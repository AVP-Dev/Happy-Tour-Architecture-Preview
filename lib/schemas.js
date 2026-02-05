// lib/schemas.js
import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  contact: z.string().min(5, "Контактная информация должна быть указана"),
  message: z.string().optional(),
  recaptchaToken: z.string(),
  tour: z.object({
    title: z.string(),
    price: z.coerce.number(),
    currency: z.string()
  }).optional()
});

export const ReviewSchema = z.object({
  author: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  text: z.string().min(10, "Отзыв должен содержать не менее 10 символов"),
  rating: z.coerce.number().int().min(1).max(5),
  recaptchaToken: z.string(),
});

export const AdminTourSchema = z.object({
  title: z.string().min(3, "Название тура должно содержать не менее 3 символов"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Цена должна быть положительным числом"),
  currency: z.string(),
  category: z.string(),
  image_url: z.string().url("Неверный формат URL изображения"),
  published: z.boolean(),
  // SEO Fields
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  imageAlt: z.string().optional().nullable(),
});

export const AdminUserSchema = z.object({
  name: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  email: z.string().email("Неверный формат email"),
  password: z.union([z.string().min(8, "Пароль должен содержать не менее 8 символов"), z.literal("")]).optional(),
  role: z.enum(['super_admin', 'admin', 'marketer', 'seo']),
  canManageSeo: z.boolean().optional(),
});

export const PatchTourSchema = z.object({
  id: z.string(),
  published: z.boolean(),
});

export const SeoPageSchema = z.object({
  routeKey: z.string().min(1, "Route Key обязателен"),
  title: z.string().min(1, "Title обязателен"),
  description: z.string().min(1, "Description обязателен"),
  h1: z.string().optional().nullable(),
  seoText: z.string().optional().nullable(),
  keywords: z.string().optional().nullable(),
  robots: z.string().optional().nullable(),
  // New API Fields
  canonicalUrl: z.string().optional().nullable(),
  structuredData: z.string().optional().nullable(),
  ogTitle: z.string().optional().nullable(),
  ogDescription: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
});
