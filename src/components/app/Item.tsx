import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { memo } from 'react';
// import {} from "../../assets/bg_images/";



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
interface ItemPropsType {
  menu:string,
  dishes:DishType[],
  index:number
}

const Item = memo(function Item({
  menu,
  dishes,
  index,
}:ItemPropsType)
{
  const i = 9 > index ? index + 1 :( Math.abs(9 - index)) == 0 ? 1 :  Math.abs(9 - index);
 
  return (
    <main>
      <h1 className='text-3xl md:text-5xl text-center text-white px-0 py-4 font-serif shadow-gray-500 shadow-lg menu-header'>
        {menu}
      </h1>
      <div className='food-container m-4 sm:m-6 md:m-8'>
        <img src={'public/bg_images/bg'+i+'.jpg'} style={{height:'210px',objectFit:'cover',width:'100%'}}/>
        {(dishes.length>0) && dishes.map((dish:DishType)=>{
          return(
            <Dialog key={dish.id}>
              <DialogTrigger className='focus:outline-none' tabIndex={-1}>
                <div key={dish.id} className='food-item flex pb-6 gap-6' >
                  <img
                    alt={dish.heading+' image'}
                    src={"https://cafecalicut.com/backend/storage/images/"+dish.image}
                    className='rounded-2xl xl:max-w-[80%] w-[150px] h-[200px] object-cover flex-shrink-0'
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
                      effect="blur"
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
          (dishes.length % 2 == 0) && 
          <img src={'public/bg_images/bg'+(i+1)+'.jpg'} style={{height:'210px',objectFit:'cover',width:'100%'}}/>
        }
      </div>
    </main>
  )
});

export default Item;