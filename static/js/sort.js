const headers = Array.from(document.querySelectorAll('th[data-index]'));

headers.forEach(x => x.addEventListener('click', sortColumn));
function sortColumn(e) {
  let columnHeader = e.target;
  if (!columnHeader.classList.contains('ascending')&&(!columnHeader.classList.contains('descending'))) {
    columnHeader.classList.add('ascending');
  }
  let columnIndex = columnHeader.dataset.index;
  let asc = columnHeader.classList.contains('ascending');
  sortTable(columnIndex, asc);

  if (asc) {
      columnHeader.classList.remove('ascending')
      columnHeader.classList.add('descending')
  }else {
      columnHeader.classList.add('ascending')
      columnHeader.classList.remove('descending')
  }
}

function sortTable(columnIndex,asc=true) {
  let tableRows = document.querySelectorAll('table#my-table tbody tr');
  let arr = Array.from(tableRows);

  function compareAdapter(a, b) {
    return compare(a,b,columnIndex)
    }

  let sortedArr = arr.sort(compareAdapter);
  if (!asc) {
      sortedArr = sortedArr.reverse()
  }
  document.querySelector('table#my-table tbody').innerText='';
  sortedArr.forEach(element => document.querySelector('table#my-table tbody').appendChild(element))
}

function compare(a, b, columnIndex) {
    let aTitle = a.children[columnIndex].innerText;
    let bTitle = b.children[columnIndex].innerText;
    if (aTitle < bTitle) {
      return -1;
    }
    if (aTitle > bTitle) {
      return 1;
    }
    return 0;
}
