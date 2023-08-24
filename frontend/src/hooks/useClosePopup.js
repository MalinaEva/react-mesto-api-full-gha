import { useEffect } from 'react';

function useClosePopup (isOpen, onClose) {
	useEffect(() => {
		const handleEscClose = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscClose);
		}

		return () => {
			document.removeEventListener('keydown', handleEscClose);
		};
	}, [isOpen, onClose]);

	return (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};
}

export default useClosePopup;
