function getPaginationItems({ total = 20, current = 10, pageRange = 3 } = {}) {
  const DOTS = 2;
  const LAST_INDEX = total + DOTS - 1;

  let items = [];

  pageRange += DOTS;
  if (pageRange < 1) { 1 + DOTS };

  // simple case
  if (total <= pageRange + DOTS) {

    for (let i = 0; i < total; i++) {
      let page = {
        content: i + 1,
        show: false
      };

      items.push(page);
    }

    for (let i = 0; i < total; i++) {

      items[i].show = true;

    }

    console.log(items);
    return items;
  }

  // main case

  let page1 = {
    content: "...",
    show: false
  };

  let page2 = {
    content: "...",
    show: false
  };

  //fill all values
  for (let i = 0; i < total; i++) {

    let page = {
      content: i + 1,
      show: false
    };

    items.push(page);

  }

  //add dots
  items.splice(1, 0, page1);
  items.splice(items.length - 1, 0, page2);

  //conditions
  items[0].show = true;
  items[LAST_INDEX].show = true;

  for (let i = 0; i < items.length; i++) {
    //shuffle in start
    if (current < pageRange) {
      page1.show = false;
      page2.show = true;

      if (i <= pageRange) {
        items[i].show = true;
      }
    }

    if (current >= pageRange) {

      page1.show = true;

      //shuffle in the middle
      if (current + 1 < total - pageRange + DOTS) {
        page2.show = true;
        const delt = current - Math.floor(pageRange / 2);

        if (i > delt && i <= ((pageRange - DOTS) + delt)) {
          items[i].show = true;
        }

      }
      //shuffle in the end
      else {
        page2.show = false;
        const delt = total - pageRange;

        if (i > delt) {
          items[i].show = true;
        }
      }
    }
  }

  const result = items.filter(i => i.show).map(i => {

    delete i.show;

    if (i.content.toString().trim() === current.toString().trim()) {
      i.active = true;
    }

    return i;
  });

  return result;
}

//render to html

let template = '';
const items = getPaginationItems();

items.forEach(item => {

  const string = `<span style="padding: 10px; font-size: 26px; ${item.active ? 'color:red;' : ''}" >${item.content}</span>`

  template += string;

});

document.getElementById('pagination').innerHTML = template;