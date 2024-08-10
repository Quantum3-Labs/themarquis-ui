"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '../../components/Modal/Modal';
import Invitation from '~~/components/invitation';

const Page: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="px-7 pt-24 bg-[#0F151A] rounded-lg h-full flex justify-center flex-col">
            <div className="text-white mb-4 text-lg font-semibold font-monserrat">
                NG***@GMAIL.COM
            </div>
            <div className='flex flex-col border border-[#21262B] rounded-[10px]'>
                <div className="bg-[#1E1E1E] p-4 mb-4 rounded-lg">
                    <span className="text-white">Marquis Points</span>
                </div>
                <div className='flex justify-between'>
                    <Image src="/marquis-point.svg" alt='icon' width={60} height={60}></Image>
                    <div className="text-gray-400 pr-4 font-monserrat">8000 Pts.</div>
                </div>
            </div>

            <div className="my-8 rounded-[10px] border border-[#21262B]">
                <div className="flex justify-between items-center bg-[#1E1E1E] p-4">
                    <span className="text-white">Account Balance</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                        <path d="M7.18314 6.31686L11.7929 1.70711C12.4229 1.07714 11.9767 0 11.0858 0H1.53702C0.629399 0 0.191179 1.11177 0.8547 1.73105L5.79372 6.3408C6.18766 6.70849 6.8021 6.6979 7.18314 6.31686Z" fill="#00ECFF" />
                    </svg>
                </div>
                <div className="flex flex-col gap-4 px-4 my-4">
                    <div className="flex items-center mb-2 justify-between">
                        <Image src="/logo-starknet.svg" alt="STRK" width={26} height={26} className="w-6 h-6 mr-2" />
                        <span className="text-gray-400 font-monserrat">900.99 STRK</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <Image src="/usdc.svg" alt="USDC" width={20} height={20} className="w-6 h-6 mr-2" />
                        <span className="text-gray-400 font-monserrat">100.76 USDC</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex gap-4 items-center text-[#00E0FF] cursor-pointer" onClick={openModal}>
                    <Image src="/invitation-icon.svg" alt='icon' width={20} height={20}></Image>
                    <span>Invite Friend</span>
                </div>
                <div className="flex gap-4 items-center text-[#00E0FF] cursor-pointer">
                    <Image src="/copy-icon.svg" alt='icon' width={20} height={20}></Image>
                    <span>Copy Referral Code</span>
                </div>
                <div className="flex gap-4 items-center text-[#00E0FF] cursor-pointer">
                    <Image src="/logout.svg" alt='icon' width={20} height={20}></Image>
                    <span>Log Out</span>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} >
                <div>
                    <Invitation>
                    </Invitation>
                </div>
            </Modal>

        </div>
    );
};

export default Page;
