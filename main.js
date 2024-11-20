// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-11-19
// @description  try to take over the world!
// @author       You
// @match        https://bloxd.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bloxd.io
// @grant        none
// ==/UserScript==

(function () {
    window.aoa = window.aoa || {};
    aoa.autoclickerInterval = 25;

    aoa.copyProperties = () => {
        var a = aoa.tmp1;
        aoa.doLeftclickAction = () => {
            a.ents.getHeldItem(a.playerEntity).downFirePrimary();
        };
        aoa.placeBlock = () => {
            a.ents
                .getHeldItem(a.playerEntity)
                .secondaryDownFireRepeatableAction();
        };
        console.dir('aoa.tmp1 has been deleted');
    };
    const copyPropertiesExecuter = setInterval(() => {
        if (typeof aoa.tmp1 !== 'undefined') {
            aoa.copyProperties();
            clearInterval(copyPropertiesExecuter);
        } else {
            console.dir("game hasn't started yet.");
        }
    }, 1000);

    const inputs = {};

    window.addEventListener('keydown', event => (inputs[event.key] = true));
    window.addEventListener('keyup', event => (inputs[event.key] = false));

    window.addEventListener('mousedown', event => {
        if (event.button === 0) inputs['leftclick'] = true;
        if (event.button === 2) inputs['rightclick'] = true;
    });
    window.addEventListener('mouseup', event => {
        if (event.button === 0) inputs['leftclick'] = false;
        if (event.button === 2) inputs['rightclick'] = false;
    });

    aoa.isPressed = input => inputs[input] || false;

    aoa.onDown = (input, callback) => {
        window.addEventListener('keydown', event => {
            if (event.key === input) callback();
        });
        window.addEventListener('mousedown', event => {
            if (
                (input === 'leftclick' && event.button === 0) ||
                (input === 'rightclick' && event.button === 2)
            ) {
                callback();
            }
        });
    };

    aoa.onUp = (input, callback) => {
        window.addEventListener('keyup', event => {
            if (event.key === input) callback();
        });
        window.addEventListener('mouseup', event => {
            if (
                (input === 'leftclick' && event.button === 0) ||
                (input === 'rightclick' && event.button === 2)
            ) {
                callback();
            }
        });
    };

    aoa.onDown('leftclick', () => {
        aoa.tmps.autoclicker = setInterval(() => {
            aoa.downFirePrimary();
            console.log('autoclicking...');
        }, aoa.autoclickerInterval);
    });
    aoa.onUp('leftclick', () => {
        clearInterval(aoa.tmps.autoclicker);
    });
})();
