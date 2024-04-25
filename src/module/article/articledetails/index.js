"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/shared/components/Loader';
import { getArticle } from '@/store/ApiSlice/articleSlice';
import Blogdetailsbanner from '@/module/blogdetails/blogdetailsbanner';
import Blogdetailslist from '@/module/blogdetails/blogdetailslist';
import { setCurrentPage } from '@/store/ApiSlice/gptSlice';
import { useRouter } from 'next/router';

export default function ArticleDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { ArticleLoading } = useSelector((state) => state.article);

  useEffect(() => {

    dispatch(getArticle({})).unwrap()
      .then(() => {
      })
      .catch(() => {
      });
  }, [router?.pathname])
  useEffect(() => { dispatch(setCurrentPage(1)) }, [])

  return (
    <div>


      <Blogdetailsbanner />
      <Blogdetailslist />



    </div>
  )
}
