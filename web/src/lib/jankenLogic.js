// jankenLogic.js
// このファイルに、じゃんけんの判定ロジックを実装しよう！
// （Python版の advanced/janken_logic.py と同じ内容です）

// 手の形（グー・チョキ・パー）を、伸びている指の本数で判定する関数
export function classifyHandGesture(landmarks) {
  // 指の「先端」と「第二関節」のランドマーク番号
  // 人差し指, 中指, 薬指, 小指
  const TIP_IDS = [8, 12, 16, 20];
  const PIP_IDS = [6, 10, 14, 18];

  // 「伸びている」指の本数を数える
  let count = 0;
  for (let i = 0; i < TIP_IDS.length; i++) {
    const tipY = landmarks[TIP_IDS[i]].y;
    const pipY = landmarks[PIP_IDS[i]].y;
    // 指先のyが第二関節のyより小さい（＝画面の上にある）なら「伸びている」
    if (tipY < pipY) count += 1;
  }

  // ★穴埋め①：count の本数に応じて手を返そう（下のコメントを外す）
  // if (count === 0) return "GU";    // グー：指が全部閉じている
  // if (count === 2) return "CHOKI"; // チョキ：2本指
  // if (count >= 4) return "PA";     // パー：指が全部開いている

  return "UNKNOWN"; // どれにも当てはまらない場合
}

// プレイヤーの手とAIの手を比べて、勝敗を判定する関数
// 戻り値：プレイヤーから見て "WIN" / "LOSE" / "DRAW"
export function decideWinner(playerHand, aiHand) {
  // あいこ（DRAW）
  if (playerHand === aiHand) return "DRAW";

  // ★穴埋め②：プレイヤーが勝つ組み合わせを書こう（"" を "GU"/"CHOKI"/"PA" に、""を"WIN"/"LOSE"に）
  if (
    (playerHand === "" && aiHand === "") ||
    (playerHand === "" && aiHand === "") ||
    (playerHand === "" && aiHand === "")
  ) {
    return "";
  }

  // 上のどれにも当てはまらなければ、プレイヤーの負け
  return "";
}
