import { useRouter } from 'next/router';
import { TbBrandFacebookFilled } from 'react-icons/tb';
import { FaInstagram } from 'react-icons/fa';
import { CiYoutube } from 'react-icons/ci';

const Footer = () => {
    const router = useRouter();

    return (
        <footer className="w-full bg-dark-layer-1 text-slate-50">
            <div className="flex justify-between items-center px-20 py-6">
                <div className="w-1/2">
                    <ul className="flex flex-wrap gap-x-10">
                        <li className="cursor-pointer" onClick={() => router.push('/terms')}onMouseDown={() => router.push('/terms')}>Terms & Conditions</li>
                        <li className="cursor-pointer">Copyrights @ {new Date().getFullYear()}</li>
                        <li className="cursor-pointer" onClick={() => router.push('/policy')}onMouseDown={() => router.push('/policy')}>Privacy Policy</li>
                        
                    </ul>
                </div>
                <div className="w-1/2 flex justify-end items-center">
                    <ul className="flex gap-x-5">
                        <li className="cursor-pointer"><TbBrandFacebookFilled size={28} color={'white'} /></li>
                        <li className="cursor-pointer"><FaInstagram size={28} color={'white'} /></li>
                        <li className="cursor-pointer"><CiYoutube  size={30} color={'white'} /></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
