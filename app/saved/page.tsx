import SavedProductsPage from '@/components/products/SavedProductsPage'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
  title: "Saved Products | Mark8",
  description: "Your saved products on Mark8",
}

const SavedProductPage = () => {
  return (
    <>
    <SavedProductsPage/>
    </>
  )
}

export default SavedProductPage