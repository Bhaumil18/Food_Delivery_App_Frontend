import { cuisineList } from '@/config/RestaurantOptionCuisines'
import React from 'react'
import { Label } from './ui/label'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SetCuisine, setExpanded } from '@/reducers/CuisineFilter'
import { FetchAllRest } from '@/actions/Restaurants'

const CuisinesFilter = () => {

    let { cuisines, isExpanded } = useSelector(state => state.cuisines);
    const { sortOptionInd } = useSelector(state => state.sortOptions)
    const { city } = useParams();

    const dispatch = useDispatch();

    let newArr = new Array();

    const handleCuisineReset = () => {
        newArr = [];
        dispatch(SetCuisine(newArr));
        dispatch(FetchAllRest({ city, cuisines: newArr, sortOption: sortOptionInd }))
    }


    const onChange = (e) => {
        newArr = [...cuisines]
        if (newArr.includes(e.target.value)) {
            const ind = newArr.indexOf(e.target.value);
            newArr.splice(ind, 1);
        }
        else {
            newArr.push(e.target.value)
        }
        dispatch(SetCuisine(newArr));
        dispatch(FetchAllRest({ city, cuisines: newArr, sortOption: sortOptionInd }))
    }


    return (
        <div className='flex flex-col'>
            <div className='flex justify-between items-end'>
                <span className='text-lg font-semibold'>Filter by cuisines</span>
                <span onClick={handleCuisineReset} className='text-blue-700 underline cursor-pointer'>Reset filters</span>
            </div>
            <div className='flex flex-col py-4 gap-2 flex-1'>
                {
                    cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((item, index) => {
                        const isSelected = cuisines?.includes(item);
                        return <div key={index}>
                            <input type="checkbox" className='hidden' id={`cuisine_${item}`} value={item} onChange={onChange} checked={isSelected} />
                            <Label className={`flex flex-1 items-center justify-between py-2 rounded-xl h-9 px-4 ${isSelected ? 'border border-green-600' : 'border border-slate-300'}`} htmlFor={`cuisine_${item}`}>
                                <span>{item}</span>
                                {isSelected ? <Check size={18} strokeWidth={2} /> : null}
                            </Label>
                        </div>
                    })
                }

                {
                    isExpanded ? <div onClick={() => {
                        dispatch(setExpanded())
                    }} className='flex justify-center items-start cursor-pointer'>
                        <span className='text-base'>View less</span>
                        <ChevronUp className='pt-0.5' size={25} strokeWidth={3} />
                    </div> :
                        <div onClick={() => {
                            dispatch(setExpanded())
                        }} className='flex justify-center items-start cursor-pointer'>
                            <span className='text-base'>View more</span>
                            <ChevronDown className='pt-0.5' size={25} strokeWidth={3} />
                        </div>
                }
            </div>
        </div>
    )
}

export default CuisinesFilter