'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/axios';

interface Order {
  id: number;
  tableNumber: number;
  total: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    apiClient.get<Order[]>('/api/orders') // ระบุประเภทของข้อมูลที่คาดหวัง
      .then((response) => {
        setOrders(response.data); // ตั้งค่า state ด้วยข้อมูลที่ดึงมา
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {orders.map((order) => (
        <div key={order.id}>
          Table {order.tableNumber} - Total: {order.total} ฿
        </div>
      ))}
    </div>
  );
}
