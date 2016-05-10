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
          console.log(200);
          var err = res.error;
          $target.find('.item .message').text('');
          if(err) {
            Object.keys(err).forEach((key) => {
              $target.find(`[name="${key}"]`).closest('.item').find('.message').text(err[key]);
            });
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
    init();
  }
});

console.log('Thanks, world!');
