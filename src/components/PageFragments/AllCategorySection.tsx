"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import HeroCarousel from "../Cards/HeroCarousel";
import Image from "next/image";
import {
  speedImage,
  securityImage,
  supportImage,
  heroBg,
} from "@public/images";

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories;
  const TotalCatgory = Categories?.length - 1;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);

        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`,
              );

              // Check if there is at least one product in the category
              const firstProductImage =
                response?.data.length > 0
                  ? response?.data[0]?.images[0]?.src
                  : null;

              return {
                categoryId: category?.id,
                firstProductImage: firstProductImage, // Store the first product's image
              };
            },
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {},
          );

          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };

  return (
    <>
      <section className="relative min-h-[70dvh] sm:min-h-screen overflow-hidden flex items-center justify-center">
        {/* ─── Layer 1 · Background image ──────────────────────────────────────
          Absolutely positioned so it fills the entire section behind all
          other layers. `object-cover` ensures the image scales to cover the
          container without distortion at any viewport width.
      ──────────────────────────────────────────────────────────────────────── */}
        {/* <div className="absolute inset-0 z-0 opacity-10">
          <Picture
            src={heroBg}
            alt="Laptop keyboard — top-notch accessories backdrop "
            className="w-full h-full object-cover opacity-60"
          />
        </div> */}
        {/* Dark base — ensures the section is dark even before image loads */}
        <div className="absolute inset-0 z-0 bg-[#0a0a0a]" />

        {/* Background image — higher opacity so it's actually visible */}
        <div className="absolute inset-0 z-0">
          <Picture
            src={heroBg}
            alt="Laptop keyboard — top-notch accessories backdrop"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        {/* Gradient overlay — darken edges, keep center visible */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)",
          }}
          aria-hidden="true"
        />

        {/* ─── Layer 3 · Foreground content ────────────────────────────────────
          `z-20`         — sits above the overlay.
          `text-center`  — centres all inline/text content.
          `px-6`         — horizontal breathing room on narrow viewports.
          `max-w-2xl`    — constrains the copy width for comfortable line-lengths.
      ──────────────────────────────────────────────────────────────────────── */}
        <div
          style={{
            fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
          }}
          className="relative z-20 flex flex-col items-center text-center mt-20 md:mt-0 px-6 max-w-4xl mx-auto space-y-5"
        >
          {/* ── Status line ── */}
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-white/60" />
            <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/70 font-medium">
              System Status: Optimal
            </p>
            <div className="h-px w-8 bg-white/60" />
          </div>

          {/* ── Headline ── */}
          <h1
            className="font-bold uppercase text-white leading-[1.05] tracking-tight
    text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Engineered
            <br />
            For <span className="text-[#B040C7]">Evolution.</span>
          </h1>

          {/* ── Sub-copy ── */}
          <p
            className="text-gray-300 font-light leading-relaxed max-w-lg mx-auto
    text-sm sm:text-base lg:text-[17px]"
          >
            The next boundary is internal. High-fidelity biometric tracking
            fused with cybernetic aesthetics for the elite bio-hacker.
          </p>

          {/* ── CTA ── */}
          <div
            className="pt-3"
            style={{
              fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
            }}
          >
            <Link
              href="/category"
              className="
        inline-block
        bg-[#B040C7] hover:bg-[#B040C7]/90
        text-[#FFFFFF] text-xs sm:text-sm
        font-semibold font-serif tracking-[0.2em] uppercase
        px-10 py-3.5
        transition-all duration-200 hover:scale-105
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2CA50]
      "
            >
              Upgrade Humanity
            </Link>
          </div>
        </div>
        {/* /foreground content */}
      </section>

      {/* Category Section Styling Idea */}
      {/* <h5 className="max-w-[1350px] mx-auto mt-[50px] pl-2 md:pl-0 text-#181818 font-bold text-[30px] lg:text-[48px]">
        Popular Products
      </h5>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mx-auto max-w-[1350px] px-2 lg:px-0  mt-6 gap-10">
        {Categories?.slice(0, 5).map((cat) => {
          const productImage = categoryProductsMap[cat?.id];
          return (
            <Link
              key={cat.id}
              href={`/category/${convertToSlug(cat.name)}-${cat.id}`}
              className="group relative h-40 sm:h-48 bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all"
            >
              <Picture
                src={cat.image?.src ?? productImage}
                alt={cat.image?.name}
                className="w-full h-full object-contain opacity-60 group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute bottom-4 left-4">
                <h3 className="text-sm sm:text-lg font-bold text-white uppercase">
                  {cat.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div> */}
      {/* </Carousel> */}
    </>
  );
};

export default AllCategorySection;
