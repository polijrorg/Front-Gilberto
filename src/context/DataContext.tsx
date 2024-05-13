import Seller from '@interfaces/Seller';
import Supervisor from '@interfaces/Supervisor';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Data {
  seller: Seller | null;
  supervisor: Supervisor | null;
}

interface DataContextType {
  data: Data;
  setData: (data: Data) => void;
}

interface Props {
  children: ReactNode;
}

const initialData: Data = {
  seller: null,
  supervisor: null,
};

const DataContext = createContext<DataContextType>({
  data: initialData,
  setData: () => {},
});

export const useDataContext = () => useContext(DataContext);

export const DataProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<Data>(initialData);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
