'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');



assessmentButton.addEventListener( // イベント検知設定の追加
  'click',  //HTMLのボタンタグがクリックされると次の関数が実行される
  () => {
  const userName = userNameInput.value;  //inputの値をvalueで取ってくる
  if (userName.length === 0){  //入力がからなら
    //名前が空の時は処理を終了する
    return;  //関数の中だからreturnが使える。　関数の処理を終了する効果
  }
  console.log(assessment(userName));   //ログ出力で確認

    //診断結果表示エリアの作成
resultDivision.innerText =''; //divタグを空文字で上書きすることで空にしている

    const headerDivision = document.createElement('div'); //h3タグの作成
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = '診断結果';     //タグの内側のテキストを設定
     resultDivision.appendChild(headerDivision); //divタグの子要素として追加

    //bodyDivisionの作成
    const bodyDivision =document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');
    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text')
    const result = assessment(userName);
    paragraph.innerText = result;  //診断結果を作成
    bodyDivision.appendChild(paragraph);

    resultDivision.appendChild(bodyDivision);

    //resultDivisionにもBootStrapのスタイルを適用
    resultDivision.setAttribute('class', 'card');
   
    //TODO ツイートエリアの作成
    //X投稿ボタンの作成
    tweetDivision.innerText=''; //Tweetのdivタグも空にする。
    const anchor = document.createElement('a'); //aタグの作成
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue); //属性hrefを追加
    anchor.setAttribute('class', 'twitter-hashtag-button'); 
    anchor.setAttribute('data-text', result); //診断結果を追加
    anchor.innerText = '#あなたのいいところを投稿する。'; //ボタンの文章

    tweetDivision.appendChild(anchor); //divの子要素として追加

    const script = document.createElement('script') ;
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script)




  }

)

userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter'){　//押されたキーがエンターなら
      //todo enterが押されたときに実行する処理
      assessmentButton.dispatchEvent(new Event('click'))
    }
  }
)
const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
  '###userName###のいいところは優しさです。###userName###の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string 文字列} userName ユーザーの名前
 * @return {string} 診断結果
 この説明をドックコメントという　JSDoc
*/
function assessment(userName) {
  //全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;   //文字コードの合計を取っておく変数
  for (let i = 0; i < userName.length; i++){  //文字数回ループ
    sumOfCharCode += userName.charCodeAt(i); //合計を計算
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  //合計値を配列の要素数で余りをとることで、配列の要素数の数値に収めることがきる
  const index = sumOfCharCode % answers.length;  
  let result = answers[index];   //　配列から答えを取得

  //TODO ###userName### をユーザーの名前に置き換える
  result = result.replaceAll('###userName###', userName);
  return result;   //診断結果を返す
}

//動作確認
/* console.log(assessment('太郎'))
console.log(assessment('二郎'))
console.log(assessment('挙夫')) */

//テストを行う関数
function test() {
  console.log('診断結果の文章のテスト');

  //太郎の場合
  console.log('太郎');
  console.assert(
    assessment('太郎') === '太郎のいいところはユニークさです。太郎だけのその特徴が皆を楽しくさせます。'
  );
  //次郎の場合
  console.log('次郎');
  console.assert(
    assessment('次郎') === '次郎のいいところはそのすべてです。ありのままの次郎自身がいいところなのです。'
  );
  //花子の場合
  console.log('花子');
  console.assert(
    assessment('花子') === '花子のいいところは情熱です。花子の情熱に周りの人は感化されます。'
  );
/**
  //同じ名前なら同じ結果が出力されるテスト
  console.assert(assessment('太郎') = assessment('太郎'))
 */
}

test()
