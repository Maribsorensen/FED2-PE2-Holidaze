import type { ReactNode } from 'react';
import ReactModal from 'react-modal';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center"
    >
      {children}
    </ReactModal>
  );
}
