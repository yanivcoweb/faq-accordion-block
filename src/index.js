import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';

// Register the block
registerBlockType('custom/faq-accordion', {
    title: 'FAQ Accordion',
    icon: 'text',
    category: 'widgets',
    attributes: {
        question: {
            type: 'string',
            source: 'html',
            selector: '.faq-question .faq-question-inner',
        },
        answer: {
            type: 'string',
            source: 'html',
            selector: '.faq-answer .faq-answer-inner',
        },
    },
    supports: {
        anchor: true,
        className: true,
        align: ['wide', 'full'],
    },
    deprecated: [
        {
            attributes: {
                question: {
                    type: 'string',
                    source: 'html',
                    selector: '.faq-question .faq-question-inner',
                },
                answer: {
                    type: 'string',
                    source: 'html',
                    selector: '.faq-answer .faq-answer-inner',
                },
            },
            save: ({ attributes }) => {
                const { question, answer } = attributes;
                return (
                    <div className="faq-accordion-block">
                        <div className="faq-question">
                            <div className="faq-question-inner">
                                <RichText.Content tagName="div" value={question} />
                            </div>
                        </div>
                        <div className="faq-answer">
                            <div className="faq-answer-inner">
                                <RichText.Content tagName="div" value={answer} />
                            </div>
                        </div>
                    </div>
                );
            },
        },
    ],
    edit: ({ attributes, setAttributes }) => {
        const { question, answer } = attributes;
        const blockProps = useBlockProps({
            className: 'faq-accordion-block',
        });

        return (
            <div {...blockProps}>
                <RichText
                    tagName="div"
                    className="faq-question-input"
                    value={question}
                    onChange={(value) => setAttributes({ question: value })}
                    placeholder="Enter your question..."
                    allowedFormats={['core/bold', 'core/italic']}
                />
                <RichText
                    tagName="div"
                    className="faq-answer-input"
                    value={answer}
                    onChange={(value) => setAttributes({ answer: value })}
                    placeholder="Enter your answer..."
                    allowedFormats={['core/bold', 'core/italic', 'core/link']}
                />
            </div>
        );
    },
    save: ({ attributes }) => {
        const { question, answer } = attributes;
        const blockProps = useBlockProps.save({
            className: 'faq-accordion-block',
            itemScope: true,
            itemType: 'https://schema.org/Question',
        });

        return (
            <div {...blockProps}>
                <div
                    className="faq-question"
                    role="button"
                    tabIndex="0"
                    aria-expanded="false"
                    itemProp="name"
                >
                    <div className="faq-question-inner">
                        <RichText.Content tagName="div" value={question} />
                    </div>
                </div>
                <div
                    className="faq-answer"
                    role="region"
                    aria-hidden="true"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                >
                    <div className="faq-answer-inner" itemProp="text">
                        <RichText.Content tagName="div" value={answer} />
                    </div>
                </div>
            </div>
        );
    },
});
