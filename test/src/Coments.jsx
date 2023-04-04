import { useState } from "react";
import { ReactComponent as TumbsUp } from './svg/ThumbsUp.svg';
import { ReactComponent as User } from './svg/User.svg';
import { ReactComponent as Bin } from './svg/Bin.svg';

export default function Coments({coments, likeComent, deleteComent, replyComent, setNewComents}){

    const [showInput, setShowInput] = useState(false);

    const showInputControl=()=>{
        setShowInput(!showInput);
    }

    const deleteReply=(coment, deleteComent)=>{
        const newReply = coment.reply.filter((re)=> 
        re.text !== deleteComent.text);
        coment.reply=newReply;

        const copyComents = [...coments];
        copyComents.forEach((co)=>{
        if(co.text === coment.text){
            console.log(co.text, coment.text);
            co = coment;
        }}
        )
        setNewComents(copyComents);
    }

    return(
        <div className="container mx-auto">
        {coments !== null &&
          coments.map((coment) =>
            <>
              <div className='border-2 flex justify-between items-center p-2 rounded-md'>
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
                  <button className=' rounded-sm text-sm p-1' onClick={() => deleteComent(coment)}><Bin/></button>
                </div>
              </div>
              {showInput && 
              <form onSubmit={(e)=> { showInputControl(); replyComent(e, coment)}}>
              <input name='reply' type='text' placeholder="답글을 입력해주세요"/>
              <button type='submit'>submit</button>
            </form>}
              {coment.reply.length > 0 && coment.reply.map((re) =>
              <div className="flex justify-between items-cetner">
              <div className='pl-6'>- {re.text}</div>
                <button className='bg-gray-400 rounded-sm text-sm p-1' onClick={() => deleteReply(coment, re)}>삭제</button> 
              </div>
              )}
            </>
          )
        }
      </div>
    )
}