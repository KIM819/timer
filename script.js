/* 全体のレイアウト */
body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f4f4f4;
    overflow: hidden; /* スクロール禁止 */
}

.container {
    display: flex;
    flex-direction: row;
    width: 95%;
    max-width: 1000px;
    height: 95vh;
    background: white;
    padding: 5px; /* 余白を縮小 */
    border-radius: 10px;
    box-shadow: 2px 2px 10px #aaa;
    justify-content: space-between;
    align-items: center;
}

/* 左パネル（タイマー表示） */
.left-panel {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

/* 右パネル（ボタン） */
.right-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

/* タイマー部分 */
.main-timer {
    font-size: 2em;
    padding: 5px; /* 余白を縮小 */
    border-radius: 10px;
}

#timer-display {
    font-size: 3.5em; /* 文字サイズ調整 */
    font-weight: bold;
    margin: 5px 0; /* 上下の余白を減らす */
}

/* ステータス表示 */
.status {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px; /* 間隔を縮小 */
    font-size: 1.2em;
    font-weight: bold;
    margin: 5px auto; /* 余白を減らす */
    padding: 8px;
    background-color: #ddd;
    border-radius: 10px;
    width: 100%;
    max-width: 800px;
    text-align: center;
}

.status-item {
    flex: 1;
    text-align: center;
    padding: 5px; /* 余白を縮小 */
    border-radius: 5px;
    background: white;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

#total-countdown {
    color: #ff4500;
    font-size: 1.5em;
    font-weight: bold;
}

/* ボタン */
.controls button {
    font-size: 1em;
    margin: 5px;
    padding: 8px 12px;
    width: 110px; /* サイズ調整 */
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.controls button:hover {
    background-color: #0056b3;
}

/* 設定画面 */
.modal {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px #aaa;
    width: 280px;
    text-align: left;
}

.settings-group {
    margin: 8px 0;
}

.settings-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 3px;
}

.settings-group input {
    width: 100%;
    padding: 5px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.settings-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
}

.settings-buttons button {
    font-size: 0.9em;
    padding: 6px;
    width: 45%;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.settings-buttons button:hover {
    background-color: #218838;
}

#close-settings {
    background-color: #dc3545;
}

#close-settings:hover {
    background-color: #c82333;
}

/* 状態による背景色の変更 */
body.workout {
    background-color: #90ee90;
}

body.rest {
    background-color: #ff6666;
}

body.cycle-rest {
    background-color: #6699ff;
}
