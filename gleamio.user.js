// ==UserScript==
// @name         Gleam.io Autosolve
// @namespace    GLEAM
// @version      0.8
// @description  lets save some time
// @author       Tackyou
// @match        *gleam.io/*
// @grant        none
// ==/UserScript==

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
            }
        }   
        gi++;
        if(gi>6){
            clearInterval(gleam);
        }
}, 500);