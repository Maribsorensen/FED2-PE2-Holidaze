import type { ReactNode } from 'react';
import ReactModal from 'react-modal';

/**
 * Modal component that renders a dialog using `react-modal`.
 *
 * Features:
 * - Controlled visibility with the `isOpen` prop.
 * - Calls `onClose` callback when the modal is requested to close.
 * - Renders arbitrary content via `children`.
 * - Custom styling for modal content and overlay with Tailwind CSS classes.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Determines whether the modal is visible.
 * @param {() => void} props.onClose - Callback invoked when the modal should close (e.g., overlay click or ESC key).
 * @param {ReactNode} props.children - Content to render inside the modal.
 *
 * @example
 * <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
 *   <div>Modal Content</div>
 * </Modal>
 *
 * @returns {JSX.Element} The Modal component.
 */

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
        fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center
        overflow-y-auto
      "
    >
      {children}
    </ReactModal>
  );
}
