$(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();

    const form = $(this);
    const formData = form.serialize();
    const submitButton = form.find('.form__btn_type_submit');
    const downloadButton = form.find('.form__btn_type_download');

    downloadButton.remove();

    submitButton.addClass('btn_is-loading');

    $.ajax({
      url: '/scrap',
      type: 'POST',
      data: formData
    })
    .done(function(response) {
      const donwloadButton = `<a href="${response.filePath}" class="btn btn-lg btn-success form__btn form__btn_type_download">Download</a>`;
      $(donwloadButton).appendTo(form);
    })
    .fail(function(error) {
      toastr.error(`${error.responseText}`, 'Error!');
    })
    .always(function() {
      submitButton.removeClass('btn_is-loading');
    });

  });
});
