import { useEffect, useState } from 'react';

import api from '../../services/api';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { FoodProps } from '../../pages/Dashboard';
import { useModal } from '../../hooks/useModal';
import { useFoods } from '../../hooks/useFoods';

import { Container } from './styles';

interface FoodSelfProps {
  food: FoodProps;
}

export function FoodSelf({ food }: FoodSelfProps) {
  const [isAvailable, setIsAvailable] = useState(false);

  const { onRequestOpen } = useModal();
  const { setFoodEditing, deleteFood } = useFoods();

  useEffect(() => {
    setIsAvailable(food.available)
  }, [food.available])

  const toggleAvailable = async () => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(preventState => !preventState);
  }

  const handleEditFood = () => {
    onRequestOpen('edit')
    setFoodEditing(food);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={handleEditFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => deleteFood(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  )
}