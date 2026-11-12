import React, { useEffect, useRef } from "react";

/**
 * Accessible Modal Dialog component with WCAG 2.1 compliance
 * Features:
 * - Focus trapping (cycles within modal)
 * - Escape key dismissal
 * - Focus restoration on close
 * - Semantic dialog role
 * - ARIA attributes
 */
export default function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "32rem",
  className = "",
}) {
  const modalRef = useRef(null);
  const triggerRef = useRef(null);
  const firstFocusRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Store the element that triggered the modal
    triggerRef.current = document.activeElement;

    // Focus first focusable element in modal
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements?.length) {
      firstFocusRef.current = focusableElements[0];
      firstFocusRef.current?.focus();
    }

    // Handle Escape key
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }

      // Focus trap: keep focus within modal
      if (e.key === "Tab" && focusableElements?.length) {
        const lastElement = focusableElements[focusableElements.length - 1];
        const firstElement = focusableElements[0];

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      // Restore focus to trigger
      if (triggerRef.current?.focus) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(6, 27, 45, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: "var(--avcon-white)",
          borderRadius: "var(--avcon-radius-medium)",
          padding: "var(--space-4) var(--space-3)",
          maxWidth,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "var(--avcon-shadow)",
          position: "relative",
          width: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2
          id="modal-title"
          style={{
            margin: "0 0 var(--space-3) 0",
            fontSize: "var(--avcon-font-h3)",
            fontWeight: 700,
            color: "var(--avcon-text-dark)",
          }}
        >
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}
