import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import Input from '../Input';
import { Modal} from '../Modal';
import { Form } from './styles';
import { useModal } from '../../hooks/useModal';
import { FoodInput, useFoods } from '../../hooks/useFoods';

export function ModalEditFood() {
  const { editModalIsOpen, onRequestClose } = useModal();
  const { editFood, foodEditing } = useFoods();

  const formRef = useRef(null);

  const handleSubmit = async (food: FoodInput) => {
    editFood(food);
    onRequestClose('edit')
  };

  return (
    <Modal isOpen={editModalIsOpen} onRequestClose={() => onRequestClose('edit')} >
      <Form ref={formRef} onSubmit={handleSubmit} initialData={foodEditing}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>  
  )
}