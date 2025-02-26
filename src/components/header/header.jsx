import React from 'react';

export const Header = () => {
  return (
    <div className="absolute overflow-hidden  flex-col  lg:py-5 py-5 px-2 lg:px-32 shadow-lg w-[100%] lg:flex-row lg:flex lg:items-center lg:justify-between">
      {/* Faqat orqa fonni xira qilish */}
      <div className="absolute inset-0 bg-red-500/30 backdrop-blur-md z-[-1]" />

      {/* Matn va rasm qismi, blur qilinmagan */}
      <div className="flex items-center text-white lg:font-medium lg:text-2xl gap-2">
        <img className="w-5 h-5" src="https://pomofocus.io/images/icon-white2.png" alt="Pomofocus Icon" />
        <span>Pomofocus</span>
      </div>

      <div className="flex gap-3 lg:gap-4 ">
        <div className="bg-white/20 lg:p-4  p-2 h-[40px] mt-2 text-sm  lg:h-[55px] lg:px-6 lg:text-[18px]  rounded-lg flex items-center justify-center gap-2 text-white">
          <img className='w-4' src="https://pomofocus.io/icons/graph-white.png" alt="Report Icon" width={20} height={20} />
          <span>Report</span>
        </div>
        <div className="bg-white/20 lg:p-4 p-2 h-[40px] mt-2 text-sm  lg:h-[55px] lg:px-6 lg:text-[18px]  rounded-lg flex items-center justify-center gap-2 text-white">
          <img className='w-4' src="https://pomofocus.io/icons/config-white.png" alt="Settings Icon" width={20} height={20} />
          <span>Settings</span>
        </div>
        <div className="bg-white/20 lg:p-4 p-2 h-[40px] mt-2 text-sm  lg:h-[55px] lg:px-6 lg:text-[18px]  rounded-lg flex items-center justify-center gap-2 text-white">
          <img className='w-4' src="https://pomofocus.io/icons/user-white.png" alt="Sign In Icon" width={20} height={20} />
          <span>Sign In</span>
        
        </div>
      </div>
    </div>
  );
};


