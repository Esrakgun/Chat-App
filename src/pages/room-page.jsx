import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";



const RoomPage = () => {
  const user = useOutletContext();
  const navigate = useNavigate();
      //  console.log(user);
       
  // Odaya Gir:
  const handleSumit = (e) => {
    e.preventDefault();

    // İnputtaki Girdiyi Alalaım:
    // const room =e.target[0].value.toLowerCase().split("").join("-");
    const room = e.target[0].value.toLowerCase().replaceAll(" ", "-");
    // Kullanıcı Sohbet Odasına Yönlendir:
    // console.log(room);
    navigate(`/chat/${room}`);

  };
  // console.log("Aktif kullanıcı", auth?.currentUser);
  // Oturumu Kapat:
  const handleLogout = () => {
    signOut(auth);
    toast.info("Oturum Kapandı");
  }
  return (
    <div className="wrapper">
      <form onSubmit={handleSumit} className="box rounded-[10px] flex flex-col gap-10 text-center">

        <h1 className="text-4xl text-center">Chat Odası</h1>

        <p className="text-zinc-500">Selam, {user.displayName} <br/> Hangi Odaya Giriceksiniz ?</p>

        <input type="text" className="border border-gray-300 rounded-md shadow-lg p-2 px-4 " placeholder="örn:haftaiçi" />

        <button type="submit" className="btn bg-zing-900 text-black">Odaya Gir</button>

        <button type="button" className= "btn bg-red-500 text-black" onClick={handleLogout}> Çıkış Yap </button>

      </form>
    </div>
  );
};

export default RoomPage;
