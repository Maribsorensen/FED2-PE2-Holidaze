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
      className="
        relative bg-white rounded-2xl p-6 shadow-lg
        max-w-[100vh] w-full mx-4
        max-h-[100vh] overflow-y-auto
      "
      overlayClassName="
        fixed inset-0 bg-black/50 flex items-center justify-center
        overflow-y-auto
      "
    >
      {children}
    </ReactModal>
  );
}
