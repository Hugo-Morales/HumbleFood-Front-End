import img from './loader-2_food.gif'

export default function Loading() {
    return (
        <div className='flex justify-center items-center m-10 p-10'>
            <img src={img} alt='loading..' className='brightness-110 ' />
        </div>
    )
}