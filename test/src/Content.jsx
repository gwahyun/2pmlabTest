import { ReactComponent as Logo } from './svg/Logo.svg';
export default function Content() {

    return (
        <div className="rounded-md border p-8 drop-shadow-lg my-4">
            <div className='flex items-center'>
                <Logo className='bg-[#22372B] p-2 rounded-md scale-75' />
                <div className='flex flex-col'>
                    <h1>오후두시랩</h1>
                    <h1 className="font-bold text-2xl break-all">기술로 따뜻한 세상을 만듭니다</h1>
                    <h1 className='font-semibold'>Tech for us and Earth</h1>
                </div>
            </div>
            <p className='tracking-tight'>코로나19 위기 속에 시작된 오후두시랩은 인류가 당면한 문제들을 기술로 해결하는 지구 테크 스타트업입니다.
                우리는 블록체인, 인공지능, 빅데이터 분야의 앞선 기술을 탐구하며, 사람들의 일상에 따뜻하게 스미는 서비스를 만듭니다.</p>
            <br />
            <p>우리는 지구의 내일이 곧 내 일이라는 생각으로, 세상에 꼭 필요한 변화를 위해 도전합니다. 건강하고 안전한 사람들의 일상과 깨끗하고 밝은 지구 환경을 만드는 프로젝트를 개발하고 있습니다. </p>
            <br />
            <div className='hashTag flex space-x-2'>
                <span>#지구테크</span><span>#기술로환경을</span><span>#변화를위한도전</span>
            </div>
        </div>
    )
}