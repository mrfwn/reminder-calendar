import Modal from 'react-modal';
import { CalendarProvider } from './contexts/CalendarContext';
import { Header } from './components/Header';
import { Calendar } from './components/Calendar';
import { GlobalStyle } from './styles/global';
import { NewReminderModal } from './components/NewReminderModal';
import { AlertProvider } from './components/Alert';

Modal.setAppElement('#root');

export const App = () => (
  <CalendarProvider>
    <AlertProvider>
      <Header />
      <Calendar />
      <NewReminderModal />
      <GlobalStyle />
    </AlertProvider>
  </CalendarProvider>
);

