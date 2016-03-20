// ==UserScript==
// @name         Gleam.io Autosolve
// @namespace    GLEAM
// @version      1.4
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

var wo = window.open;
window.open = function(){
   return;
}
var processed = [];
console.log('[GLEAM] Welcome!');
$(function(){
    gleam();
    if ($("#current-entries") !== null) {
        $('.span4.blue-square.ng-scope').after('<div class="span4 green-square ng-scope"><span class="square-describe mont"><span class="status small"><span class="current ng-binding" id="winning-chance">NaN</span></span><span class="description ng-binding">Winning Chance</span></span></div>');
        $("div.square-row.row-fluid.center.ng-scope > .span4").width('25%');
        setTimeout(setChance, 400);
    }
});
function gleam(){
    if($("div.redeem-container").is(':visible')){
        console.log('[GLEAM] already completed');
        $('div.incentive-description h3.ng-binding.ng-scope').append('<div style="background:gold;color:#000;border-radius:10px;">Already completed!</div>');
    }else{
        var y = 0, x = setInterval(function(){
            y++;
            var g = 0;
            $('.entry-method').each(function(index){
                g++;
                var elem = $(this);
                if(!elem.hasClass('completed-entry-method') && processed.indexOf(g)==-1){
                    var type = $('span.icon-wrapper i', elem);
                    var text = '#'+g+' '+$.trim($('.text .ng-binding.ng-scope', elem).text());
                    console.log("[GLEAM] Processing: "+text);
                    if(type.hasClass('fa-heart')){
                        checkStatus(elem);
                    }else{
                        $('.entry_details a.btn', elem).trigger('click');
                        $('.tally', elem).trigger('click');
                        setTimeout(function(){setChance();checkStatus(elem);},400);
                    }
                    processed.push(g);
                }
            });
            if(y == 20){
                clearInterval(x);
                setTimeout(function(){setChance();},1500);
                window.open = wo;
            }
        }, 1000);
    }
}
function checkStatus(elem){
    var i = 0;
    var v = setInterval(function(){
        i++;
        var tally = $("[ng-class*='tallyIcon']", elem);
        if(!tally.hasClass('fa-spin') || i == 100){
            if(tally.hasClass('fa-chevron-down')){
                $('.tally', elem).trigger('click');
            }
            if(!tally.hasClass('fa-check') && !tally.hasClass('fa-clock-o')){
                $('.tally', elem).css('background', '#F2C32E');
            }
            clearInterval(v);
        }
    }, 100);
}
function setChance(){
    var own = parseInt($(".status.ng-binding").text());
    var total = parseInt($(".current.ng-binding").text());
    var chance = Math.round(10000 * own / total) / 100;
    $("#winning-chance").text(chance+"%");
}
