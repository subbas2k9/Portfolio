/**
 * Clipboard Copy Utility & Toast Notification System
 * Subbas M Developer Portfolio
 */

(function () {
  // Ensure toast container exists
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  /**
   * Display a floating toast notification
   * @param {string} message - Message to display
   * @param {string} icon - Optional icon SVG or character
   * @param {number} duration - Duration in milliseconds (default: 3000ms)
   */
  window.showToast = function (message, icon = '✓', duration = 3200) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Auto dismiss
    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  };

  /**
   * Copy text to clipboard and trigger feedback
   * @param {string} text - Text to copy
   * @param {string} feedbackMessage - Toast message to display
   * @param {HTMLElement} triggerElement - Optional trigger button for micro-animation
   */
  window.copyToClipboard = async function (text, feedbackMessage = 'Copied to clipboard!', triggerElement = null) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers / insecure context
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      window.showToast(feedbackMessage, '⚡');

      // Visual feedback on the trigger element
      if (triggerElement) {
        const originalText = triggerElement.getAttribute('data-original-text') || triggerElement.innerHTML;
        if (!triggerElement.getAttribute('data-original-text')) {
          triggerElement.setAttribute('data-original-text', originalText);
        }

        const hintSpan = triggerElement.querySelector('.copy-action-hint');
        if (hintSpan) {
          hintSpan.textContent = 'Copied!';
          hintSpan.style.color = '#10B981';
          setTimeout(() => {
            hintSpan.textContent = 'Click to Copy';
            hintSpan.style.color = '';
          }, 2000);
        }
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      window.showToast('Could not copy automatically. Please copy manually: ' + text, '⚠️', 5000);
    }
  };

  // Wire up all elements with data-copy attribute
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-copy]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = el.getAttribute('data-copy');
        const customMessage = el.getAttribute('data-copy-msg') || `Copied "${textToCopy}" to clipboard!`;
        window.copyToClipboard(textToCopy, customMessage, el);
      });
    });
  });
})();
