// 非同期でエラーメッセージを表示する
$(function(){
  $(`input[type="submit"]`).on("click", function (e) {
    e.preventDefault();

    const form = $("#item_form");
    let url = form.attr("action");
    let formData = new FormData(form[0]);

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function (item) {
      console.log(item)
      if (item.error) {
        $(`.error-field`).text("");
        Object.keys(item.error).forEach(function (key) {
          $(`.error-field[data-column-name="${key}"]`).text(item.error[key][0]);
        });
        alert("商品出品に失敗しました");
        return false;
      }
    })
    .fail(function () {
      alert("商品出品に失敗しました");
    })
    .always(function () {
      $(".button").prop('disabled', false);
    })
  })
})