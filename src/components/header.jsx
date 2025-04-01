import { Link } from "react-router-dom";


const Header = ({ user, room }) => {
  return (
    <header className="flex justify-between items-center p-5 border border-gray-200 shadow-lg">
      <div className="flex flex-col items-center w-32 ">
        <img src="/esra.jpg" alt="foto" className="size-20 rounded mb-2" />
        <p className="text-center text-sm truncate w-full  text-black">{user.displayName}</p>
      </div>

      <p className="font-semibold text-black">{room}</p>

      <Link to="/room" className=" btn  text-black">
       Farklı Oda
      </Link>

    </header>
  )
}

export default Header;
