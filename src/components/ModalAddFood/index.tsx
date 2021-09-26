import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Modal } from '../Modal';
import Input from '../Input';

import { Form } from './styles';
import { useModal } from '../../hooks/useModal';
import { FoodInput, useFoods } from '../../hooks/useFoods';

export function ModalAddFood() {
  const { onRequestClose, addModalIsOpen } = useModal();
  const { addFood } = useFoods();
  const formRef = useRef(null);

  const handleSubmit = async (food: FoodInput) => {
    addFood(food)
    onRequestClose('add');
  };

  return (
    <Modal isOpen={addModalIsOpen} onRequestClose={() => onRequestClose('add')}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}