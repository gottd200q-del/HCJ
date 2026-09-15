# 🎬 Video to GIF Converter

> 동영상 파일을 브라우저에서 손쉽게 GIF 애니메이션으로 변환할 수 있는 웹 애플리케이션입니다.

---

## 📌 프로젝트 소개

본 프로젝트는 사용자가 업로드한 동영상 파일(MP4, WebM, MOV 등)의 프레임을 브라우저에서 직접 분할·인코딩하여 GIF 파일로 변환하고 다운로드할 수 있는 클라이언트 사이드 웹 도구입니다.

- **브랜드 로고 링크**: 화면 좌측 상단 로고 클릭 시 [nanalab.kr](https://nanalab.kr)로 이동
- **헤더 타이틀**: 우측 상단 `Video to GIF` 표기
- **메인 카피**: `Video → GIF` 및 `Make your own GIF Animation!`

---

## 🚀 주요 기능 (Features)

1. **드래그 앤 드롭 업로드**
   - 점선 영역으로 동영상 파일을 직접 끌어다 놓거나, `파일 업로드` 버튼을 눌러 탐색기에서 파일을 선택할 수 있습니다.
2. **동영상 썸네일 미리보기**
   - 파일이 업로드되면 목록에 카드 형태로 추가되며, 원본 동영상의 첫 장면을 썸네일로 즉시 확인할 수 있습니다.
3. **실시간 프로그레스 바 (0% ~ 100%)**
   - 프레임 추출 및 GIF 렌더링 진행률을 시각적인 게이지 바와 퍼센트(%) 수치로 실시간 제공합니다.
4. **성능 최적화 (29 FPS 제한)**
   - 지나치게 긴 인코딩 시간과 브라우저 메모리 부하를 방지하기 위해 최대 **29 FPS**로 프레임을 제한하여 신속하게 변환합니다.
5. **원클릭 GIF 다운로드**
   - 렌더링이 100% 완료되면 썸네일이 완성된 GIF 애니메이션으로 변경되고 `다운로드` 버튼이 활성화되어 로컬로 저장할 수 있습니다.
6. **서버 없는 순수 클라이언트 변환 (Privacy-Friendly)**
   - 동영상이 외부 서버로 전송되지 않고 사용자의 웹 브라우저 내에서 직접 변환되므로 빠르고 안전합니다.

---

## 🛠 기술 스택 (Tech Stack)

| 구분 | 기술 / 라이브러리 | 설명 |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) | 표준 웹 기술 기반 단일 페이지 애플리케이션 |
| **GIF Engine** | [gifshot](https://github.com/yahoo/gifshot) | Web Workers 및 Canvas 기반 클라이언트 사이드 GIF 인코딩 |

---

## 📂 파일 구조

```text
├── index.html        # UI 마크업, 스타일, 변환 스크립트가 포함된 메인 파일
├── logo.png          # 상단 헤더 좌측에 표시되는 로고 이미지
└── README.md         # 프로젝트 안내 및 사용 설명서
```

---

## 💻 사용 방법 (Getting Started)

1. **저장소 클론 또는 다운로드**
   ```bash
   git clone https://github.com/your-username/video-to-gif.git
   cd video-to-gif
   ```

2. **로고 이미지 준비**
   - 같은 디렉터리에 `logo.png` 파일을 넣어주세요. (이미지가 없더라도 기본 플레이스홀더로 대체 표시됩니다.)

3. **애플리케이션 실행**
   - `index.html` 파일을 더블 클릭하여 크롬(Chrome), 사파리(Safari), 엣지(Edge) 등 최신 웹 브라우저로 엽니다.
   - *팁: 로컬 보안 정책(CORS) 오류를 방지하기 위해 VS Code의 `Live Server` 확장을 사용해 여는 것을 권장합니다.*

4. **변환 및 다운로드**
   - 동영상 파일을 드롭다운 존에 올립니다.
   - 프로그레스 바가 **100%**로 채워지면 초록색 **[다운로드]** 버튼을 눌러 `.gif` 파일을 저장합니다.

---

## ⚙️ 설정 커스터마이징

`index.html` 내부의 `gifshot.createGIF` 옵션을 통해 화질 및 프레임을 자유롭게 조정할 수 있습니다.

```javascript
gifshot.createGIF({
  video: [videoUrl],
  numFrames: 30,         // 추출할 총 프레임 수
  gifWidth: 320,         // 생성될 GIF 너비
  gifHeight: 240,        // 생성될 GIF 높이
  sampleInterval: 10,    // 색상 샘플링 간격 (낮을수록 고화질, 연산 증가)
  numWorkers: 2,         // 백그라운드 인코딩 워커 스레드 수
  // ...
});
```

---

## 📄 라이선스 (License)

This project is licensed under the MIT License.