$(function() {

  if (!$('#regist_card')[0]) return false;
  
  // 誤って秘密鍵を入れて公開してしまった場合は、必ず管理画面からAPIキーの更新を行って下さい。
  // 秘密鍵を入れて動作させた場合、Sending credit card numbers directly to the API is generally unsafe. Use Checkout or payjp.js. というエラーが発生し、トークン作成は行えません。400エラーがでる。
  Payjp.setPublicKey("pk_test_4c1e96738ab18eb60c5ce260");

  $("#regist_card").on("click", function(e) {
    e.preventDefault();
    var card = {
        number: $("#card_number_form").val(),
        exp_month: $("#exp_month_form").val(),
        exp_year: $("#exp_year_form").val(),
        cvc: $("#cvc_form").val()
    };

    Payjp.createToken(card, function(status, response) {
      console.log(card)
      console.log(response)
      if (status === 200) {
        $("#card_number_form").removeAttr("name");
        $("#exp_month_form").removeAttr("name");
        $("#exp_year_form").removeAttr("name");
        $("#cvc_form").removeAttr("name");
        var token = response.id;
        $("#card_token").append(`<input type="hidden" name="card_token" value=${token}>`)
        $("#card_form").get(0).submit();
      } else {
        alert("カード情報が正しくありません。");
        $("#regist_card").prop('disabled', false);
      }
    });
  });
});