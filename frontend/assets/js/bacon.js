import '../css/app.css'
import '../css/bacon.scss'

const handles = {
  button: document.querySelector('button'),
  container: document.querySelector('section:nth-child(2)'),
  bacon: document.querySelector('img'),
}

const handleClick = () => {
  const newBacon = handles.bacon.cloneNode(true)
  handles.container.appendChild(newBacon)
}

handles.button.addEventListener('click', () => handleClick())
