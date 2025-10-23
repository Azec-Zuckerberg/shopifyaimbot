import React from 'react';
import { useTranslation } from 'react-i18next';
import OptimizedGlass from './OptimizedGlass';

interface OfferSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockAllSelect: () => void;
  onGameSelect: () => void;
}

const popupAnimation = `
@keyframes popup {
  0% { opacity: 0; transform: scale(0.85); }
  100% { opacity: 1; transform: scale(1); }
}
.offer-modal-popup { animation: popup 0.35s cubic-bezier(0.22,1,0.36,1); }
`;

const OfferSelectionModal: React.FC<OfferSelectionModalProps> = ({
  isOpen,
  onClose,
  onUnlockAllSelect,
  onGameSelect,
}) => {
  const { t } = useTranslation();
  const getText = (key: string, fallback: string) => {
    const translated = t(key);
    return translated === key ? fallback : translated;
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{popupAnimation}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative w-full max-w-md">
          <OptimizedGlass
            variant="ultra"
            className="offer-modal-popup px-6 py-6 sm:px-8 sm:py-8 shadow-2xl rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent"
          >
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {getText('offer_selection_title', 'Choose Your Offer')}
              </h2>
              <p className="text-sm text-white/60">
                {getText('offer_selection_desc', 'Select the option you want to redeem right now.')}
              </p>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/40 transition-colors hover:text-white focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={onUnlockAllSelect}
                className="group relative flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-5 py-5 text-left transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:shadow-lg"
              >
                <div>
                  <div className="text-lg font-semibold text-white flex items-center gap-2">
                    <span>Unlock All</span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/80">
                      {getText('offer_includes_unlockall', 'Lifetime Access')}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">
                    {getText('offer_unlockall_desc', 'Instantly unlock every camo, attachment, and operator.')}
                  </p>
                </div>
                <svg
                  className="h-6 w-6 text-white/40 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={onGameSelect}
                className="group relative flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-5 py-5 text-left transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:shadow-lg"
              >
                <div>
                  <div className="text-lg font-semibold text-white flex items-center gap-2">
                    <span>BO7 Full Game</span>
                    <span className="rounded-full bg-green-500/25 px-2 py-0.5 text-xs font-medium text-green-200">
                      {getText('offer_bestseller_badge', 'Best Value')}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">
                    {getText('offer_game_desc', 'Receive a full game key for your favorite platform.')}
                  </p>
                </div>
                <svg
                  className="h-6 w-6 text-white/40 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </OptimizedGlass>
        </div>
      </div>
    </>
  );
};

export default OfferSelectionModal;


