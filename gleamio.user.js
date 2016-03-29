// ==UserScript==
// @name         Gleam.io Autosolve
// @namespace    GLEAM
// @version      1.7.1
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

var wo = window.open;
function non(){
   return;
}
var ytstatus = 0;
var elements = 0;
console.log('[GLEAM] Welcome!');
$(window).load(function(){
    elements = $('.entry-method').length;
    gleam();
    if ($("#current-entries") != undefined) {
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
        solveStep(0);
    }
}
function solveStep(m){
    if(m > elements){
        checkStatus();
        return;
    }
    var elem = $('.entry-method:eq('+m+')');
    var scop = elem.data('$scope');
    if(scop != null){ scop.entry_method.mandatory = true; }
    if(!elem.hasClass('completed-entry-method') && elem.is(':visible')){
        window.open = non;
        var type = $('span.icon-wrapper i', elem);
        var text = '#'+m+' '+$.trim($('.text .ng-binding.ng-scope', elem).text());
        console.log("[GLEAM] Processing: "+text);
        if(!type.hasClass('fa-heart')){
            if(type.hasClass('fa-youtube')){
                var ys = true;
                var yt = $('iframe.youtube', elem);
                if(ytstatus == 0){
                    $('.tally', elem).trigger('click');
                    ytstatus = 1;
                }else{
                    if(ytstatus == 1){
                        if(yt.attr('src') != undefined){
                            var yl = yt.attr('src').replace('autoplay=0', 'autoplay=1');
                            yt.attr('src', yl+'&start=99999999999');
                            ytstatus = 2;
                        }else{
                            ys = false;
                            ytstatus = 0;
                        }
                    }else{
                        if(ytstatus == 2){
                            var b = $('button.btn[ng-click]', elem);
                            if(b.is(':visible')){
                                b.trigger('click');
                                ytstatus = 0;
                                m++;
                            }
                        }
                    }
                }
                if(ys){ setTimeout(function(){solveStep(m);}, 100); return; }
            }
            $('.btn', elem).trigger('click');
            $('.tally', elem).trigger('click');
        }
        window.open = wo;
    }
    m++;
    solveStep(m);
}
function checkStatus(){
    $('.entry-method').each(function(){
        var elem = $(this);
        var tally = $('[ng-class*="tallyIcon"]', elem);
        if(!tally.hasClass('fa-spin')){
            if(tally.hasClass('fa-chevron-down')){
                $('.tally', elem).trigger('click');
            }
            if(!tally.hasClass('fa-check') && !tally.hasClass('fa-clock-o')){
                $('.tally', elem).css('background', '#F2C32E');
            }
        }
    });
    setChance();
}
function setChance(){
    var own = parseInt($(".status.ng-binding").text());
    var total = parseInt($(".current.ng-binding").text());
    var chance = Math.round(10000 * own / total) / 100;
    $("#winning-chance").text(chance+"%");
}
