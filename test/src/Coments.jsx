import { useState } from "react";
import { ReactComponent as TumbsUp } from './svg/ThumbsUp.svg';
import { ReactComponent as User } from './svg/User.svg';
import { ReactComponent as Bin } from './svg/Bin.svg';
import { ReactComponent as Coment } from './svg/Coment.svg';
import { ReactComponent as Arrow } from './svg/arrows.svg'
export default function Coments({ coments, coment, setNewComents }) {

  const [showInput, setShowInput] = useState(false);

  const showInputControl = () => {
    setShowInput(!showInput);
  }

  const replyComent = (event, replyComent) => {
    event.preventDefault();
    console.log(event.target.reply.value)
    const replyText = event.target.reply.value;

    const copyComents = [...coments];

    copyComents.forEach((coment) => {
      if (coment.text === replyComent.text) {
        coment.reply = [...coment.reply, { text: replyText, likes: false }]
      }
    }
    )
    console.log(copyComents);

    setNewComents(copyComents);
  }

  const deleteComent = (deleteComent) => {
    const newComents = coments.filter((coment) =>
      coment.text !== deleteComent.text
    );

    setNewComents(newComents);
  }

  const deleteReply = (coment, deleteComent) => {
    const newReply = coment.reply.filter((re) =>
      re.text !== deleteComent.text);
    coment.reply = newReply;

    const copyComents = [...coments];
    copyComents.forEach((co) => {
      if (co.text === coment.text) {
        console.log(co.text, coment.text);
        co = coment;
      }
    }
    )
    setNewComents(copyComents);
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
    setNewComents(copyComents);
  }

  return (
    <div className="container mx-auto max-w-3xl">
      <div className='flex justify-between items-center p-2'>
        <div className='flex items-center space-x-2'>
          <User className=' rounded-full' />
          <span className="rounded-full bg-gray-300 px-2 py-1">{coment.text}</span>
        </div>
        <div className='flex items-center'>
          <label onClick={(e) => likeComent(e, coment)}>
            <TumbsUp fill={coment.likes === true ? '#22372B' : '#fff'} />
            <input type='radio' className='hidden' />
          </label>
          <button onClick={() => showInputControl()}><Coment /></button>
          <button className=' rounded-sm text-sm p-1' onClick={() => deleteComent(coment)}><Bin /></button>
        </div>
      </div>
      {showInput &&
        <form className='flex ml-10' onSubmit={(e) => { showInputControl(); replyComent(e, coment) }}>
          <input name='reply' type='text' className="textInput" placeholder="답글을 입력해주세요" />
          <button type='submit' className='rounded-full bg-[#22372B] text-white px-3 py-1'>
            <Arrow className='w-4 h-8' fill='#fff' />
          </button>
        </form>}
      {coment.reply.length > 0 && coment.reply.map((re) =>
        <div className="flex justify-between items-cetner space-y-4">
          <div className='pl-6 flex items-center space-x-2'>
            <User />
            <span className='rounded-full bg-gray-300 px-2 py-1'>{re.text}</span>
          </div>
          <button className='pr-3' onClick={() => deleteReply(coment, re)}><Bin /></button>
        </div>
      )}
    </div>
  )
}