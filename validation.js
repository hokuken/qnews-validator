/**
 * Validation for QNewsletter
 */

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function reduce(accumulator){
    if (this===null || this===undefined) throw new TypeError("Object is null or undefined");

    var i = 0, l = this.length >> 0, curr;

    if(typeof accumulator !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
      throw new TypeError("First argument is not callable");

    if(arguments.length < 2) {
      if (l === 0) throw new TypeError("Array length is 0 and no second argument");
      curr = this[0];
      i = 1; // start accumulating at the second element
    }
    else
      curr = arguments[1];

    while (i < l) {
      if(i in this) curr = accumulator.call(undefined, curr, this[i], i, this);
      ++i;
    }

    return curr;
  };
}

$(function(){

  // ----- 必要があれば編集してください -----

      // フォーム
  var registerForm    = $("#registForm").get(0),

      // メールアドレスの入力欄
      email_input     = $('input:text[name="user/email"]').get(0),

      // 確認用メールアドレスの入力欄
      email2_input    = $('input:text[name="user/email2"]').get(0),

      // エラーメッセージの表示先
      err_placeholder = $('#registFormErr').get(0);

      // フォームが送信不可の際に付けられるクラス名
  var lockedClassName = "qnews-locked-form";

      // validateEmailConfirmation で利用されるエラーメッセージ
  var errEmailConfirmation = 'メールアドレスと確認用メールアドレスには同じ内容をご入力ください。';


  // ----- 以下は編集しないでください -----

  var validators = [];

  // フォームを送信不可にする
  var disableForm = function(){
  $(registerForm)
    .prop("disabled", true)
    .addClass(lockedClassName)
    .on("submit.qnews", function(e){
      e.preventDefault();
    });
  };

  // フォームを送信可能にする
  var enableForm = function(){
  $(registerForm)
    .prop("disabled", false)
    .removeClass(lockedClassName)
    .off("submit.qnews");
  }

  // フォームを検証可能にする
  var enableValidation = function(){
    disableForm();
    $(registerForm).on("change", validateFormOnChange);
  };

  // フォームを検証し、結果により
  // フォームを送信可能にしたり、
  // エラーメッセージを表示したりする。
  var validateFormOnChange = function(){
    results = validate();
    if (formIsOK(results)) {
      clearErrs();
      enableForm();
    }
    else showErrs(results);
  };

  // email と email2 の一致を検証する
  // @return {success: boolean, err: string}
  var validateEmailConfirmation = function(){
    var email =  $(email_input).val().trim(),
        email2 = $(email2_input).val().trim();
    if (email.length === 0 || email2.length === 0) return;
    if (email == email2) return {success: true, err: ''};
    return {success: false, err: errEmailConfirmation};
  };

  // フォームを検証する
  // @return array
  var validate = function(callback){
    return $.map(validators, function(validator){
      return validator();
    });
  };

  // フォームに入力された値が正しいかどうか
  // @param array from validate
  // @return boolean
  var formIsOK = function(results){
    var callback = function(v, result){
      if (typeof v === "undefined") return result.success;
      if (typeof result === "undefined") return v;
      return v && result.success;
    };
    return !!results.reduce(callback, undefined);
  };

  // エラーメッセージのみ抽出する
  // @param array from validate
  // @return array of errs
  var getErrs = function(results){
    return $.map(results, function(result){
      if ( ! result.success) {
        return result.err;
      }
    });
  };

  // 要素 err_placeholder 内にエラーメッセージを表示する
  // @param array from validate
  var showErrs = function(results){
    var errs = getErrs(results);
    $(err_placeholder).html(errs.join("<br>\n"));
  };

  // 要素 err_placeholder 内のエラーメッセージを消去する
  var clearErrs = function(){
    $(err_placeholder).empty();
  };

  // メインロジック
  var main = function(){
    validators.push(validateEmailConfirmation);
    enableValidation();
  };

  main();

});
