// ==UserScript==
// @name         Gleam.io Autosolve
// @namespace    GLEAM
// @version      1.1
// @description  lets save some time
// @author       Tackyou
// @license      https://raw.githubusercontent.com/Tackyou/Gleam.io-Autosolve/master/LICENSE
// @icon         http://i.imgur.com/6PuVE2l.png
// @match        *gleam.io/*
// @supportURL   https://github.com/Tackyou/Gleam.io-Autosolve/issues
// @updateURL    https://raw.githubusercontent.com/Tackyou/Gleam.io-Autosolve/master/gleamio.user.js
// @downloadURL  https://raw.githubusercontent.com/Tackyou/Gleam.io-Autosolve/master/gleamio.user.js
// @grant        none
// ==/UserScript==

if (document.getElementById("current-entries") !== null) {
    var own = parseInt(document.querySelector(".status.ng-binding").innerHTML);
    var total = parseInt(document.querySelector(".current.ng-binding").innerHTML);
    var chance = Math.round(10000 * own / total ) / 100;

    $('.span4.blue-square.ng-scope').after('<div class="span4 green-square ng-scope"> <span class="square-describe mont"> <span class="status small"> <span class="current ng-binding" id="winning-chance">NaN</span> </span> <span class="description ng-binding">Winning Chance</span> </span> </div>');

    var elems = document.querySelectorAll("div.square-row.row-fluid.center.ng-scope > .span4");

    for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute("style", "width:25%;")
    }

    document.getElementById("winning-chance").innerHTML = chance + "%";
}

console.log('[GLEAM] Welcome!');
var gi = 0;
var gleam = setInterval(function(){
        if($("[ng-click*='entry_method']").length>0){
            if($("div.redeem-container").length<1 || $("div.redeem-container").is(':hidden')){
                $('.entry_details .visit-trigger a.btn').trigger('click');
                $("[ng-click*='entry_method']").trigger('click');
                $("[ng-class*='tallyIcon']").trigger('click');
                console.log('[GLEAM] Action performed');
            }else{
                console.log('[GLEAM] already completed');
                $('div.incentive-description h3.ng-binding.ng-scope').append('<div style="background:gold;color:#000;border-radius:10px;">Already completed!</div>');
                clearInterval(gleam);
            }
        }   
        gi++;
        if(gi>6){
            clearInterval(gleam);
        }
}, 500);
