/**
 * Holiday popup renderer.
 * Keep this file generic: future popup changes should happen in
 * `js/holiday-popup-config.js` and by swapping the artwork asset.
 */

(function () {
    'use strict';

    const DEFAULT_CONFIG = {
        enabled: false,
        campaignId: 'default',
        imageSrc: '',
        imageAlt: 'MediaKids Academy popup artwork',
        delayMs: 0
    };

    const config = Object.freeze({
        ...DEFAULT_CONFIG,
        ...(window.HOLIDAY_POPUP_CONFIG || {})
    });

    if (!config.enabled || !config.imageSrc) return;

    const sessionKey = `holiday-popup:dismissed:${config.campaignId}`;
    if (sessionStorage.getItem(sessionKey)) return;

    let popupRoot = null;

    window.addEventListener('load', function () {
        window.setTimeout(openPopup, config.delayMs);
    });

    function openPopup() {
        popupRoot = document.createElement('div');
        popupRoot.className = 'holiday-popup';
        popupRoot.setAttribute('role', 'dialog');
        popupRoot.setAttribute('aria-modal', 'true');
        popupRoot.setAttribute('aria-label', config.imageAlt);

        const figure = document.createElement('div');
        figure.className = 'holiday-popup__figure';

        const image = document.createElement('img');
        image.className = 'holiday-popup__image';
        image.alt = config.imageAlt;
        image.loading = 'eager';
        image.decoding = 'async';
        image.draggable = false;
        image.fetchPriority = 'high';

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'holiday-popup__close';
        closeButton.setAttribute('aria-label', 'Close popup');
        closeButton.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 6L18 18M18 6L6 18"></path>
            </svg>
        `;

        image.addEventListener('load', revealPopup, { once: true });
        image.addEventListener('error', revealPopup, { once: true });
        image.src = config.imageSrc;

        closeButton.addEventListener('click', function (event) {
            event.stopPropagation();
            closePopup();
        });

        figure.appendChild(closeButton);
        figure.appendChild(image);
        popupRoot.appendChild(figure);
        document.body.appendChild(popupRoot);

        document.documentElement.classList.add('holiday-popup-open');
        document.body.classList.add('holiday-popup-open');

        popupRoot.addEventListener('click', onBackdropClick);
        document.addEventListener('keydown', onKeydown);

        requestAnimationFrame(function () {
            popupRoot.classList.add('is-mounted');
        });

        window.setTimeout(revealPopup, 320);
    }

    function revealPopup() {
        if (!popupRoot || popupRoot.classList.contains('is-visible')) return;

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                if (popupRoot) {
                    popupRoot.classList.add('is-visible');
                }
            });
        });
    }

    function onBackdropClick(event) {
        if (event.target === popupRoot) {
            closePopup();
        }
    }

    function onKeydown(event) {
        if (event.key === 'Escape') {
            closePopup();
        }
    }

    function closePopup() {
        if (!popupRoot) return;

        const nodeToRemove = popupRoot;
        popupRoot = null;

        nodeToRemove.classList.remove('is-visible');
        nodeToRemove.classList.add('is-closing');

        document.documentElement.classList.remove('holiday-popup-open');
        document.body.classList.remove('holiday-popup-open');
        document.removeEventListener('keydown', onKeydown);
        nodeToRemove.removeEventListener('click', onBackdropClick);

        sessionStorage.setItem(sessionKey, '1');

        nodeToRemove.addEventListener('transitionend', function onTransitionEnd(event) {
            if (event.target !== nodeToRemove) return;
            nodeToRemove.removeEventListener('transitionend', onTransitionEnd);
            nodeToRemove.remove();
        });

        window.setTimeout(function () {
            nodeToRemove.remove();
        }, 500);
    }
})();
