// lib/utils/navigationHelper.js
/**
 * Dismiss all Bootstrap modals and offcanvas elements
 * Useful for closing navigation menus before route transitions
 */
export const dismissAllModals = () => {
  if (typeof window === 'undefined') return;

  try {
    // Close all Bootstrap modals
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach((modal) => {
      const bootstrapModal = window.bootstrap?.Modal?.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    });

    // Close all Bootstrap offcanvas elements
    const offcanvases = document.querySelectorAll('.offcanvas.show');
    offcanvases.forEach((offcanvas) => {
      const bootstrapOffcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvas);
      if (bootstrapOffcanvas) {
        bootstrapOffcanvas.hide();
      }
    });
  } catch (error) {
    console.error('Error dismissing modals:', error);
  }
};

/**
 * Custom Link component that dismisses modals before navigating
 * Use this for all navigation links inside modals/offcanvas
 */
export const LinkWithModalDismiss = ({ 
  href, 
  children, 
  className = '', 
  onDismissComplete = null,
  ...props 
}) => {
  const handleClick = (e) => {
    // Don't prevent default for Link component
    // Just dismiss modals right before navigation
    dismissAllModals();
    
    if (onDismissComplete) {
      onDismissComplete();
    }
  };

  return (
    <a 
      href={href} 
      className={className} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};
