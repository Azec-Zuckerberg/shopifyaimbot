import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OptimizedGlass from './OptimizedGlass';

interface PlatformSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  stripeLink: string;
}

const popupAnimation = `
@keyframes popup {
  0% { opacity: 0; transform: scale(0.85); }
  100% { opacity: 1; transform: scale(1); }
}
.platform-modal-popup { animation: popup 0.35s cubic-bezier(0.22,1,0.36,1); }
`;

const PlatformSelectionModal: React.FC<PlatformSelectionModalProps> = ({
  isOpen,
  onClose,
  stripeLink,
}) => {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');

  const platforms = [
    { id: 'steam', name: 'Steam' },
    { id: 'playstation', name: 'PlayStation' },
    { id: 'xbox', name: 'Xbox' },
    { id: 'battlenet', name: 'Battle.net' },
  ];

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
  };

  const handleContinue = () => {
    if (selectedPlatform) {
      // Store the selected platform in localStorage for reference
      localStorage.setItem('bo7_platform', selectedPlatform);
      // Redirect to Stripe
      window.open(stripeLink, '_blank');
      onClose();
    }
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
            className="platform-modal-popup px-6 py-6 sm:px-8 sm:py-8 shadow-2xl rounded-3xl"
          >
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {t('platform_selection_title') || 'Choose Your Platform'}
              </h2>
              <p className="text-sm text-white/50">
                {t('platform_selection_desc') || 'Select your platform for the free BO7 game key'}
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

            {/* Platform Options Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformSelect(platform.id)}
                  className={`
                    relative rounded-2xl p-6 text-center
                    border-2 transition-all duration-200
                    ${selectedPlatform === platform.id 
                      ? 'border-white/60 bg-white/10 scale-[1.02]' 
                      : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                    }
                  `}
                >
                  <div className="text-lg font-semibold text-white">
                    {platform.name}
                  </div>
                  {selectedPlatform === platform.id && (
                    <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!selectedPlatform}
              className={`
                w-full rounded-xl py-4 px-6 font-bold text-white text-base
                transition-all duration-200
                ${selectedPlatform 
                  ? 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl hover:scale-[1.02]' 
                  : 'bg-white/10 cursor-not-allowed opacity-50'
                }
              `}
            >
              {selectedPlatform 
                ? t('continue_to_checkout') || 'Continue to Checkout' 
                : t('select_platform_first') || 'Select a platform to continue'
              }
            </button>

            {/* Footer Note */}
            <p className="mt-4 text-center text-xs text-white/30">
              {t('platform_note') || 'Your BO7 key will be delivered for the selected platform'}
            </p>
          </OptimizedGlass>
        </div>
      </div>
    </>
  );
};

export default PlatformSelectionModal;

