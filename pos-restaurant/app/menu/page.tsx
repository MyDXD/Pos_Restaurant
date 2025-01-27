'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/axios';

interface Menu {
  id: number;
  name: string;
  price: number;
  category: string;
}

export default function MenuPage() {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    apiClient.get<Menu[]>('/api/menu')
      .then((response) => {
        setMenus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Restaurant Menu</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <div key={menu.id} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700">{menu.name}</h2>
              <p className="text-gray-600 mt-2">Category: {menu.category}</p>
              <p className="text-lg font-bold text-green-600 mt-4">{menu.price.toFixed(2)} ฿</p>
              <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-full">
                Add to Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
