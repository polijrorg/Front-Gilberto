// Importando ReactNode
import React, { createContext, useState, useContext, ReactNode } from 'react';
import ISeller from '@interfaces/Seller';

interface SellerContextType {
  addedSeller: ISeller | null;
  setAddedSeller: (seller: ISeller | null) => void;
}

// Definindo o tipo de children como ReactNode
interface Props {
  children: ReactNode;
}

const SellerContext = createContext<SellerContextType>({
  addedSeller: null,
  setAddedSeller: () => {},
});

export const useSellerContext = () => useContext(SellerContext);

export const SellerProvider: React.FC<Props> = ({ children }) => {
  const [addedSeller, setAddedSeller] = useState<ISeller | null>(null);

  return (
    <SellerContext.Provider value={{ addedSeller, setAddedSeller }}>
      {children}
    </SellerContext.Provider>
  );
};
