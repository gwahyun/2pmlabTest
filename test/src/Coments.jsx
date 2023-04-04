import { useState } from "react";
import { ReactComponent as TumbsUp } from './svg/ThumbsUp.svg';
import { ReactComponent as User } from './svg/User.svg';


export default function Coments({coments, likeComent, deleteComent, replyComent}){

    const [showInput, setShowInput] = useState(false);

    const showInputControl=()=>{
        setShowInput(!showInput);
    }

    const deleteReply=(coment, deleteComent)=>{
        coment.reply.filter((re)=> 
        re.text !== deleteComent.text)
    }

    return(
        <div>
        {coments !== null &&
          coments.map((coment) =>
            <>
              <div className='border-2 flex justify-between items-center'>
                <div className='flex'>
                  <User className='bg-gray-300 rounded-full' />
                  <span >{coment.text}</span>
                </div>

                <div className='flex'>
                  <label onClick={(e) => likeComent(e, coment)}>
                    <TumbsUp className={coment.likes === true ? 'rounded-full bg-blue-400' : 'rounded-full'} />
                    <input type='radio' className='hidden' />
                  </label>
                  <button onClick={()=>showInputControl()}>댓글</button>
                  <button className='bg-gray-400 rounded-sm text-sm p-1' onClick={() => deleteComent(coment)}>삭제</button>
                </div>
              </div>
              {showInput && 
              <form onSubmit={(e)=> { showInputControl(); replyComent(e, coment)}}>
              <input name='reply' type='text' placeholder="답글을 입력해주세요"/>
              <button type='submit'>submit</button>
            </form>}
              {coment.reply.length > 0 && coment.reply.map((re) =>
              <div className="flex justify-between items-cetner">
              <div>{re}</div>
                <button className='bg-gray-400 rounded-sm text-sm p-1' onClick={() => deleteComent(coment)}>삭제</button> 
              </div>
              )}
            </>
          )
        }
      </div>
    )
}