var titleTime,OriginTitile=document.title;document.addEventListener("visibilitychange",(function(){document.hidden?(document.title="燕子，我不能没有你😢",clearTimeout(titleTime)):(document.title="就知道你还会回来😎",titleTime=setTimeout((function(){document.title=OriginTitile}),2e3))}));