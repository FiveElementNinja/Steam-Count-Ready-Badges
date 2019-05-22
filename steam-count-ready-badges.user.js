// ==UserScript==
// @name         Steam Count Ready Badges
// @namespace    https://github.com/FiveElementNinja/Steam-Count-Ready-Badges
// @version      0.3
// @description  Shows how many badges you have waiting to be crafted on the badges page
// @author       Five Element Ninja (@FivElementNinja)
// @match        *://steamcommunity.com/id/*/badges*
// @updateURL    https://github.com/FiveElementNinja/Steam-Count-Ready-Badges/raw/master/steam-count-ready-badges.user.js
// @downloadURL  https://github.com/FiveElementNinja/Steam-Count-Ready-Badges/raw/master/steam-count-ready-badges.user.js
// @run-at       document-end
// ==/UserScript==

console.log('Steam Count Ready Badges loaded');

(function () {
	var urlParams = new URLSearchParams(window.location.search);
	var page = urlParams.get('p');
    var total_badges = jQuery('.badge_craft_button').length;
	if (page && page > 1 && total_badges > 0) {
		total_badges = ((page - 1) * 150) + total_badges;
	}

    var tooltip = "";
    var i = 1;
	if (page && page > 1) {
		tooltip += "...\n";
		i = (page - 1) * 150;
	}
    jQuery('.badge_craft_button').each(function () {
        var title = jQuery(this).parent().parent().parent().children('.badge_title_row').children('.badge_title').clone().children().remove().end().text().trim();
        tooltip += i + ' - ' + title + "\n";
        i++;
    });

    jQuery('.profile_paging').append(' | <span title="' + tooltip + '">' + total_badges + ' badge' + ((total_badges == 1) ? '' : 's') + ' ready to craft (<strong><a href="javascript:return false;">?</a></strong>)</span>');
}());