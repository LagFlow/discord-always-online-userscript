// ==UserScript==
// @name           [Discord] Force Always Online
// @version        2.1
// @description    Prevent Discord from going idle changing the status automatically - Resets on user activity
// @match          https://discord.com/*
// @run-at         document-idle
// @grant          unsafeWindow
// ==/UserScript==

(function () {
    "use strict";

    const INTERVAL_TIME = 60 * 1000 * 2; // 2 minutes
    let enabled = false;
    let btn = null;
    let intervalId = null;

    // Activity Simulation
    async function simulateActivity() {
        if (!enabled) return;

        const event = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            clientX: Math.random() * window.innerWidth,
            clientY: Math.random() * window.innerHeight,
            view: unsafeWindow, // This is necessary to send the events to the actual browser's window context
        });
        document.dispatchEvent(event);

        pulseButton();
    }

    function start() {
        if (intervalId) clearInterval(intervalId);

        intervalId = setInterval(() => {
            simulateActivity();
        }, INTERVAL_TIME);

        updateButtonStyle();
    }

    function stop() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        updateButtonStyle();
    }

    // This resets the timer if the user is actually interacting with discord
    function resetInterval() {
        if (enabled) {
            start();
        }
    }

    // Setup
    function updateButtonStyle() {
        if (!btn) return;
        btn.innerHTML = enabled ? "👻" : "😴";
        btn.style.padding = "0";
        btn.style.margin = "0";
        btn.title = `Always Online: ${enabled ? "ON" : "OFF"}`;
    }

    function pulseButton() {
        if (!btn) return;
        btn.style.transform = "scale(1.2)";
        setTimeout(() => { if(btn) btn.style.transform = "scale(1)"; }, 200);
    }

    function createButton() {
        if (document.getElementById("discord-keep-active-btn")) return;

        btn = document.createElement("button");
        btn.id = "discord-keep-active-btn";

        Object.assign(btn.style, {
            position: "fixed",
            top: "10px",
            left: "10px",
            zIndex: "99999",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            background: "none",
        });

        btn.addEventListener("click", () => {
            enabled = !enabled;
            enabled ? start() : stop();
        });

        updateButtonStyle();
        document.body.appendChild(btn);
    }

    function init() {
        createButton();

        // Listen for mouse movement to reset the 10-minute timer
        document.addEventListener("mousemove", resetInterval);

        if (enabled) start();
    }

    init();
})();