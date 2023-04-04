import './App.css';
import { useState, useEffect } from 'react';
import Coments from './Coments';
import Content from './Content';
import { ReactComponent as Arrow } from './svg/arrows.svg'
function App() {

  const [coments, setComents] = useState([])

  useEffect(() => {
    if (localStorage.getItem('coments')) {
      setComents(JSON.parse(localStorage.getItem('coments')))
    };
  }, [])

  const setNewComents = (newComent) => {
    setComents(newComent)
    setLocalStorage(newComent);
  }

  const addComent = (e) => {
    e.preventDefault();

    const { value } = e.target.coment

    if (value.trim() === '') {
      return;
    }

    const newComents = [...coments, {
      text: value,
      likes: false,
      reply: [],
    }];

    e.target.coment.value = '';
    setNewComents(newComents);
  }



  const setLocalStorage = (coments) => {
    localStorage.setItem('coments', JSON.stringify(coments));
  }

  return (
    <div>
      <header className="App-header">
        <h2 className='bg-[#22372B] p-2 text-white font-bold'>오후두시랩</h2>
      </header>
      <div className='container mx-auto max-w-3xl'>
        <Content />
      </div>

      <div className='container mx-auto max-w-3xl'>
        <form className='flex space-x-2 drop-shadow-sm mb-1' onSubmit={(e) => addComent(e)}>
          <input name='coment' type='text' className='textInput' placeholder='댓글을 입력해주세요' />
          <button className='rounded-full bg-[#22372B] text-white px-3 py-1'>
            <Arrow className='w-4 h-8' fill='#fff' />
          </button>
        </form>
      </div>
      {coments !== null &&
        coments.map((coment, i) =>
          <Coments key={i} coments={coments} coment={coment} setNewComents={setNewComents} />
        )
      }

    </div>
  );
}

export default App;
