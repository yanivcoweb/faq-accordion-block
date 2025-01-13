const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;
const { Button } = wp.components;

// Register the block
registerBlockType('custom/faq-accordion', {
    title: 'FAQ Accordion',
    icon: 'text',
    category: 'widgets',
    attributes: {
        question: {
            type: 'string',
            source: 'html',
            selector: '.faq-question',
        },
        answer: {
            type: 'string',
            source: 'html',
            selector: '.faq-answer',
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { question, answer } = attributes;

        return (
            <div className="faq-accordion-block">
                <RichText
                    tagName="div"
                    className="faq-question-input"
                    value={question}
                    onChange={(value) => setAttributes({ question: value })}
                    placeholder="Enter your question..."
                />
                <RichText
                    tagName="div"
                    className="faq-answer-input"
                    value={answer}
                    onChange={(value) => setAttributes({ answer: value })}
                    placeholder="Enter your answer..."
                />
            </div>
        );
    },
    save: ({ attributes }) => {
        const { question, answer } = attributes;

        return (
            <div className="faq-accordion-block">
                <div className="faq-question"><div className="faq-question-inner"><RichText.Content tagName="div" value={question} /></div></div>
                <div className="faq-answer"><div className="faq-answer-inner"><RichText.Content tagName="div" value={answer} /></div></div>
            </div>
        );
    },
});
