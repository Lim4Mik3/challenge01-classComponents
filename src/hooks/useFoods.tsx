import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import api from '../services/api';

interface FoodDTO {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export type FoodInput = Omit<FoodDTO, 'id' | 'available'>

interface FoodsContextProps {
  foods: FoodDTO[];
  foodEditing: FoodDTO;
  addFood: (food: FoodInput) => Promise<void>;
  editFood: (food: FoodInput) => Promise<void>;
  deleteFood: (foodId: number) => Promise<void>;
  setFoodEditing: (food: FoodDTO) => void;
}

interface FoodsContextProviderProps {
  children: ReactNode;
}

const FoodsContext = createContext<FoodsContextProps>({} as FoodsContextProps);

export function FoodsContextProvider({ children }: FoodsContextProviderProps) {
  const [foods, setFoods] = useState<FoodDTO[]>([]);
  const [foodEditing, setFoodEditing] = useState<FoodDTO>({} as FoodDTO)

  useEffect(() => {
    (async function() {
      const { data } = await api.get('/foods');

      setFoods(data) 
    })()
  }, []) 

  async function addFood (food: FoodInput) {
    try {
      const { data } = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, data])
    } catch (error) {
      console.log(error);
    }
  }

  async function editFood (food: FoodInput) {
    try {
      const foodUpdated = await api.put(
        `/foods/${foodEditing.id}`,
        { ...foodEditing, ...food },
      );

      const foodsUpdated = foods.map(food =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data,
      );

      setFoods([...foodsUpdated]);
    } catch (err) {
      console.log(err)
    }
  }

  async function deleteFood (foodId: number) {
    await api.delete(`/foods/${foodId}`);

    const foodsFiltered = foods.filter(food => food.id !== foodId);

    setFoods([...foodsFiltered]);
  }

  return (
    <FoodsContext.Provider value={{
      foods,
      foodEditing,
      addFood,
      editFood,
      setFoodEditing,
      deleteFood
    }}>
      {children}
    </FoodsContext.Provider>
  )
}

export const useFoods = () => {
  const foodsContextData = useContext(FoodsContext);

  return foodsContextData;
}