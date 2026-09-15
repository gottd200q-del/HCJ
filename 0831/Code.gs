function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('경주 1박2일 팀 MT 일정')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
