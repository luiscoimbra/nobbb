@bs.val external document: 'a = "document"
@bs.val external chrome: 'a = "chrome"

type dataset = {pagelet: option<string>}
type rec postAdded = {target: target, mutable originalContent: string}
and target = {
  dataset: option<dataset>,
  mutable innerHTML: string,
  innerText: string,
  addEventListener: (. string, unit => unit) => unit,
  removeEventListener: (. string, unit => unit) => unit,
}

%%private(
  // let domEventContentLoaded = "DOMContentLoaded"
  let domEventNodeInserted = "DOMNodeInserted"
  let feedContainerSelector = "[role='feed']"
  let warnContainer =
    "<div style='cursor: pointer; padding:10px; margin:15px 0; border-radius: 8px; height:18px; background:#F0E68C;'>" ++
    "<img src='" ++
    chrome["extension"]["getURL"]("resources/logo19.png") ++
    "' style='float:left' ><div style='margin:2px 0 0 30px;'>" ++
    "conte&uacute;do bloqueado pela extens&atilde;o NoBBB, se quiser ver " ++
    "clique aqui<br>" ++ "</div></div>"
  let textPattern = %re(
    "/bbb|big ?brother|boninho|paredao|estalecas|leifert|casa ? de ?vidro/gi"
  )

  let containsPattern = element =>
    switch Js.String.match_(textPattern, element.target.innerText) {
    | Some(_) => true
    | None => false
    }

  let isMatch = element =>
    switch element.target.dataset {
    | Some(dataSet) =>
      switch dataSet.pagelet {
      | Some(str) => Js.String.startsWith("FeedUnit_", str) ? element->containsPattern : false
      | None => false
      }
    | None => false
    }

  let rec show = element => {
    element.target.innerHTML = element.originalContent
    element.target.removeEventListener(."click", () => element->show)
  }

  let hide = element => {
    element.target.addEventListener(."click", () => element->show)
    element.target.innerHTML = warnContainer
  }
  let nodeInsertedHandler = element => {
    if element->isMatch {
      element.originalContent = element.target.innerHTML
      element->hide
    }
  }
)

document["querySelector"](feedContainerSelector)["addEventListener"](
  domEventNodeInserted,
  nodeInsertedHandler,
)
