import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));
const navigate = jest.fn();
useNavigation.mockImplementation(() => ({
  navigate,
}));

it('should navigate to worker profile screen when press on card', () => {});

it('should render avatar image and whatsapp button when has avatarUrl and hasWhatsapp props', () => {});

it('should render text avatar when has avatarUrl prop and do not render whatsapp button when hasWhatsapp prop is falsy', () => {});

it('should call updateFavorite when press on favorite button', async () => {});

it('should display "Novo usuário" when rating is falsy', () => {});
