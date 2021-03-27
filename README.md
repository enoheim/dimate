# dimate(自炊応援アプリ)

## URL
https://dimate.web.app  

## 概要
自分で考えたレシピや、各レシピを参考にしたレシピを記録し簡単に参照出来るWEBアプリです。  

## 作成背景
自炊をしよう！と思った時のために以下の課題解決を目的にWEBアプリを作成しました。
- 材料の分量表記を自分で分かりやすいものにして見返したい
- 動画でのレシピ発信を行われている方の動画を観ながら買い物するのが難しい
- 自分のレパートリーを可視化したい
- 個人的に必要無いと思う材料は排除してシンプルにしたい
- 個人的に必要無いと思う工程は排除してシンプルにしたい  

## 使用技術
### Frontend
React, TypeScript
### Backend
Firebase(Authentication, Firestore, Strage, Hosting)
### Other
Redux, Material-UI, ESlint, Prettier  

## 技術選定理由
フロントエンドの技術を学びたかったため、国内企業で多く採用されているReact、Vueのどちらを利用するか検討しました。  
ReactではMaterial-UIというライブラリが使用でき、画面のレスポンシブ対応が簡単に実装出来ること、  
興味のあったTypeScriptとの親和性が高いことからReactを選択しました。  
また、認証やDB、ストレージ等バックエンドやインフラの領域をカバーしてくれる  
Firebaseを使用することで、まずはフロントエンド側の学習に専念できると考えました。  

## 使用ツール
- [Cacoo](https://cacoo.com/)(ワイヤーフレーム作成)
- [Canva](https://www.canva.com/)(ロゴ作成)
- [Google スプレッドシート](https://www.google.com/intl/ja_jp/sheets/about/)(DB設計)
- [Notion](https://www.notion.so/)(アイデア出し、アウトプット)

  Notionについては、簡単にWEB公開が出来るということで気軽にアウトプットが行えると考え採用しました。  
  以下が学習記録(メモ)です。
- [React学習記録](https://www.notion.so/enoheim/React-26037a375dda46c58514eda65c281817)
- [Redux学習記録](https://www.notion.so/enoheim/Redux-84c065435cda4a53b748bd3175d71fb0)
- [TypeScript学習記録](https://www.notion.so/enoheim/TypeScript-8de692a86ad640a2b5606021fc3d556c)  

## 実装機能
- ログイン・ログアウト・ゲストログイン
- ユーザ作成・削除
- メールアドレス変更
- パスワード変更
- レシピ投稿・削除
- 画像投稿・画像削除
- カテゴリ別表示
- メッセージ表示
- レスポンシブWebデザイン  

## 実装予定
- テスト
- レシピ検索
- お気に入り登録・削除  

## 学習過程
学習過程を特にお世話になった方々とともに記載していきます。
1. [ドットインストール様](https://dotinstall.com/)
HTML、CSS、JavaScriptの基礎を学ばせていただきました。  
短時間の動画で基礎を学べるため、時間が空いたら気になる動画を観てみるという動きが出来ます。

2. [Udemy(Git：はじめてのGitとGitHub様)](https://www.udemy.com/course/intro_git/)
Git、GitHubの基礎を学ばせていただきました。  
構成管理ツールの使用経験はSVNのみでしたが、イメージを素早く掴むことが出来ました。

3. [【とらゼミ】トラハックのエンジニア学習講座様](https://www.youtube.com/channel/UC-bOAxx-YOsviSmqh8COR0w)
React、Redux、TypeScript、Material-UI、Firebaseについて学ばせていただきました。  
ハンズオン形式で丁寧に学べる動画を作成されており、現役エンジニアに直接指導を頂いているような  
感覚で学ぶことが出来ました。  
本アプリの設計手順についても動画を参考にさせていただきました。  
何度も動画を視聴し、Notionに自分なりにアウトプットすることで知識の定着を図りました。

4. [くるみ割り書房 ft. React様](https://oukayuka.booth.pm/)
React、TypeScriptについて学ばせていただきました。  
よりReact × TypeScript開発を学ぶために購入しましたが、JavaScriptの歴史やthisについて、  
Create React Appが何をしているのかについても記載されており理解が深まりました。  
対話形式で入り込みやすく、研修用の教材としても使われているということで今後も繰り返し読み込みたい教材です。  
購入したのは下記3冊です。
- りあクト！ TypeScriptで始めるつらくないReact開発 第3.1版【Ⅰ. 言語・環境編】
- りあクト！ TypeScriptで始めるつらくないReact開発 第3.1版【Ⅱ. React基礎編】
- りあクト！ TypeScriptで始めるつらくないReact開発 第3.1版【Ⅲ. React応用編】
