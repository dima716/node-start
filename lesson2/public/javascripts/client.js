$(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();

    var form = $(this);
    var formData = form.serialize();
    var submitButton = form.find('button');

    submitButton.addClass('btn_is-loading');

    $.ajax({
      url: '/scrap',
      type: 'POST',
      data: formData,
    })
    .done(function(response) {
      $(`<div>Server response: ${JSON.stringify(response)}</div>`).appendTo(form);
      console.log(response);
    })
    .fail(function(error) {
      console.log(error);
    })
    .always(function() {
      submitButton.removeClass('btn_is-loading');
    });

  });
});
