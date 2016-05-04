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
      var message = $target.find('[name="message"]').val();

      var data = {
        "hidden-key": hiddenKey,
        "screen-name": screenName,
        "facebook-url": facebookUrl,
        "message": message,
      }

      console.log(data);

      $.ajax({
        type: 'POST',
        url: $target.attr('action'),
        data: data,
        success: (res) => {
          console.log(res);
        },
        dataType: 'json',
      });
    });
  }
});

console.log('Thanks, world!');
