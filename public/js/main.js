(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

console.log('Hello, world!');

$(function () {
  var $body = $('body');
  if ($body.hasClass('page-register')) {
    $('[name="form-profile"]').on('submit', function (evt) {
      evt.preventDefault();

      var $target = $(evt.target);

      var hiddenKey = $target.find('[name="hidden-key"]').val();
      var screenName = $target.find('[name="screen-name"]').val();
      var facebookUrl = $target.find('[name="facebook-url"]').val();
      var twitterId = $target.find('[name="twitter-id"]').val();
      var message = $target.find('[name="message"]').val();

      var data = {
        "hidden-key": hiddenKey,
        "screen-name": screenName,
        "facebook-url": facebookUrl,
        "twitter-id": twitterId,
        "message": message
      };

      console.log(data);

      $.ajax({
        type: 'POST',
        url: $target.attr('action'),
        data: data,
        success: function success(res) {
          var $dialog = $('.dialog');
          console.log('200: ', res);
          var err = res.error;
          $target.find('.item .message').text('');
          $target.find('.item .input').removeClass('is-invalid');
          $dialog.removeClass('show');
          if (err) {
            Object.keys(err).forEach(function (key) {
              $target.find('[name="' + key + '"]').closest('.item').find('.message').text(err[key]);
              $target.find('[name="' + key + '"]').closest('.input').addClass('is-invalid');
            });
          } else {
            $dialog.addClass('show');
          }
        },
        error: function error(res) {
          console.log(res);
        },
        dataType: 'json'
      });
    });
  }

  if ($body.hasClass('page-profile')) {
    (function () {
      var $animation = $body.find('.animation');
      if ($animation.length > 0) {
        init();

        setTimeout(function () {
          $animation.closest('.aside').fadeOut(500);
        }, 5000);
      }
    })();
  }
});

console.log('Thanks, world!');

},{}]},{},[1]);
