$(function(){
  // if (!$('#selected-item-images')[0]) return false; //カテゴリのフォームがないなら以降実行しない。

  const min_price = 300; // 最低価格

  // 価格から販売手数料、販売利益を算出して反映させる。
  function changeFeeAndProfit() {
    $("#fee").text("-");
    $("#profit").text("-");

    // .が含まれている＝整数ではないので終了。
    if ($("#item_price").val().match(/\./)) return false;

    // 数値ではないなら終了。
    if (isNaN($("#item_price").val())) return false;
    let price = Number($("#item_price").val());

    // 最低価格未満なら終了。
    if (Number(price) < min_price) return false;

    // Math.floorで小数を切り捨てる。
    let fee = Math.floor(price * 0.1);

    // 販売手数料（10%）
    $("#fee").text(`¥${fee}`);

    // 販売利益
    $("#profit").text(`¥${price-fee}`);
  }

  // changeFeeAndProfit(); // ブラウザの戻るボタン対策

  $(document).on("input", "#item_price", function () {
    changeFeeAndProfit();
  })
})