import { FiPlusSquare } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';
import { useModal } from '../../hooks/useModal';

import { Container } from './styles';

export function Header() {
  const { onRequestOpen } = useModal()

  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button
              type="button"
              onClick={() => onRequestOpen('add')}
            >
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  )
}
