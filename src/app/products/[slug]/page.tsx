import React from "react";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { sampleProducts } from "@/data/sampleData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return sampleProducts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = sampleProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Apex Machina",
    };
  }

  return {
    title: `${product.name} | Apex Machina Machinery`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = sampleProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = sampleProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
