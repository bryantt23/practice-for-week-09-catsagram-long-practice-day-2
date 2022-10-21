let popularityScore = 0;
export const createMainContent = () => {
  // Create h1
  const h1 = document.createElement('h1');
  h1.innerText = 'Catstagram';
  const p = document.createElement('p');
  p.classList.add('popularity');
  const commentLabel = document.createElement('p');
  commentLabel.innerText = 'Comment:';
  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('comment');
  const submitButton = createButton('Submit', addComment);
  const commentsSection = document.createElement('div');
  commentsSection.classList.add('comments');

  // Create img
  const img = document.createElement('img');
  img.style.margin = '20px';
  img.style.maxWidth = '750px';

  const replaceImageButton = createButton('Replace image', () => {
    popularityScore = 0;
    fetchImage();
    commentsSection.innerHTML = '';
  });
  const upvoteButton = createButton('Upvote', () => {
    popularityScore++;
    setPopularitySection();
  });
  const downvoteButton = createButton('Downvote', () => {
    popularityScore--;
    setPopularitySection();
  });

  const container = document.querySelector('.container');
  container.appendChild(h1);
  container.appendChild(p);
  container.appendChild(replaceImageButton);
  container.appendChild(upvoteButton);
  container.appendChild(downvoteButton);
  container.appendChild(replaceImageButton);
  container.appendChild(commentLabel);
  container.appendChild(input);
  container.appendChild(submitButton);
  fetchImage();
  container.appendChild(img);
  setPopularitySection();
  container.appendChild(commentsSection);
};

function addComment() {
  const inputText = document.querySelector('.comment').value;
  const comment = document.createElement('p');
  comment.innerText = inputText;
  const comments = document.querySelector('.comments');
  comments.appendChild(comment);
}

function setPopularitySection() {
  const popularitySection = document.querySelector('.popularity');
  popularitySection.innerText = `Popularity score ${popularityScore}`;
}

function createButton(text, func) {
  const button = document.createElement('button');
  button.innerText = text;
  button.addEventListener('click', () => {
    func();
  });
  return button;
}

const fetchImage = async () => {
  // Fetch image from API and set img url
  try {
    const kittenResponse = await fetch(
      'https://api.thecatapi.com/v1/images/search?size=small'
    );
    // Converts to JSON
    const kittenData = await kittenResponse.json();
    // console.log(kittenData);
    const kittenImg = document.querySelector('img');
    kittenImg.src = kittenData[0].url;
  } catch (e) {
    console.log('Failed to fetch image', e);
  }
};
