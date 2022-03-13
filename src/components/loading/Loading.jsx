import img from "./loader-2_food.gif";

export default function Loading() {
  return (
    <div className="flex justify-center w-screen h-screen items-center">
      <img src={img} alt="loading.." className="brightness-110 " />
    </div>
  );
}
