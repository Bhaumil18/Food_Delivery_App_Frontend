import landingPage from "../assets/landing.png";
import downloadImage from '../assets/appDownload.png'
import SearchBar from "@/components/SearchBar";
import { FetchAllRest } from "@/actions/Restaurants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const onSubmit = (values) => {
    const city = values.search;
    dispatch(FetchAllRest({ city }));
    naviagte(`/restaurants/${city}`)
  }

  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="md:px-10 px-4 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
          <h1 className="text-5xl font-bold tracking-tight text-orange-600 ">
            Healthy Food
          </h1>
          <span className="text-xl">Food is just a click away!</span>
          <SearchBar placeholder={'search by city or town...'} onSubmit={ onSubmit } />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <img src={landingPage} alt="landingPage" />
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="font-bold text-3xl tracking-tight">
              Order tackaway even faster
            </span>
            <span>
              Download the MernRestaurant app for fast ordering and personlized recommendations.
            </span>
            <img src={downloadImage} alt="DownloadImage" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
