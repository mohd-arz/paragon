import { useRef,useEffect } from 'react';
import { MenuType } from '@/pages/Menu';
import { RefObject } from 'react';
import { SwiperRef } from 'swiper/react';

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface DrawerProps {
  menu:MenuType[]|undefined
  ind:number
  sliderRef:RefObject<SwiperRef>
  setIndex:React.Dispatch<React.SetStateAction<number>>;
}

export function MenuDrawer({menu,sliderRef,ind,setIndex}:DrawerProps) {

  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(()=>{
    if(menuRef.current)
      menuRef.current.classList.add('open-menu-active');
  },[])

  function slideTo(index:number){
    setIndex(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    if (sliderRef.current) {
      sliderRef.current.swiper.slideTo(index, 0, false);
    }
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button ref={menuRef} className={`fixed rounded-full z-10 mb-4 open-menu`}>
          Open Menu
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="m-auto px-5 sm:px-10 max-w-[35-vw] max-h-[50vh] overflow-auto">
          <DrawerHeader>
            <DrawerTitle className='text-center'>Menu</DrawerTitle>
          </DrawerHeader>
            {menu && menu.map((item:MenuType,index:number)=>{
              return(<div>
                  <DrawerClose asChild className=''>
                    <div onClick={()=>slideTo(index)} data-key={index} className={`flex justify-between mb-3 mx-10 menu ${index==ind ? 'menu-active':''}`} style={{cursor:"pointer"}}>
                      <div className="text-center">
                        {item.name}
                        </div>
                      <div>{item.details.length}</div>
                    </div>
                  </DrawerClose>
                  </div>
                );
              })}
          <DrawerFooter>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
