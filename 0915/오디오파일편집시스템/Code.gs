/**
 * 오디오 에디터 웹 앱
 * Google Apps Script 진입점
 *
 * 배포 방법:
 * 1. script.google.com 에서 새 프로젝트 생성
 * 2. Code.gs 내용을 그대로 붙여넣기
 * 3. 파일 추가 > HTML 파일 > 이름을 "index" 로 저장하고 index.html 내용 붙여넣기
 * 4. 배포 > 새 배포 > 유형: 웹 앱 선택 후 배포
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('오디오 에디터')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
