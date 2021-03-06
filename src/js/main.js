console.log('Hello, world!');

$(() => {
  var $body = $('body');
  if($body.hasClass('page-register')) {
    $('[name="form-profile"]').on('submit', (evt) => {
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
        "message": message,
      }

      console.log(data);

      $.ajax({
        type: 'POST',
        url: $target.attr('action'),
        data: data,
        success: (res) => {
          var $dialog = $('.dialog');
          console.log('200: ', res);
          var err = res.error;
          $target.find('.item .message').text('');
          $target.find('.item .input').removeClass('is-invalid');
          $dialog.removeClass('show');
          if(err) {
            Object.keys(err).forEach((key) => {
              $target.find(`[name="${key}"]`).closest('.item').find('.message').text(err[key]);
              $target.find(`[name="${key}"]`).closest('.input').addClass('is-invalid');
            });
          } else {
            $dialog.addClass('show');
          }
        },
        error: (res) => {
          console.log(res);
        },
        dataType: 'json',
      });
    });
  }

  if($body.hasClass('page-profile')) {
    let $animation = $body.find('.animation');
    if($animation.length > 0) {
      init();
    }
  }

  if($body.hasClass('page-kanpaist')) {
    setTimeout(() => {
      location.reload();
    }, 30000);
  }
});

console.log('Thanks, world!');
