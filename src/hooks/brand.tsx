import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import { useToast } from './toast';

export interface IBrand {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface IRequest {
  name: string;
  description: string;
}

interface IBrandContextData {
  brands: IBrand[];
  handleAdd(data: IRequest): Promise<void>;
  handleUpdate(data: IRequest): Promise<void>;
  handleDelete(id: number): Promise<void>;
  selectedBrand: IBrand;
  isVisibleModalNew: boolean;
  isVisibleModalEdit: boolean;
  isVisibleModalDelete: boolean;
  handleModalVisibleAdd(): void;
  handleModalVisibleEdit(): void;
  handleModalVisibleDelete(): void;
  handleSelectedUpate(id: number): Promise<void>;
  handleSelectedDelete(id: number): Promise<void>;
}

const BrandContext = createContext<IBrandContextData>({} as IBrandContextData);

const BrandProvider: React.FC = ({ children }) => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<IBrand>({} as IBrand);
  const [isVisibleModalNew, setIsVisibleModalNew] = useState(false);
  const [isVisibleModalEdit, setIsVisibleModalEdit] = useState(false);
  const [isVisibleModalDelete, setIsVisibleModalDelete] = useState(false);

  const { addToast } = useToast();

  const loadData = useCallback(async () => {
    const response = await api.get('brands');
    setBrands(response.data);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleModalVisibleAdd = useCallback(() => {
    setIsVisibleModalNew(!isVisibleModalNew);
  }, [isVisibleModalNew]);

  const handleModalVisibleEdit = useCallback(() => {
    setIsVisibleModalEdit(!isVisibleModalEdit);
  }, [isVisibleModalEdit]);

  const handleModalVisibleDelete = useCallback(() => {
    setIsVisibleModalDelete(!isVisibleModalDelete);
  }, [isVisibleModalDelete]);

  const handleSelectedDelete = useCallback(async (id: number) => {
    const response = await api.get(`brands/${id}`);

    setSelectedBrand(response.data);
    setIsVisibleModalDelete(true);
  }, []);

  const handleSelectedUpate = useCallback(async (id: number) => {
    const response = await api.get(`brands/${id}`);

    setSelectedBrand(response.data);
    setIsVisibleModalEdit(true);
  }, []);

  const handleSubmitAdd = useCallback(
    async (data: IRequest) => {
      try {
        const response = await api.post('brands', data);

        const dataBrands: IBrand[] = brands;

        dataBrands.push(response.data);

        setBrands(dataBrands);

        addToast({
          type: 'success',
          title: 'Sucesso ao cadastrar',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Ocorreu um erro ao cadastrar',
        });
      }
    },
    [addToast, brands],
  );

  const handleSubmitUpdate = useCallback(
    async (data: IRequest) => {
      try {
        const response = await api.put(`brands/${selectedBrand.id}`, data);

        let findBrand = brands.findIndex(
          category => category.id === selectedBrand.id,
        );

        if (!findBrand) findBrand = 0;

        const dataBrands = brands;

        dataBrands[findBrand] = response.data;

        setBrands(dataBrands);

        addToast({
          type: 'success',
          title: 'Sucessona atualização',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Ocorreu um erro ao atualizar ',
        });
      }
    },
    [addToast, brands, selectedBrand.id],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      await api.delete(`brands/${id}`);

      const dataBrands = brands.filter(category => category.id !== id);

      setBrands(dataBrands);
      setIsVisibleModalDelete(false);

      addToast({
        type: 'success',
        title: 'Sucesso ao deletar',
      });
    },
    [brands, addToast],
  );

  return (
    <BrandContext.Provider
      value={{
        handleAdd: handleSubmitAdd,
        handleUpdate: handleSubmitUpdate,
        handleDelete,
        brands,
        selectedBrand,
        handleModalVisibleAdd,
        handleModalVisibleDelete,
        handleModalVisibleEdit,
        handleSelectedDelete,
        handleSelectedUpate,
        isVisibleModalDelete,
        isVisibleModalEdit,
        isVisibleModalNew,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

function useBrand(): IBrandContextData {
  const context = useContext(BrandContext);

  if (!context) {
    throw new Error('useBrand must be used within as BrandProvider');
  }

  return context;
}

export { BrandProvider, useBrand };
