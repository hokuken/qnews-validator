# QNewsletter 登録フォーム検証スクリプト

## 概要

QNewsletter の登録フォームに下記の検証機能を追加します。

* メールアドレスと確認用メールアドレスの一致

このスクリプトを読み込むと、上記の検証が通るまでフォームを送信することができなくなります。


## ファイル

下記のファイルが同梱されています。

* README.md
* validation.js
* validation.min.js

validation.min.js は validation.js を圧縮したものです。
通常は .min.js の方を読み込みます。


## インストール

`http://example.jp` という架空のサイトへ設置する想定でインストール手順を解説します。


1. スクリプトを設置

validation.min.js を適当な場所へ置きます。

例では設置先ドメインのルートフォルダに設置します。下記のようなURLでアクセスできます。
`http://example.jp/validation.min.js`


2. スクリプトを読み込む

下記の1行をHTMLに貼り付けます。

```
<script src="/validation.min.js"></script>
```

`jquery.js` の読み込み箇所よりも後にしてください。


3. インプット要素を追加する

つづけてHTMLに確認用メールアドレスのインプット要素を追加します。

```
<input type="text" name="user/email2" value="" />
```

実際の作業としては、既に `user/email` の要素が存在するので、
それを含む部分を丸ごとコピーして、 `name` 属性を `user/email2` へ書き換えます。


4. エラーメッセージの表示先要素を追加する

エラーメッセージを表示させたい部分へ下記のHTMLを追加します。

```
<div id="registFormErr" class="register-form-err"></div>
```

エラーが発生した場合、この中にエラーメッセージが挿入されます。
スタイルを指定したい場合はCSSで `.register-form-err` に対してスタイルを指定してください。

例：
```
<style>
.register-form-err {
	font-weight: bold;
  border: 1px solid red;
  color: red;
  padding: 10px;
}
</style>
```


## カスタマイズ

下記の部分をカスタマイズしていただけます。

* 登録フォームのID （デフォルト： `#registForm` ）
* エラーメッセージ （デフォルト：メールアドレスと確認用メールアドレスには同じ内容をご入力ください。）
* 押せない「確認」ボタンのスタイル

詳しい方法は下記で解説します。


### 登録フォームのIDをカスタマイズする

利用するスクリプトを `validate.min.js` から `validate.js` へ変更し、内容を編集してください。
下記の部分（18行目）でフォームの要素を取得しているので任意の要素へ変更してください。

```
  var registerForm    = $("#registForm").get(0);
```

### エラーメッセージをカスタマイズする

利用するスクリプトを `validate.min.js` から `validate.js` へ変更し、内容を編集してください。
下記の部分（33行目）でフォームの要素を取得しているので任意の要素へ変更してください。

```
  var errEmailConfirmation = 'メールアドレスと確認用メールアドレスには同じ内容をご入力ください。';
```

### 押せない「確認」ボタンのスタイル

検証が通るまで「確認」ボタンは押せなくなっていますが、見た目で分かりやすいようにしたい場合、ご自身でスタイルを定義できます。
下記の例を参考にしてください。


```
<style>
.qnews-locked-form input[type=submit],
.qnews-locked-form button[type=submit] {
	//任意のスタイル
}
</style>
```

## ライセンス

The MIT License (MIT)

Copyright (c) 2015 Hokuken.Inc <customer@hokuken.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
