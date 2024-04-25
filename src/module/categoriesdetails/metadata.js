"use client"
import { useRouter } from 'next/router';
import React from 'react'
import { useSelector } from 'react-redux';

const Metadata = () => {
    const { categoryDetails, loading } = useSelector((state) => state.aiTools);
    const router = useRouter();


    const titleTag = document.getElementsByTagName("title");

    if (titleTag) {
      titleTag[0].innerText = `${categoryDetails?.item?.title} - Features, Pricing, Pros & Cons`;
    }
  
    const metaKeywords = document.querySelector('meta[name="keywords"]');
  
    if (metaKeywords) {
      const newKeywords = `${categoryDetails?.item?.title} AI tool, features, pricing, pros, cons, artificial intelligence, machine learning`;
      metaKeywords.setAttribute("content", newKeywords);
    }
    const metaDescription = document.querySelector('meta[name="description"]');
  
    if (metaDescription) {
      metaDescription.setAttribute("content", categoryDetails?.item?.description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
      const newOgTitle = `${categoryDetails?.item?.title} - Features, Pricing, Pros & Cons`;
      ogTitle.setAttribute('content', newOgTitle);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
      ogDescription.setAttribute('content', categoryDetails?.item?.description);
  }
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
      const newOgImageUrl = categoryDetails?.item?.images?.[0];
      ogImage.setAttribute('content', newOgImageUrl);
  }
  const ogSecureImageUrl = document.querySelector('meta[property="og:image:secure_url"]');
  if (ogSecureImageUrl) {
      const newOgSecureImageUrl = categoryDetails?.item?.images?.[0];
      ogSecureImageUrl.setAttribute('content', newOgSecureImageUrl);
  }
  const ogimgalt = document.querySelector('meta[property="og:image:alt"]');
  if (ogimgalt) {
      const newOgSecureImageUrl = `${categoryDetails?.item?.title} Features, Pricing, Pros & Cons Logo`;
      ogimgalt.setAttribute('content', newOgSecureImageUrl);
  }
  const twitterSecureImageUrl = document.querySelector('meta[name="twitter:image:secure_url"]');
  if (twitterSecureImageUrl) {
      const newTwitterSecureImageUrl = categoryDetails?.item?.images?.[0];
      twitterSecureImageUrl.setAttribute('content', newTwitterSecureImageUrl);
  }
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
      const newTwitterTitle = `${categoryDetails?.item?.title} - Features, Pricing, Pros & Cons`;
      twitterTitle.setAttribute('content', newTwitterTitle);
  }
  
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) {
      twitterDescription.setAttribute('content', categoryDetails?.item?.description);
  }
  
  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage) {
      const newTwitterImageUrl = categoryDetails?.item?.images?.[0];
      twitterImage.setAttribute('content', newTwitterImageUrl);
  }
  const ogurl = document.querySelector('meta[property="og:url"]');
  if (ogurl) {
      const newOgUrl = `https://findmyaitool.com${router?.pathname}`
      ogurl.setAttribute('content', newOgUrl);
  }
  const twitterimgalt = document.querySelector('meta[name="twitter:image:alt"]');
  if (twitterimgalt) {
      const newOgUrl = `${categoryDetails?.item?.title} Features, Pricing, Pros & Cons Logo`
      twitterimgalt.setAttribute('content', newOgUrl);
  }
  const type = document.querySelector('meta[property="og:type"]');
  if (type) {
      type.setAttribute('content', "software");
  }
  return (
    <div>
      
    </div>
  )
}

export default Metadata
