import {useTranslations} from 'next-intl';
import VerifyBlock from '@/components/VerifyBlock';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center max-w-lg w-full">
        <div className="space-y-2">
            <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Trivia Streak Wars
            </h1>
            <p className="text-slate-400">Battle for knowledge, stake for rewards.</p>
        </div>
        
        <div className="w-full">
             <VerifyBlock />
        </div>

        <div className="flex gap-4 items-center flex-col w-full">
          <button className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold h-14 hover:scale-[1.02] transition-transform">
            {t('startGame')}
          </button>
        </div>
      </main>
    </div>
  );
}
