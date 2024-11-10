'use client'; // Indica que este archivo es un componente del lado del cliente

import React, { createContext, useContext, useState } from 'react';

// Definimos el contexto con un valor por defecto
const OrderContext = createContext(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder debe usarse dentro de un OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(null);

  const addOrder = (newOrder) => {
    setOrders(newOrder);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
