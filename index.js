/*
時間集計の総労働時間 + 休暇みなし が 所定労働時間の総枠 

総労働時間

#kt-attendance-category-title-description-accordion-contents > div:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(1)

所定労働時間の総枠

#kt-attendance-category-title-description-accordion-contents > div:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)


休暇みなし

#kt-attendance-category-title-description-accordion-contents > div:nth-child(1) > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(11)
*/

javascript:(function func() {

  const SOUROUDOU = "#kt-attendance-category-title-description-accordion-contents > div:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(1)"
  const SYOTEI_SOWAKU = "#kt-attendance-category-title-description-accordion-contents > div:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)"
  const KYUKA_MINASHI = "#kt-attendance-category-title-description-accordion-contents > div:nth-child(1) > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(11)"

  /**
   * 指定したセレクタの時間を分で取得
   * @param {string} selector 
   */
  function pickTime(selector) {
    const elem = document.querySelector(selector)
    if (!elem) {
      throw new Error(`${selector} が見つかりませんでした`)
    }
    const text = elem.textContent
    const [hour, minute] = text.split(":")
    return parseInt(hour, 10) * 60 + parseInt(minute, 10)
  }

  /**
   *  分を hh:mm 形式の文字列にする
   * @param {int} min 
   */
  function minToReadable(min) {

    const h = min / 60 | 0
    const m = min % 60


    const hStr = h.toString().padStart(2, "0")
    const mStr = m.toString().padStart(2, "0")

    return `${hStr}:${mStr}`
  }

  function run() {
    const souroudouMin = pickTime(SOUROUDOU)
    const sowakuMin = pickTime(SYOTEI_SOWAKU)
    const kyukaMin = pickTime(KYUKA_MINASHI)

    const remainingRoudouMin = sowakuMin - (souroudouMin + kyukaMin)

    const message = `あと ${minToReadable(remainingRoudouMin)} の労働が必要です.`

    /*
    TODO:
    - 平均労働時間
    - その他必要そうな項目の表示
     */

    alert(message)
  }

  try {
    run()
  } catch (e) {
    console.error(e)
  }
})()