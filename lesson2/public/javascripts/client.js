$(() => {
  $('form').on('submit', (event) => {
    event.preventDefault();

    const form = $(this);
    const formData = form.serialize();
    const submitButton = form.find('.form__btn_type_submit');
    const downloadButton = form.find('.form__btn_type_download');

    downloadButton.remove();

    submitButton.addClass('btn_is-loading');
    submitButton.attr('disabled', true);

    $.ajax({
      url: '/scrap',
      type: 'POST',
      data: formData
    })
    .done((response) => {
      const donwloadButton = `<a href="${response.filePath}" class="btn btn-lg btn-success form__btn form__btn_type_download">Download</a>`;
      $(donwloadButton).appendTo(form);
    })
    .fail((error) => {
      if (error.responseJSON && error.responseJSON.message) {
        toastr.error(error.responseJSON.message, 'Error!');
      } else {
        toastr.error(error.statusText, 'Error!');
      }
    })
    .always(() => {
      submitButton.removeClass('btn_is-loading');
      submitButton.attr('disabled', false);
    });
  });
});
