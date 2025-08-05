// mjai-config.user.js
// ==UserScript==
// @name         MJAI Auto Configurator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto parses settings for MJAI battling.
// @author       Vince
// @match        https://mjai.ekyu.moe/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const isCN =
    /\/zh-cn/i.test(location.pathname) ||
    (document.documentElement.lang || "").startsWith("zh");

  // Speed settings
  const speedMatch = (optText) =>
    isCN ? /高|秒切/.test(optText) : /high/i.test(optText);

  // This is the function, not the settings
  const setAI = (dropdown, version) => {
    [...dropdown.options].forEach((o, i) => {
      if (o.text.includes(version)) dropdown.selectedIndex = i;
    });
  };

  function apply() {
    const lobbySection = document.querySelectorAll("section")[1];
    // Auto-scrolling
    lobbySection.scrollIntoView({ behavior: "smooth" });

    // Lobby number
    lobbySection.querySelector('input[type="number"]').value = 1000;

    const selects = lobbySection.querySelectorAll("select");

    [...selects[0].options].forEach((o, i) => {
      if (speedMatch(o.text)) selects[0].selectedIndex = i;
    });

    // AI settings (for three seats)
    setAI(selects[1], "4.1b");
    setAI(selects[2], "4.1c");
    setAI(selects[3], "4.1a");
  }

  (function wait() {
    document.querySelectorAll("section").length > 1
      ? apply()
      : setTimeout(wait, 100);
  })();
})();
