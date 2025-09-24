import { ToastBar, Toaster, ToastIcon } from 'react-hot-toast';

export function AppToaster() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }}>
        {(t) => (
          <ToastBar toast={t}>
            {({ message }) => (
              <div className="animate-fade z-50 bg-cta text-white rounded shadow-lg px-6 py-3 text-sm flex items-center gap-2">
                <ToastIcon toast={t} />
                <span>{message}</span>
              </div>
            )}
          </ToastBar>
        )}
      </Toaster>

      <style>{`
        @keyframes fade {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fade {
          animation: fade 3s forwards;
        }
      `}</style>
    </>
  );
}
