$(function(){
  function appendChildSelect(child) {
    var html =
        `<select required="required" class="select-category" id="child-category" name="item[category_id]">
          <option value>---</option>
        </select>`
    $("#parent-category").after(html)
  }

  function appendChild(child) {
    $("#child-category").append(
      $("<option>").val($(child).attr('id')).text($(child).attr('name'))
    )
  }

  function appendGrandChildSelect(grandchild) {
    var html =
        `<select required="required" class="select-category" id="grandchild-category" name="item[category_id]">
          <option value>---</option>
        </select>`
    $("#child-category").after(html)
  }

  function appendGrandChild(grandchild) {
    $("#grandchild-category").append(
      $("<option>").val($(grandchild).attr('id')).text($(grandchild).attr('name'))
    )
  }

  $('#parent-category').change(function(e) {
    e.preventDefault();
    // parentにはvalueの値(番号)が入る
    var parent = $(this).val();

    // 2段目のプルダウン
    // カテゴリーを切り替えた時に、その下のプルダウンを消す記述
    $("#child-category").remove()

    // 3段目のプルダウン
    // カテゴリーを切り替えた時に、その下のプルダウンを消す記述
    $("#grandchild-category").remove()

    $.ajax({ 
      url: '/items/new',
      type: 'GET',
      // キー(選択されたvalueの値(番号)を送っている)
      data: ('parent=' + parent),
      dataType: 'json'
    })

    .done(function(child) {
      appendChildSelect(child)
      child.forEach(function(child) {
        appendChild(child)
      })
    })
  })

  // 子カテゴリーが選択された際にその子要素を取り出すajax通信
  $(document).on('change', '#child-category', function() {
    // childにはvalueの値(番号)が入る
    var child = $(this).val();

    // 3段目のプルダウン
    // カテゴリーを切り替えた時に、その下のプルダウンを消す記述
    $("#grandchild-category").remove()

    $.ajax({ 
      url: '/items/new', 
      type: 'GET', 
      data: ('child=' + child), 
      dataType: 'json' 
    })

    .done(function(grandchild) {
      appendGrandChildSelect(grandchild)
      grandchild.forEach(function(grandchild) {
        appendGrandChild(grandchild)
      })
    })
  })
})