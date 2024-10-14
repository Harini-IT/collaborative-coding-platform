import Image from 'next/image';
import useGetUserDetails from '@/hooks/useGetUserDetails';

interface UserDetails {
    badges: string[];
}
const Medals = () => {
    const { badges }: UserDetails = useGetUserDetails();

    return (
        <div
        className="w-[40%] my-2 rounded-lg py-4"
        style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
        }}
    >
            <h2 className="text-white font-bold text-xl text-center">Your Achievements</h2>
            <div className="flex items-center justify-between mx-2">
            {badges?.includes('bronze') && (
                <Image src={'/assets/bronze.png'} width={120} height={120} alt="Bronze Medal" />
            )}
            {badges?.includes('silver') && (
                <Image src={'/assets/silver.png'} width={100} height={100} alt="Bronze Medal" />
            )}{badges?.includes('gold') && (
                <Image src={'/assets/gold.png'} width={120} height={120} alt="Bronze Medal" />
            )}
            </div>
        </div>
    );
};

export default Medals;
