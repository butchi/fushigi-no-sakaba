!function c(r,e,a){function t(rc,ec){if(!e[rc]){if(!r[rc]){var ac="function"==typeof require&&require;if(!ec&&ac)return ac(rc,!0);if(cc)return cc(rc,!0);var tc=new Error("Cannot find module '"+rc+"'");throw tc.code="MODULE_NOT_FOUND",tc}var cr=e[rc]={exports:{}};r[rc][0].call(cr.exports,function(c){var e=r[rc][1][c];return t(e?e:c)},cr,cr.exports,c,r,e,a)}return e[rc].exports}for(var cc="function"==typeof require&&require,rc=0;rc<a.length;rc++)t(a[rc]);return t}({1:[function(c,r,e){"use strict";console.log("Hello, world!"),$(function(){var c=$("body");c.hasClass("page-register")&&$('[name="form-profile"]').on("submit",function(c){c.preventDefault();var r=$(c.target),e=r.find('[name="hidden-key"]').val(),a=r.find('[name="screen-name"]').val(),t=r.find('[name="facebook-url"]').val(),cc=r.find('[name="twitter-id"]').val(),rc=r.find('[name="message"]').val(),ec={"hidden-key":e,"screen-name":a,"facebook-url":t,"twitter-id":cc,message:rc};console.log(ec),$.ajax({type:"POST",url:r.attr("action"),data:ec,success:function(c){var e=$(".dialog");console.log("200: ",c);var a=c.error;r.find(".item .message").text(""),r.find(".item .input").removeClass("is-invalid"),e.removeClass("show"),a?Object.keys(a).forEach(function(c){r.find('[name="'+c+'"]').closest(".item").find(".message").text(a[c]),r.find('[name="'+c+'"]').closest(".input").addClass("is-invalid")}):e.addClass("show")},error:function(c){console.log(c)},dataType:"json"})}),c.hasClass("page-profile")&&!function(){var r=c.find(".animation");r.length>0&&(init(),setTimeout(function(){r.closest(".aside").fadeOut(500)},5e3))}()}),console.log("Thanks, world!")},{}]},{},[1]);