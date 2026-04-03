//script.js
let records = [];//データを保存するようの変数
let editingId = null;

//データを読み込む(localStorageで)
const saved = localStorage.getItem("records");
if (saved) {
  records = JSON.parse(saved);//localStorageから取得した文字列を配列に戻す
}

const button = document.getElementById("add");
const input = document.getElementById("text");
const list = document.getElementById("list");

//表示させる関数
function render() {
  list.innerHTML = "";

  records.forEach((item) => {
    const li = document.createElement("li");

    if (editingId === item.id) {
      li.style.border = "2px solid #4f8cff";
    }//選択すると青色の部分になるのはこのコード

    // テキスト表示
    const span = document.createElement("span");
    span.textContent = item.text + "（" + item.createdAt + "）";

    // 編集（クリック）
    span.addEventListener("click", () => {
      input.value = item.text;
      editingId = item.id;
      render();
    });

    // 削除ボタン
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";

    deleteBtn.addEventListener("click", () => {
      records = records.filter(r => r.id !== item.id);
      save()
      render();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

//追加ボタン処理
button.addEventListener("click", () => {
  const value = input.value;
  if (value.trim() === "") return;//空入力防止

  const date = new Date().toLocaleDateString('ja-JP');

  if (editingId !== null) {
    // 編集モード
    records = records.map(r =>
      r.id === editingId ? { ...r, text: value } : r
    );
    editingId = null;
  } else {
    // 新規追加
    const newItem = {
      id: Date.now(),//IDを生成して削除時に識別できるようにする
      text: value,
      createdAt: date
    };
    records.push(newItem);
  }

  input.value = "";
  save()
  render();
});

function save() {
  localStorage.setItem("records", JSON.stringify(records));
}
render();

