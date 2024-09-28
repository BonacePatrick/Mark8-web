'use client'

import React, { useEffect } from 'react';
import { useShopStore } from '@/store/shop-stores/shopStore';
import ShopItem from './shopItem';
import { useParams } from 'next/navigation';
import SpinnerLoading from '../Load-indicator/Spinner';

const SingleStorePage: React.FC = () => {
  const { fetchSingleStore, currentStore, isLoading, error } = useShopStore();
  const params = useParams();
  const storeId = params.id as string;

  useEffect(() => {
    if (storeId) {
      fetchSingleStore(storeId);
    }
  }, [storeId, fetchSingleStore]);

  if (isLoading) {
    return <SpinnerLoading/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentStore) {
    return <div>Store not found</div>;
  }

  return (
    <div>
      <ShopItem shop={currentStore} />
    </div>
  );
};

export default SingleStorePage;