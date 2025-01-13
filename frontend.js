document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach((question) => {
        question.addEventListener('click', () => {
            // Get the associated answer element
            const answer = question.nextElementSibling;
            const parentBlock = question.closest('.faq-accordion-block');

            // Hide all other answers and remove the 'open' class
            document.querySelectorAll('.faq-answer').forEach((ans) => {
                if (ans !== answer) {
                    slideUp(ans);
                    ans.closest('.faq-accordion-block').classList.remove('open');
                }
            });

            // Toggle the clicked answer and add/remove 'open' class
            if (answer.style.maxHeight) {
                slideUp(answer);
                parentBlock.classList.remove('open');
            } else {
                slideDown(answer);
                parentBlock.classList.add('open');
            }
        });
    });

    // Slide-down function
    function slideDown(element) {
        element.style.display = 'block';
        element.style.maxHeight = element.scrollHeight + 'px';
    }

    // Slide-up function
    function slideUp(element) {
        element.style.maxHeight = null;
        setTimeout(() => {
            element.style.display = 'none';
        }, 300); // Matches the CSS transition duration
    }
});