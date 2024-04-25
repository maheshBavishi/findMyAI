import SubcategoryGpt from '@/module/gptCategory/subcategoryGpt';
import React from 'react'
export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Discover Category Lists for Your Business - FindMyAITool ",
    description:
      "Unlock the full potential of AI for your business with the most accurate and comprehensive AI category lists available online. Find the perfect categories for your products and services, and optimize your marketing strategy for maximum results. Our AI category lists are the result of years of research and development, and provide unparalleled value for businesses of all sizes. With AI Category Lists, you can stay ahead of the competition and take your business to the next level. Click now to get started!",
    keywords:
      "AI gpt Category Lists  ",
  };
}
export default function page( prams) {
  return (
    <div>
      <SubcategoryGpt/>
    </div>
  )
}
