<?php
/**
 * Plugin Name: FAQ Accordion Block
 * Description: A custom Gutenberg block for creating FAQ accordions.
 * Version: 1.0.0
 * Author: יניב ששון
 * Text Domain: faq-accordion-block
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register the FAQ Accordion block
 */
function register_faq_accordion_block() {
    // Check if build files exist
    $asset_file_path = plugin_dir_path(__FILE__) . 'build/index.asset.php';

    if (!file_exists($asset_file_path)) {
        error_log('FAQ Accordion Block: Build files not found. Please run npm run build.');
        return;
    }

    // Load the asset file for dependencies and versioning
    $asset_file = include $asset_file_path;

    // Ensure asset file has required data
    if (!isset($asset_file['dependencies']) || !isset($asset_file['version'])) {
        error_log('FAQ Accordion Block: Invalid asset file format.');
        return;
    }

    // Register the block editor script
    wp_register_script(
        'faq-accordion-block-editor',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version'],
        true // Load in footer
    );

    // Register the frontend script
    $frontend_script_path = plugin_dir_path(__FILE__) . 'frontend.js';
    wp_register_script(
        'faq-accordion-block-frontend',
        plugins_url('frontend.js', __FILE__),
        array(),
        file_exists($frontend_script_path) ? filemtime($frontend_script_path) : '1.0.0',
        true // Load in footer
    );

    // Register the block style
    $style_path = plugin_dir_path(__FILE__) . 'style.css';
    wp_register_style(
        'faq-accordion-block-style',
        plugins_url('style.css', __FILE__),
        array(),
        file_exists($style_path) ? filemtime($style_path) : '1.0.0'
    );

    // Register the block type
    register_block_type('custom/faq-accordion', array(
        'editor_script' => 'faq-accordion-block-editor',
        'style'         => 'faq-accordion-block-style',
        'script'        => 'faq-accordion-block-frontend',
    ));
}
add_action('init', 'register_faq_accordion_block');

/**
 * Load plugin textdomain for translations
 */
function faq_accordion_block_load_textdomain() {
    load_plugin_textdomain(
        'faq-accordion-block',
        false,
        dirname(plugin_basename(__FILE__)) . '/languages'
    );
}
add_action('plugins_loaded', 'faq_accordion_block_load_textdomain');
