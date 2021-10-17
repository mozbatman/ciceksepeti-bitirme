import { Modal } from 'react-bootstrap';
import Button from '../../form/Button/Button';
import styles from './BuyModal.module.scss'; 

const BuyModal = ({ open, closeModal, buyProduct }) => {
  const _buyProduct = () => {
      buyProduct();
  };

  return (
      <Modal show={open} onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
              <Modal.Title>Satın Al</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p className={styles.buyModalBody}>Satın almak istiyor musunuz?</p>
          </Modal.Body>
          <Modal.Footer>
              <div className={styles.buttonGroup}>
                  <Button text="İptal" className="secondary" type="button" onClick={closeModal} />
                  <Button text="Satın al" className="primary" type="button" onClick={_buyProduct} />
              </div>
          </Modal.Footer>
      </Modal>
  );
};

export default BuyModal;