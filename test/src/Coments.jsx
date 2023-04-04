import { useState } from "react";
import { ReactComponent as TumbsUp } from './svg/ThumbsUp.svg';
import { ReactComponent as User } from './svg/User.svg';
import { ReactComponent as Bin } from './svg/Bin.svg';
import { ReactComponent as Coment } from './svg/Coment.svg';
import { ReactComponent as Arrow } from './svg/arrows.svg'
import { DateTime } from "luxon";
export default function Coments({ coments, coment, setNewComents }) {

  const [showInput, setShowInput] = useState(false);

  const showInputControl = () => {
    setShowInput(!showInput);
  }

  const replyComent = (event, replyComent) => {
    event.preventDefault();
    const replyText = event.target.reply.value;

    const copyComents = [...coments];

    copyComents.forEach((coment) => {
      if (coment.date === replyComent.date) {
        coment.reply = [...coment.reply, { text: replyText, likes: false,  date: DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS), }]
      }
    }
    )

    setNewComents(copyComents);
  }

  const deleteComent = (deleteComent) => {
    const newComents = coments.filter((coment) =>
      coment.date !== deleteComent.date
    );

    setNewComents(newComents);
  }

  const deleteReply = (coment, deleteComent) => {
    const newReply = coment.reply.filter((re) =>
      re.date !== deleteComent.date);
      coment.reply = newReply;

    const copyComents = [...coments];
    copyComents.forEach((co) => {
      if (co.date === coment.date) {
        co = coment;
      }
    }
    )
    setNewComents(copyComents);
  }

  const likeComent = (e, likeComent) => {
    e.preventDefault();

    const copyComents = [...coments];

    copyComents.forEach((coment) => {
      if (coment.date === likeComent.date) {
        likeComent.likes ? coment.likes = false : coment.likes = true;
      }
    }
    )
    setNewComents(copyComents);
  }

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="flex flex-col"> 
      <div className='flex justify-between items-center p-1'>
        <div className='flex items-center space-x-2'>
          <User className='rounded-full flex-none' />
          <span className="rounded-full bg-gray-300 px-3 py-2">{coment.text}</span>
        </div>
       
        <div className='flex items-center'>
          <label onClick={(e) => likeComent(e, coment)} className='cursor-pointer'>
            <TumbsUp fill={coment.likes === true ? '#22372B' : '#fff'} />
            <input type='radio' className='hidden' />
          </label>
          <button onClick={() => showInputControl()}><Coment /></button>
          <button className=' rounded-sm text-sm' onClick={() => deleteComent(coment)}><Bin /></button>
        </div>
      </div>
      <span className="text-sm text-gray-400 pl-10">{coment.date}</span>
      </div>
      {showInput &&
        <form className='flex ml-10 my-1' onSubmit={(e) => { showInputControl(); replyComent(e, coment) }}>
          <input name='reply' type='text' className="textInput" placeholder="답글을 입력해주세요" />
          <button type='submit' className='rounded-full bg-[#22372B] text-white px-3 py-1'>
            <Arrow className='w-4 h-8' fill='#fff' />
          </button>
        </form>}
      {coment.reply.length > 0 && coment.reply.map((re) =>
      <div className="flex flex-col">
        <div className="flex justify-between items-center my-1">
          <div className='pl-6 flex items-center space-x-2'>
            <User />
            <span className='rounded-full bg-gray-300 px-3 py-2'>{re.text}</span>
          </div>
          <button className='pr-1 flex items-center' onClick={() => deleteReply(coment, re)}>
            <Bin/>
          </button>
        </div>
        <span className="text-sm text-gray-400 pl-16 ">{re.date}</span>
        </div>
      )}
    </div>
  )
}