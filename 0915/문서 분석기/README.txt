문서 분석기 - Google Apps Script 웹앱
구성: Code.gs / index.html
기능: PDF·DOCX 업로드, 글자 수, 단어 수, 공백 수, 이미지 수 표시.
PDF는 PDF.js, DOCX는 JSZip을 사용해 브라우저에서 직접 분석합니다.
설치: Apps Script 새 프로젝트 → Code.gs와 index.html 생성 → 배포 > 새 배포 > 웹 앱.
주의: 인터넷 연결이 필요합니다. 스캔 이미지형 PDF는 OCR이 없으므로 텍스트 수가 정확하지 않을 수 있습니다.
