import { useEffect, useState,useCallback,memo } from 'react';
import axios from 'axios';
import {MenuDrawer} from '../components/app/MenuDrawer';
import Item from '../components/app/Item';
import Header from '../components/app/Header';
import { Swiper, SwiperSlide,SwiperRef } from 'swiper/react';
import 'swiper/css';
import { useRef } from 'react';
import { Navigation, } from 'swiper/modules';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LazyLoadImage } from 'react-lazy-load-image-component';

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

type DishType = {
  id: number,
  catagory_id: number,
  heading: string,
  description: string,
  price: number,
  image: string,
  updated_at: string,
  created_at: string
}

function Menu() {
  const [menu,setMenu] = useState<MenuType[]>();
  const sliderRef = useRef<SwiperRef>(null);
  const [index,setIndex] = useState<number>(0);

  useEffect(()=>{
    console.log('inside effect');
    axios.get(import.meta.env.VITE_BACKEND_URL+'/')
    .then(res=>{
      return setMenu(res.data.data);
    })
  },[])

  const handlePrev = useCallback(() => {
    console.log('inside handle');
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const menuNameCheck = useCallback((name:string)=>{
    let nameArr = name.split(' ');
    if(nameArr.length > 3)
      return nameArr.slice(0,2).join(' ');
    return name;
  },[]);

  const changeMenu = useCallback((index:number)=>{
    setIndex(index);
  },[])

  const i = 9 > index ? index + 1 :( Math.abs(9 - index)) == 0 ? 1 :  Math.abs(9 - index);
  
  console.log(menu);
  
  return (
    // <>
    // <Header/>
    
    // <Swiper
    //   modules={[Navigation]}
    //   spaceBetween={50}
    //   slidesPerView={1}
    //   ref={sliderRef}
    //   speed={1300}
    //   autoHeight={true}
    //   onSlideChange={(swiper)=>setIndex(swiper.activeIndex)}
    // >
    //   {menu && menu.map((item,index)=>{
    //     return (
    //       <SwiperSlide key={item.id}>
    //         <Item menu={item.name} dishes={item.details} index={index}/>
    //       </SwiperSlide>
    //     )
    //   })}
    // </Swiper>
    // <MenuDrawer sliderRef={sliderRef} menu={menu}  ind={index} setIndex={setIndex}/>
    // </>
    <>
    <div className='grid grid-cols-4' style={{height:'100vh'}}>
      <div style={{border:'1px solid black'}} className='md:col-span-1 col-span-4'>
        <div className='pt-[15px]'>
          <img style={{ width: '190px',margin:'0 auto' }} src={"images/logo.svg"} alt="cafe-calicut-logo" />
        </div>
        <div className='relative select-none my-4 sticky top-0 bg-white py-4 border-b z-10'>
          <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={4.5}
              ref={sliderRef}
              // autoHeight={true}
              className='mx-6'
          >  
          {menu && menu.map((item:MenuType,index:number)=>{
              return(<SwiperSlide key={item.id}>
                  <div className='border border-grey-300 bg-white rounded-full h-[162px] w-[110px] text-justify p-2 overflow-hidden' onClick={()=>changeMenu(index)}>
                    <div className='rounded-full overflow-hidden w-[80px] h-[80px] mx-auto'>
                      <img className='w-full h-full object-cover' src={"images/menu-dummy.jpg"} alt="cafe-calicut-logo" />
                    </div>
                    <div className='text-center text-[13px] font-semibold pt-3'>
                      {menuNameCheck(item.name)}
                    </div>
                  </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <FiChevronLeft className="prev-arrow absolute left-0 top-2/4 cursor-pointer" onClick={handlePrev} style={{ color: 'lightgray', stroke: 'black', strokeWidth: '1', fontSize: '20px' }} />
          <FiChevronRight className="next-arrow absolute right-0 top-2/4 cursor-pointer" onClick={handleNext} style={{ color: 'lightgray', stroke: 'black', strokeWidth: '1', fontSize: '20px' }} />
        </div>
        <div>
          <div className='m-4 sm:m-6 md:m-8'>
          <img src={'public/bg_images/bg'+i+'.jpg'} style={{height:'210px',objectFit:'cover',width:'100%'}}/>
          {(menu && menu[index].details.length>0) && menu[index].details.map((dish:DishType)=>{
            return(
              <Dialog key={dish.id}>
                <DialogTrigger className='focus:outline-none w-full' tabIndex={-1}>
                  <div key={dish.id} className='food-item flex py-3 gap-6 ' >
                    <img
                      alt={dish.heading+' image'}
                      src={"https://cafecalicut.com/backend/storage/images/"+dish.image}
                      className='rounded-2xl xl:max-w-[80%] w-[150px] h-[150px] object-cover flex-shrink-0'
                    />
                    <div className='flex flex-col items-start'>
                      <h2 className='text-base font-medium'>{dish.heading}</h2>
                      <p className='text-xs pt-2 text-start'>{dish.description}</p>
                      <p className='mt-auto'>AED {dish.price}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <div key={dish.id} className='food-item-modal flex flex-col pb-6 gap-6' >
                      <LazyLoadImage
                        alt={dish.heading+' image'}
                        src={"https://cafecalicut.com/backend/storage/images/"+dish.image}
                        className='rounded-tl-lg rounded-tr-lg'
                      />
                    <div className='flex flex-col m-4'>
                      <div className='flex justify-between'>
                        <h2 className='text-base font-medium'>{dish.heading}</h2>
                        <p className='mt-auto'>AED {dish.price}</p>
                      </div>
                        <p className='text-xs pt-2'>{dish.description}</p>
                    </div>
                  </div>
              </DialogContent>
              </Dialog>
            )
          })}
          {
            (menu && menu[index].details.length % 2 == 0) && 
            <img src={'public/bg_images/bg'+(i+1)+'.jpg'} style={{height:'210px',objectFit:'cover',width:'100%'}}/>
          }
        </div>
        </div>
      </div>
      <div className='md:col-span-3  col-span-0' style={{border:'1px solid red'}}>
            dfa
      </div>
    </div>
    </>
  );
}


export default Menu;
