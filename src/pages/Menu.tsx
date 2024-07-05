import { useEffect, useState, useCallback} from "react";
import axios from "axios";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import "swiper/css";
import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LazyLoadImage } from "react-lazy-load-image-component";

export type ItemType = {
  id: number;
  catagory_id: number;
  heading: string;
  description: string;
  price: number;
  image: string;
  updated_at: string;
  created_at: string;
};

export type MenuType = {
  id: number;
  name: string;
  image: string;
  ordering_id: number;
  updated_at: string;
  created_at: string;
  details: ItemType[];
};

type DishType = {
  id: number;
  catagory_id: number;
  heading: string;
  description: string;
  price: number;
  image: string;
  updated_at: string;
  created_at: string;
};

function Menu() {
  const [menu, setMenu] = useState<MenuType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const sliderRef = useRef<SwiperRef>(null);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/")
      .then((res) => {
        setMenu(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePrev = useCallback(() => {
    console.log("inside handle");
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const menuNameCheck = useCallback((name: string) => {
    let nameArr = name.split(" ");
    if (nameArr.length > 3) return nameArr.slice(0, 2).join(" ");
    return name;
  }, []);

  const changeMenu = useCallback((index: number) => {
    setIndex(index);
  }, []);

  const i =
    8 > index ? index + 1 : Math.abs(8 - index) == 0 ? 1 : Math.abs(8 - index);
console.log(menu)
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
      {loading ? (
        <div className="loader flex items-center justify-center min-h-screen">
        <img src="images/logo.svg" alt="Loading..." className="animate-pulse" style={{ width: "300px", margin: "0 auto" }} />
      </div>
      ) : (
      <div className="flex flex-row ">
        <div className="md:w-[480px] min-h-screen w-screen sm:w-screen custom-shadow bg-white">
          <div className="pt-[15px]">
            <img
              style={{ width: "170px", margin: "0 auto" }}
              src={"images/logo.svg"}
              alt="paragon-logo"
            />
          </div>
          <div className="relative select-none my-2 sticky top-0 bg-white py-2 border-b z-10">
            <Swiper
              modules={[Navigation]}
              spaceBetween={4}
              slidesPerView={4.15}
              ref={sliderRef}
              className="mx-6"
              breakpoints={{
                100: { slidesPerView: 1.5 },
                250: { slidesPerView: 2.5 },
                320: { slidesPerView: 3.25 },
                400: { slidesPerView: 4 },
                480: { slidesPerView: 5 },
                560: { slidesPerView: 5.65 },
                640: { slidesPerView: 6.5 },
                700: { slidesPerView: 7 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 4.5 },
                1200: { slidesPerView: 4.25 },
                1400: { slidesPerView: 4.25},
              }}
            >
              {menu &&
                menu.map((item: MenuType, i: number) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <div
                        className={`border border-grey-300 rounded-full h-[152px] md:w-[98px] w-[85px]  text-justify p-2 overflow-hidden transition-colors duration-500 cursor-pointer ${
                          i == index
                            ? "bg-red-600 text-white"
                            : "bg-white text-black"
                        }`}
                        onClick={() => changeMenu(i)}
                      >
                        <div className="rounded-full overflow-hidden w-[60px] sm:w-[65px] md:w-[70px] md:h-[70px] mx-auto">
                          <img
                            className="w-full h-full object-cover"
                            src={
                              "https://paragonrestaurant.in/backend/storage/images/" +
                              item.image
                            }
                            // src={"images/menu-dummy.jpg"}
                            alt="calicut-paragon-logo"
                          />
                        </div>
                        <div className="text-center text-[10px] sm:text-[10px] md:text-[11px] font-semibold pt-3">
                          {menuNameCheck(item.name)}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <FiChevronLeft
              className="prev-arrow absolute left-0 top-2/4 cursor-pointer"
              onClick={handlePrev}
              style={{
                color: "lightgray",
                stroke: "black",
                strokeWidth: "0.75",
                fontSize: "20px",
              }}
            />
            <FiChevronRight
              className="next-arrow absolute right-0 top-2/4 cursor-pointer"
              onClick={handleNext}
              style={{
                color: "lightgray",
                stroke: "black",
                strokeWidth: "0.75",
                fontSize: "20px",
              }}
            />
          </div>
          <div className="bg-white ">
            <div className="m-4 sm:m-6 md:m-8">
              <img
                src={`bg_images/bg${i}.jpg`}
                style={{ height: "210px", objectFit: "cover", width: "100%" }}
              />
              {menu &&
                menu[index].details.length > 0 &&
                menu[index].details.map((dish: DishType) => {
                  return (
                    <Dialog key={dish.id}>
                      <DialogTrigger
                        className="focus:outline-none w-full pb-4"
                        tabIndex={-1}
                      >
                        <div
                          key={dish.id}
                          className="food-item flex py-3 gap-6 "
                        >
                          <img
                            alt={dish.heading + " image"}
                            src={
                              "https://paragonrestaurant.in/backend/storage/images/" +
                              dish.image
                            }
                            className="rounded-2xl xl:max-w-[80%] w-[130px] h-[130px] object-cover flex-shrink-0 transition-all duration-1000 hover:scale-110"
                          />
                          <div className="flex flex-col items-start">
                            <h2 className="text-base font-semibold text-left">
                              {dish.heading}
                            </h2>
                            <p className="text-xs pt-2 text-start  mb-4">
                              {dish.description}
                            </p>
                            <p className="mt-auto font-semibold flex items-center">
                                <FaIndianRupeeSign className="mr-1" />{" "}
                                {dish.price}
                              </p>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <div
                          key={dish.id}
                          className="food-item-modal flex flex-col pb-6 gap-2"
                        >
                          <LazyLoadImage
                            alt={dish.heading + " image"}
                            src={
                              "https://calicutparagon.com/backend/storage/images/" +
                              dish.image
                            }
                            className="rounded-tl-lg rounded-tr-lg"
                          />
                          <div className="flex flex-col m-4">
                            <div className="flex justify-between">
                              <h2 className="text-base font-semibold">
                                {dish.heading}
                              </h2>
                              <p className="mt-auto font-semibold flex items-center text-red-500">
                                <FaIndianRupeeSign className="mr-1" />{" "}
                                {dish.price}
                              </p>
                            </div>
                            <p className="text-sm pt-2">{dish.description}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  );
                })}
              {menu && menu[index].details.length % 2 == 0 && (
                <img
                  // src={"bg_images/bg" + (i + 1) + ".jpg"}
                  src={`bg_images/bg${(i + 1)}.jpg`}
                  style={{ height: "210px", objectFit: "cover", width: "100%" }}
                  className="mt-4"
                />
              )}
            </div>
          </div>
        </div>
        <div className="md:w-full">
          <div
            className="hidden md:flex fixed top-0 bottom-0 
              items-center justify-center  lg:left-[50%] left-[63%] left-0"
          >
            <img
              style={{ width: "300px", margin: "0 auto" }}
              src={"images/logo.svg"}
              alt="paragon-logo"
              className="digital-menu-right"
            />
          </div>
        </div>
      </div>
       )}
    </>
  );
}

export default Menu;
