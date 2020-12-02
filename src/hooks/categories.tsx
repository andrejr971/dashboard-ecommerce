import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import { useToast } from './toast';

// import { Container } from './styles';

export interface ICategory {
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

interface ICategoryContextData {
  categories: ICategory[];
  selectedCatgory: ICategory;
  handleAdd(data: IRequest): Promise<void>;
  handleUpdate(data: IRequest): Promise<void>;
  handleDelete(id: number): Promise<void>;
  selectedCategory: ICategory;
  isVisibleModalNew: boolean;
  isVisibleModalEdit: boolean;
  isVisibleModalDelete: boolean;
  handleModalVisibleAdd(): void;
  handleModalVisibleEdit(): void;
  handleModalVisibleDelete(): void;
  handleSelectedUpate(id: number): Promise<void>;
  handleSelectedDelete(id: number): Promise<void>;
}

const CategoryContext = createContext<ICategoryContextData>(
  {} as ICategoryContextData,
);

const CategoryProvider: React.FC = ({ children }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCatgory, setSelectedCategory] = useState<ICategory>(
    {} as ICategory,
  );
  const [isVisibleModalNew, setIsVisibleModalNew] = useState(false);
  const [isVisibleModalEdit, setIsVisibleModalEdit] = useState(false);
  const [isVisibleModalDelete, setIsVisibleModalDelete] = useState(false);

  const { addToast } = useToast();

  const loadData = useCallback(async () => {
    const response = await api.get('categories');
    setCategories(response.data);
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
    const response = await api.get(`categories/${id}`);

    setSelectedCategory(response.data);
    setIsVisibleModalDelete(true);
  }, []);

  const handleSelectedUpate = useCallback(async (id: number) => {
    const response = await api.get(`categories/${id}`);

    setSelectedCategory(response.data);
    setIsVisibleModalEdit(true);
  }, []);

  const handleSubmitAdd = useCallback(
    async (data: IRequest) => {
      try {
        const response = await api.post('categories', data);

        const dataCategories: ICategory[] = categories;

        dataCategories.push(response.data);

        setCategories(dataCategories);

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
    [addToast, categories],
  );

  const handleSubmitUpdate = useCallback(
    async (data: IRequest) => {
      try {
        const response = await api.put(
          `categories/${selectedCatgory.id}`,
          data,
        );

        let findCategory = categories.findIndex(
          category => category.id === selectedCatgory.id,
        );

        if (!findCategory) findCategory = 0;

        const dataCategories = categories;

        dataCategories[findCategory] = response.data;

        setCategories(dataCategories);

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
    [addToast, categories, selectedCatgory.id],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      await api.delete(`categories/${id}`);

      const dataCategories = categories.filter(category => category.id !== id);

      setCategories(dataCategories);
      setIsVisibleModalDelete(false);

      addToast({
        type: 'success',
        title: 'Sucesso ao deletar',
      });
    },
    [categories, addToast],
  );

  return (
    <CategoryContext.Provider
      value={{
        handleAdd: handleSubmitAdd,
        handleUpdate: handleSubmitUpdate,
        handleDelete,
        categories,
        selectedCatgory,
        selectedCategory: selectedCatgory,
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
    </CategoryContext.Provider>
  );
};

function useCategory(): ICategoryContextData {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error('useCategory must be used within as CategoryProvider');
  }

  return context;
}

export { CategoryProvider, useCategory };
