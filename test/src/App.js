import './App.css';
import { useState, useEffect } from 'react';
import { ReactComponent as TumbsUp } from './svg/ThumbsUp.svg';

function App() {

  const [coments, setComents] = useState([])

  useEffect(() => {
    if (localStorage.getItem('coments')) {
      setComents(JSON.parse(localStorage.getItem('coments')))
    };
  }, [])

  const submitCheck = (e) => {
    e.preventDefault();

    const { value } = e.target.coment

    const newComent = [...coments, {
      text: value,
      likes: false,
      reply: [],
    }];

    e.target.coment.value = '';

    setComents(newComent)
    setLocalStorage(newComent);
  }

  const deleteComent = (deleteComent) => {
    const newComents = coments.filter((coment) =>
      coment.text !== deleteComent.text
    );

    setComents(newComents);
    setLocalStorage(newComents);
  }

  const likeComent = (e, likeComent) => {
    e.preventDefault();
    console.log(likeComent);
    const copyComents = [...coments];

    copyComents.forEach((coment) => {
      if (coment.text === likeComent.text) {
        likeComent.likes ? coment.likes = false : coment.likes = true;
      }
    }
    )
    setComents(copyComents);
    setLocalStorage(copyComents);
  }

  const setLocalStorage = (coments) => {
    localStorage.setItem('coments', JSON.stringify(coments));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2 className='bg-blue-400 p-2 text-white font-bold'>2PMlab</h2>
      </header>
      <div className='container mx-auto'>
        <div></div>
        <form className='flex' onSubmit={(e) => submitCheck(e)}>
          <input name='coment' type='text' className='border rounded-sm px-2 py-1 w-full' placeholder='댓글을 입력해주세요' />
          <button>submit</button>
        </form>
      </div>
      <hr />
      <div>
        {coments !== null &&
          coments.map((coment) =>
            <div className='border-2 flex justify-between items-center'>
              <span >{coment.text}</span>
              <div className='flex'>
                <label onClick={(e) => likeComent(e, coment)}>
                  <TumbsUp className={coment.likes === true ? 'rounded-full bg-blue-400' : 'rounded-full'} />
                  <input type='radio' className='hidden' />
                </label>



                <button className='bg-gray-400 rounded-sm text-sm p-1' onClick={() => deleteComent(coment)}>삭제</button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
