// MediaPipe（ブラウザ版）の「専門家」を準備するための共通ファイル。
// Python の mediapipe.solutions と同じことを JavaScript で行います。
import {
  FilesetResolver,
  FaceDetector,
  HandLandmarker,
  PoseLandmarker,
  FaceLandmarker,
} from "@mediapipe/tasks-vision";

// AI を動かすための WASM（計算エンジン）の置き場所（CDN）。
// package.json の @mediapipe/tasks-vision のバージョンと必ず合わせること。
const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm";

// AIモデル（学習済みデータ）の置き場所。Google が公開しているものを使う。
const MODELS = {
  face: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
  hand: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
  pose: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
  faceMesh:
    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
};

// WASM は一度だけ読み込めばよいので、結果を使いまわす（Python の @st.cache_resource 相当）
let filesetPromise = null;
function getFileset() {
  if (!filesetPromise) filesetPromise = FilesetResolver.forVisionTasks(WASM_URL);
  return filesetPromise;
}

// 顔を見つける専門家（Step3）
export async function createFaceDetector() {
  const vision = await getFileset();
  return FaceDetector.createFromOptions(vision, {
    baseOptions: { modelAssetPath: MODELS.face, delegate: "GPU" },
    runningMode: "VIDEO",
    minDetectionConfidence: 0.5,
  });
}

// 手を見つける専門家（Step4・じゃんけん）
export async function createHandLandmarker(numHands = 2) {
  const vision = await getFileset();
  return HandLandmarker.createFromOptions(vision, {
    baseOptions: { modelAssetPath: MODELS.hand, delegate: "GPU" },
    runningMode: "VIDEO",
    numHands,
    minHandDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
}

// 姿勢を見つける専門家（Step6）
export async function createPoseLandmarker() {
  const vision = await getFileset();
  return PoseLandmarker.createFromOptions(vision, {
    baseOptions: { modelAssetPath: MODELS.pose, delegate: "GPU" },
    runningMode: "VIDEO",
    numPoses: 1,
    minPoseDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
}

// 顔の細かい特徴（468点メッシュ）を見つける専門家（Step5・オープンキャンパスデモ）
export async function createFaceLandmarker(numFaces = 1) {
  const vision = await getFileset();
  return FaceLandmarker.createFromOptions(vision, {
    baseOptions: { modelAssetPath: MODELS.faceMesh, delegate: "GPU" },
    runningMode: "VIDEO",
    numFaces,
  });
}

// 描画ユーティリティと骨格の「つなぎ方」もここから使えるように再エクスポート
export { DrawingUtils } from "@mediapipe/tasks-vision";
export { HandLandmarker, PoseLandmarker, FaceLandmarker };
