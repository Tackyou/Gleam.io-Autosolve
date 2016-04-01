// ==UserScript==
// @name         Gleam.io Autosolve
// @namespace    GLEAM
// @version      1.8.1
// @description  lets save some time
// @author       Tackyou
// @license      https://raw.githubusercontent.com/Tackyou/Gleam.io-Autosolve/master/LICENSE
// @icon         http://i.imgur.com/6PuVE2l.png
// @match        https://gleam.io/*
// @supportURL   https://github.com/Tackyou/Gleam.io-Autosolve/issues
// @updateURL    https://raw.githubusercontent.com/Tackyou/Gleam.io-Autosolve/master/gleamio.user.js
// @downloadURL  https://raw.githubusercontent.com/Tackyou/Gleam.io-Autosolve/master/gleamio.user.js
// @grant        none
// ==/UserScript==

var elements = 0;
var gleam = null;
console.log('[GLEAM] Welcome!');
$(window).load(function(){
    elements = $('.entry-method');
    elements.each(function() {
        $(this).data('$scope').entry_method.mandatory = true;
    });
    elements = elements.length;
    gg();
    if ($("#current-entries") !== undefined) {
        $('.span4.blue-square.ng-scope').after('<div class="span4 green-square ng-scope"><span class="square-describe mont"><span class="status small"><span class="current ng-binding" id="winning-chance">NaN</span></span><span class="description ng-binding">Winning Chance</span></span></div>');
        $("div.square-row.row-fluid.center.ng-scope > .span4").width('25%');
        setTimeout(setChance, 400);
    }
});
function gg(){
    if($("div.redeem-container").is(':visible')){
        console.log('[GLEAM] already completed');
        $('div.incentive-description h3.ng-binding.ng-scope').append('<div style="background:gold;color:#000;border-radius:10px;">Already completed!</div>');
    }else{
        gleam = angular.element($(".popup-blocks-container")).scope();
        solveStep(0);
    }
}
function solveStep(m){
    if(m > elements){
        setChance();
        return;
    }
    var elem = $('.entry-method:eq('+m+')');
    var scop = elem.data('$scope');
    if(scop !== null) {
        var sype = scop.entry_method.entry_type;
        if(sype != 'share_action' && gleam.canEnter(scop.entry_method) && !gleam.isEntered(scop.entry_method)){
            var type = $('span.icon-wrapper i', elem);
            var text = '#'+m+' '+$.trim($('.text .ng-binding.ng-scope', elem).text());
            console.log("[GLEAM] Processing: "+text);
            scop.entry_method.entering = true;
            switch(sype) {
                case "youtube_watch":
                case "vimeo_watch":
                    scop.entry_method.watched = true;
                    scop.videoWatched(scop.entry_method);
                    break;
                default:
                    scop.triggerVisit(scop.entry_method.id);
                    break;
            }
            scop.entry_method.entering = false;
            scop.enterLinkClick(scop.entry_method);
            scop.verifyEntryMethod();
        }
        setTimeout(function(){
            if(!gleam.isEntered(scop.entry_method) || sype == 'share_action'){
                var tally = $('[ng-class*="tallyIcon"]', elem);
                if(tally.hasClass('fa-chevron-down')){
                    $('.tally', elem).trigger('click');
                }
                $('.tally', elem).css('background', '#F2C32E');
            }
        }, 1500);
    }
    m++;
    setTimeout(function(){
        solveStep(m);
    }, getRandomInt(1120,2220));
}
function setChance(){
    var own = parseInt($(".status.ng-binding").text());
    var total = parseInt($(".current.ng-binding").text());
    var chance = Math.round(10000 * own / total) / 100;
    $("#winning-chance").text(chance+"%");
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
