<?php
/**
 * Plugin Name: FAQ Accordion Block
 * Description: A custom Gutenberg block for creating FAQ accordions.
 * Version: 1.0
 * Author: יניב ששון
 */

function register_faq_accordion_block() {
    // Load the asset file for dependencies and versioning
    $asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';

    // Register the block editor script
    wp_register_script(
        'faq-accordion-block-editor',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version'],
        true // Load in footer
    );

    // Register the frontend script
    wp_register_script(
        'faq-accordion-block-frontend',
        plugins_url('frontend.js', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'frontend.js'),
        true // Load in footer
    );

    // Register the block style
    wp_register_style(
        'faq-accordion-block-style',
        plugins_url('style.css', __FILE__)
    );

    // Register the block type
    register_block_type('custom/faq-accordion', array(
        'editor_script' => 'faq-accordion-block-editor',
        'style'         => 'faq-accordion-block-style',
        'script'        => 'faq-accordion-block-frontend',
    ));
}
add_action('init', 'register_faq_accordion_block');
