"use client"
import { useRouter } from 'next/router';
import React from 'react'

const BlogMetaTag = ({item}) => {
    const router = useRouter();


    const titleTag = document.getElementsByTagName("title");

    if (titleTag) {
      titleTag[0].innerText = `${item?.title}`;
    }
  
    const metaKeywords = document.querySelector('meta[name="keywords"]');
  
    if (metaKeywords) {
      const newKeywords = `${item?.title} `;
      metaKeywords.setAttribute("content", newKeywords);
    }
    const metaDescription = document.querySelector('meta[name="description"]');
  
    if (metaDescription) {
      metaDescription.setAttribute("content", item?.seo?.description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
      const newOgTitle = `${item?.title}`;
      ogTitle.setAttribute('content', newOgTitle);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
      ogDescription.setAttribute('content', item?.seo?.description);
  }
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
      const newOgImageUrl =`https://cms.findmyaitool.com${item?.coverImage?.data?.attributes?.url}`;
      ogImage.setAttribute('content', newOgImageUrl);
  }
  const ogSecureImageUrl = document.querySelector('meta[property="og:image:secure_url"]');
  if (ogSecureImageUrl) {
      const newOgSecureImageUrl =`https://cms.findmyaitool.com${item?.coverImage?.data?.attributes?.url}`;
      ogSecureImageUrl.setAttribute('content', newOgSecureImageUrl);
  }
  const ogimgalt = document.querySelector('meta[property="og:image:alt"]');
  if (ogimgalt) {
      const newOgSecureImageUrl = `${item?.title} Logo`;
      ogimgalt.setAttribute('content', newOgSecureImageUrl);
  }
  const twitterSecureImageUrl = document.querySelector('meta[name="twitter:image:secure_url"]');
  if (twitterSecureImageUrl) {
      const newTwitterSecureImageUrl =`https://cms.findmyaitool.com${item?.coverImage?.data?.attributes?.url}`;
      twitterSecureImageUrl.setAttribute('content', newTwitterSecureImageUrl);
  }
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
      const newTwitterTitle = `${item?.title}`;
      twitterTitle.setAttribute('content', newTwitterTitle);
  }
  
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) {
      twitterDescription.setAttribute('content', item?.seo?.description);
  }
  
  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage) {
      const newTwitterImageUrl = `https://cms.findmyaitool.com${item?.coverImage?.data?.attributes?.url}`;
      twitterImage.setAttribute('content', newTwitterImageUrl);
  }
  const ogurl = document.querySelector('meta[property="og:url"]');
  if (ogurl) {
      const newOgUrl = `https://findmyaitool.com${router?.pathname}`
      ogurl.setAttribute('content', newOgUrl);
  }
  const twitterimgalt = document.querySelector('meta[name="twitter:image:alt"]');
  if (twitterimgalt) {
      const newOgUrl = `${item?.title} Logo`
      twitterimgalt.setAttribute('content', newOgUrl);
  }
  const type = document.querySelector('meta[property="og:type"]');
  if (type) {
      type.setAttribute('content', "article");
  }
  return (
    <div>
      
    </div>
  )
}

export default BlogMetaTag
