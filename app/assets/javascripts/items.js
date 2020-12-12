$(function(){
  const buildFileField = (index)=> {
    const html = `<div class="new-item-image" data-index="${index}">
                    <input class="js-file" type="file"
                    name="item[images_attributes][${index}][src]"
                    id="item_images_attributes_${index}_src">
                    <div class="js-remove">削除</div>
                  </div>`;
    return html;
  }

  function buildImg(blob, index) {
    html = `
            <div class="item-image new" data-index=${index}>
              <img src =${blob} class="item-image__image">
              <div class="item-image__buttons">
                <div class="item-image__buttons--edit">
                編集
                </div>
                <div class="item-image__buttons--delete">
                削除
                </div>
              </div>
            </div>
            `;
    return html;
  }

  let fileIndex = [1,2,3,4,5,6,7,8,9,10]
  lastIndex = $('.new-item-image:last').data('index');
  fileIndex.splice(0, lastIndex);
  $('.hidden-destroy').hide();

  // グレーの部分をクリックした瞬間に発火
  $("#select-image-button").on("click", function () {
    if ($(".item-image__image").length >= 5) {
      alert.log("これ以上画像UPできません ");
      return false;
    }
    let file_field = $(`.js-file`).last();
    file_field.trigger("click");
  });

  // 新規画像投稿の際に発火
  $('#image-file-fields').on('change', '.js-file', function(e) {
    const targetIndex = $(this).parent().data('index');
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);

    if ($(`. [data-index=${targetIndex}]`)[0]) {
      let before_image = $(`.item-image[data-index=${targetIndex}]`).find(".item-image__image")[0];
      before_image.setAttribute('src', blobUrl);
    } else { 
      $('#select-image-button').before(buildImg(blobUrl, targetIndex));
      $('#image-file-fields').append(buildFileField(fileIndex[0]));
      fileIndex.shift();
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
    }
  });

  // 編集ボタンが押された瞬間に発火
  $('#selected-item-images').on('click', '.item-image__buttons--edit', function(e) {
    let index = $(this).parents(".item-image")[0].dataset.index;
    $(`#item_images_attributes_${index}_src`).trigger("click");
  });

  // 削除ボタンが押された瞬間に発火
  $('#selected-item-images').on('click', '.item-image__buttons--delete', function() {
    $(this).parent().parent().remove();
    let index = $(this).parents(".item-image")[0].dataset.index;
    // プレビューから削除
    $(`#item_images_attributes_${index}_src`).remove();
    // DBから削除
    $(`#item_images_attributes_${index}__destroy`).prop("checked", true);
  });
});