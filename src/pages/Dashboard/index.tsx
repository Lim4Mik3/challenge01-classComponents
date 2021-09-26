import { Header } from '../../components/Header';
import { FoodSelf } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';
import { useFoods } from '../../hooks/useFoods';

export interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export function Dashboard() {
  const { foods } = useFoods();

  return (
    <>
      <Header />
      <ModalAddFood />
      <ModalEditFood /> 

      <FoodsContainer data-testid="foods-list">
        {foods && foods.map(food => 
          (
            <FoodSelf
              key={food.id}
              food={food}
            />
          )
        )}
      </FoodsContainer>
    </>
  )
}