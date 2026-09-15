function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("문서 분석기")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}
