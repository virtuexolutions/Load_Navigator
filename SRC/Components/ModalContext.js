import React, {createContext, useState, useContext} from 'react';
import CustomAlertModal from './CustomAlertModal';
// import CustomModal from '../components/CustomModal';

const ModalContext = createContext();

export const ModalProvider = ({children}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalMessage, setModalMessage] = useState('');

  const showModal = message => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalMessage('');
  };

  return (
    <ModalContext.Provider value={{showModal, hideModal}}>
      {children}
      <CustomAlertModal
        isModalVisible={modalVisible}
        message={modalMessage}
        onClose={hideModal}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
