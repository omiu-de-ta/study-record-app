//script.js
let records = [];//データを保存するようの変数

//データを読み込む(localStorageで)
const saved = localStorage.getItem("records");
if (saved) {
  records = JSON.parse(saved);//localStorageから取得した文字列を配列に戻す
}

const button = document.getElementById("add");
const input = document.getElementById("text");
const list = document.getElementById("list");

// 表示する関数
function render() {
  list.innerHTML = ""; 

  records.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.text;

    //クリックで削除する
    li.addEventListener("click", () => {
      records=records.filter(r => r.id !== item.id); 
      localStorage.setItem("records", JSON.stringify(records));// 配列を文字列に変換してlocalStorageに保存
      render(); // データ変更後に画面を更新するため再描画
    });

    list.appendChild(li);
  });
}

// 追加ボタン処理
button.addEventListener("click", () => {
  const value = input.value;
  if(value==="")return;//空入力防止
  const newItem = {
    id: Date.now(), //IDを生成して削除時に識別できるようにする
    text: value
  };

  records.push(newItem);
  localStorage.setItem("records", JSON.stringify(records));//保存

  input.value = ""; 
  render();
});
render();

