import { useEffect, useState } from 'react';
import axios from 'axios';
import {MenuDrawer} from '../components/app/MenuDrawer';
import Item from '../components/app/Item';
import Header from '../components/app/Header';
import { Swiper, SwiperSlide,SwiperRef } from 'swiper/react';
import 'swiper/css';
import { useRef } from 'react';
import { Navigation, } from 'swiper/modules';

export type ItemType = {
  id: number,
  catagory_id: number,
  heading: string,
  description: string,
  price: number,
  image: string,
  updated_at: string,
  created_at: string
}

export type MenuType = {
  id: number,
  name: string,
  image: string,
  ordering_id: number,
  updated_at: string,
  created_at: string,
  details: ItemType[]
}

function Menu() {
  const [menu,setMenu] = useState<MenuType[]>();
  const sliderRef = useRef<SwiperRef>(null);
  const [index,setIndex] = useState<number>(0);

  useEffect(()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL+'/')
    .then(res=>{
      return setMenu(res.data.data);
    })
  },[])

  // console.log(JSON.stringify(img));
  
  return (
    <>
    <Header/>
    
    <Swiper
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      ref={sliderRef}
      speed={1300}
      autoHeight={true}
      onSlideChange={(swiper)=>setIndex(swiper.activeIndex)}
    >
      {menu && menu.map((item,index)=>{
        return (
          <SwiperSlide key={item.id}>
            <Item menu={item.name} dishes={item.details} index={index}/>
          </SwiperSlide>
        )
      })}
    </Swiper>
    <MenuDrawer sliderRef={sliderRef} menu={menu}  ind={index} setIndex={setIndex}/>
    </>
  );
}

export default Menu;
