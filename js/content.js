const movies = document.querySelectorAll('.movie');
movies.forEach(movie => {
  movie.addEventListener('click', () => {
    const title = movie.children[0]
      .getElementsByClassName('section-main-info')[0]
      .getElementsByClassName('typo-list-item-title')[0]
      .getElementsByClassName('title')[0].innerHTML;
    const lengthStr = movie.children[0]
      .getElementsByClassName('section-optional-info')[0]
      .getElementsByClassName('movie-length')[0].innerHTML;
    const tmp = lengthStr.split(':');
    const m = parseInt(tmp[0]);
    const s = parseInt(tmp[1]);

    chrome.runtime.sendMessage('', {
      type: 'clear',
    });
    chrome.runtime.sendMessage('', {
      type: 'set',
      title: title,
      when: Date.now() + (m * 60 + s) * 1000,
    });
  });
})
