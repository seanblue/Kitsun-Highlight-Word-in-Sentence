// ==UserScript==
// @name          Kitsun Highlight Word in Sentence
// @namespace     https://kitsun.io
// @description   Wrap the selected word in HTML to "highlight" it in the sentence.
// @author        seanblue
// @version       1.0.0
// @include       https://kitsun.io/*
// @grant         none
// ==/UserScript==

(function() {
    'use strict';

    const requiredKey = 118; // F7

    const openTag = '<span class="highlight">';
    const closeTag = '</span>';

    document.addEventListener('keydown', onKeyDown);

    function onKeyDown(e) {
        if (e.keyCode === requiredKey) {
            wrapSelectedTextInHighlightSpan();
        }
    }

    function wrapSelectedTextInHighlightSpan() {
        let el = document.activeElement;

        let start = el.selectionStart;
        let end = el.selectionEnd;

        if (start === end) {
            return;
        }

        let beforeText = el.value.substring(0, start);
        let selectedText = el.value.substring(start, end);
        let afterText = el.value.substring(end, el.value.length);

        let modifiedText = beforeText + openTag + selectedText + closeTag + afterText;

        el.value = modifiedText;
        el.selectionStart = end + openTag.length + closeTag.length;
        el.selectionEnd = el.selectionStart;

        el.dispatchEvent(new Event('change'));
    }
})();