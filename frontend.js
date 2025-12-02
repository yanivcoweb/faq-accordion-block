/**
 * FAQ Accordion Block Frontend Script
 * Handles accordion open/close interactions with accessibility support
 */

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        selectors: {
            question: '.faq-question',
            answer: '.faq-answer',
            block: '.faq-accordion-block',
        },
        classes: {
            open: 'open',
        },
        timing: {
            transition: 300, // Must match CSS transition duration
        },
    };

    /**
     * Initialize accordion functionality
     */
    function initAccordions() {
        const questions = document.querySelectorAll(CONFIG.selectors.question);

        questions.forEach((question) => {
            // Add click handler
            question.addEventListener('click', handleAccordionToggle);

            // Add keyboard handler
            question.addEventListener('keydown', handleKeyDown);
        });
    }

    /**
     * Handle accordion toggle on click
     * @param {Event} event - Click event
     */
    function handleAccordionToggle(event) {
        const question = event.currentTarget;
        const answer = question.nextElementSibling;
        const parentBlock = question.closest(CONFIG.selectors.block);

        if (!answer || !parentBlock) {
            return;
        }

        // Check if this accordion is currently open
        const isOpen = parentBlock.classList.contains(CONFIG.classes.open);

        // Close all accordions globally (can be modified to scope to a container)
        closeAllAccordions();

        // Toggle the clicked accordion (open if it was closed)
        if (!isOpen) {
            openAccordion(answer, parentBlock, question);
        }
    }

    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} event - Keyboard event
     */
    function handleKeyDown(event) {
        // Activate on Enter or Space
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleAccordionToggle(event);
        }
    }

    /**
     * Open an accordion
     * @param {HTMLElement} answer - Answer element
     * @param {HTMLElement} parentBlock - Parent block element
     * @param {HTMLElement} question - Question element
     */
    function openAccordion(answer, parentBlock, question) {
        parentBlock.classList.add(CONFIG.classes.open);
        answer.style.display = 'block';

        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(() => {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        });

        // Update ARIA attributes
        question.setAttribute('aria-expanded', 'true');
        answer.setAttribute('aria-hidden', 'false');
    }

    /**
     * Close an accordion
     * @param {HTMLElement} answer - Answer element
     * @param {HTMLElement} parentBlock - Parent block element
     * @param {HTMLElement} question - Question element
     */
    function closeAccordion(answer, parentBlock, question) {
        parentBlock.classList.remove(CONFIG.classes.open);
        answer.style.maxHeight = null;

        // Update ARIA attributes immediately
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');

        // Hide after transition
        setTimeout(() => {
            if (!parentBlock.classList.contains(CONFIG.classes.open)) {
                answer.style.display = 'none';
            }
        }, CONFIG.timing.transition);
    }

    /**
     * Close all accordions on the page
     */
    function closeAllAccordions() {
        const allAnswers = document.querySelectorAll(CONFIG.selectors.answer);

        allAnswers.forEach((answer) => {
            const parentBlock = answer.closest(CONFIG.selectors.block);
            const question = answer.previousElementSibling;

            if (parentBlock && question && parentBlock.classList.contains(CONFIG.classes.open)) {
                closeAccordion(answer, parentBlock, question);
            }
        });
    }

    /**
     * Initialize on DOM ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccordions);
    } else {
        // DOM already loaded
        initAccordions();
    }

    // Re-initialize if content is dynamically added (for block editor previews)
    if (window.MutationObserver) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('faq-accordion-block')) {
                        const question = node.querySelector(CONFIG.selectors.question);
                        if (question && !question.hasAttribute('data-initialized')) {
                            question.setAttribute('data-initialized', 'true');
                            question.addEventListener('click', handleAccordionToggle);
                            question.addEventListener('keydown', handleKeyDown);
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
})();
